// Initialize Firebase
import("https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js").then(() => {
  import("https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore-compat.js").then(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyD5tK6AQqKkda5VOZfljvVX4zZfy_SoHX8",
      authDomain: "toolswagon-ratings.firebaseapp.com",
      projectId: "toolswagon-ratings",
      storageBucket: "toolswagon-ratings.appspot.com",
      messagingSenderId: "96777512295",
      appId: "1:96777512295:web:c08ebea6a9b835130ffbc2",
      measurementId: "G-XFWQZD0NXB"
    };

    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();

    // Delay run until DOM is ready
    document.addEventListener("DOMContentLoaded", () => {
      const TOOL_NAME = document.body.dataset.toolName; // Use dynamic tool name from HTML
      const starsContainer = document.getElementById("starRating");
      const ratingMessage = document.getElementById("ratingMessage");

      if (!starsContainer || !ratingMessage || !TOOL_NAME) return;

      let userRating = 0;

      // Render stars
      for (let i = 1; i <= 5; i++) {
        const star = document.createElement("span");
        star.innerHTML = "★";
        star.className = "text-2xl text-gray-300 cursor-pointer hover:text-yellow-400";
        star.dataset.value = i;

        star.addEventListener("click", async () => {
          userRating = i;
          await db.collection("ratings").add({ tool: TOOL_NAME, rating: i, time: new Date() });
          updateRatingDisplay();
        });

        starsContainer.appendChild(star);
      }

      async function updateRatingDisplay() {
        const snapshot = await db.collection("ratings").where("tool", "==", TOOL_NAME).get();
        const total = snapshot.size;
        const sum = snapshot.docs.reduce((acc, doc) => acc + doc.data().rating, 0);
        const avg = (sum / total).toFixed(1);
        ratingMessage.innerText = `Rated ${avg} out of 5 by ${total} users.`;

        // Color stars
        starsContainer.childNodes.forEach((star, idx) => {
          star.classList.remove("text-yellow-400");
          if (idx < userRating) star.classList.add("text-yellow-400");
        });
      }

      updateRatingDisplay();
    });
  });
});
