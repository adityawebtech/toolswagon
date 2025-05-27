<!-- Firebase App (Core SDK) -->
<script src="https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore-compat.js"></script>

<script>
  // Firebase config
  const firebaseConfig = {
    apiKey: "AIzaSyD5tK6AQqKkda5VOZfljvVX4zZfy_SoHX8",
    authDomain: "toolswagon-ratings.firebaseapp.com",
    projectId: "toolswagon-ratings",
    storageBucket: "toolswagon-ratings.firebasestorage.app",
    messagingSenderId: "96777512295",
    appId: "1:96777512295:web:c08ebea6a9b835130ffbc2",
    measurementId: "G-XFWQZD0NXB"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // Initialize Firestore
  const db = firebase.firestore();
</script>
