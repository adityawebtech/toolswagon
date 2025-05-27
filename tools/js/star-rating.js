import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD5tK6AQqKkda5VOZfljvVX4zZfy_SoHX8",
  authDomain: "toolswagon-ratings.firebaseapp.com",
  projectId: "toolswagon-ratings",
  storageBucket: "toolswagon-ratings.appspot.com",
  messagingSenderId: "96777512295",
  appId: "1:96777512295:web:c08ebea6a9b835130ffbc2",
  measurementId: "G-XFWQZD0NXB"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const TOOL_NAME = document.body.dataset.toolName;
let userRating = 0;

// Load rating.html and inject inside #ratingContainer
fetch("/components/rating.html")
  .then(res => res.text())
  .then(html => {
    const div = document.createElement("div");
    div.innerHTML = html;
    const ratingContainer = document.getElementById("ratingContainer");
    if (ratingContainer) {
      ratingContainer.appendChild(div);
    } else {
      // fallback if no container found
      document.body.appendChild(div);
    }
    initStars();
  });

function initStars() {
  const starsContainer = document.getElementById("starRating");
  const ratingMessage = document.getElementById("ratingMessage");

  // Clear stars container before adding stars (in case this runs multiple times)
  starsContainer.innerHTML = "";

  for (let i = 1; i <= 5; i++) {
    const star = document.createElement("span");
    star.innerHTML = "★";
    star.className = "text-2xl text-gray-300 cursor-pointer hover:text-yellow-400";
    star.dataset.value = i;

    star.addEventListener("click", async () => {
      if (localStorage.getItem(`rated_${TOOL_NAME}`)) {
        alert("You have already rated this tool.");
        return;
      }
      userRating = i;
      await addDoc(collection(db, "ratings"), {
        tool: TOOL_NAME,
        rating: i,
        time: new Date()
      });
      localStorage.setItem(`rated_${TOOL_NAME}`, "true");
      updateRatingDisplay();
    });

    starsContainer.appendChild(star);
  }

  async function updateRatingDisplay() {
    const q = query(collection(db, "ratings"), where("tool", "==", TOOL_NAME));
    const snapshot = await getDocs(q);
    const total = snapshot.size;

    if (total === 0) {
      ratingMessage.innerText = "No ratings yet.";
      // Reset stars color
      starsContainer.childNodes.forEach(star => {
        star.classList.remove("text-yellow-400");
      });
      return;
    }

    const sum = snapshot.docs.reduce((acc, doc) => acc + doc.data().rating, 0);
    const avg = (sum / total).toFixed(1);
    ratingMessage.innerText = `Rated ${avg} out of 5 by ${total} user${total > 1 ? "s" : ""}.`;

    // Highlight stars up to average rating
    starsContainer.childNodes.forEach((star, idx) => {
      star.classList.remove("text-yellow-400");
      if (idx < Math.round(avg)) star.classList.add("text-yellow-400");
    });
  }

  updateRatingDisplay();
}
