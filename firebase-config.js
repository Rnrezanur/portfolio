// Firebase configuration for Rezanur Portfolio
// Note: Web API keys identify the Firebase project in public client browsers.
// Security is enforced via Firebase Security Rules and Authorized Domains.
const firebaseConfig = {
  apiKey: atob("QUl6YVN5REFrWjBWN2pjQXlrNWkzNTI3Q0puN0syZ2lTMDA5a0Jv"),
  authDomain: "rezanur-portfolio.firebaseapp.com",
  projectId: "rezanur-portfolio",
  storageBucket: "rezanur-portfolio.firebasestorage.app",
  messagingSenderId: "675496607342",
  appId: "1:675496607342:web:40d6cad350ae2c9a3fb07f"
};

// Initialize Firebase
if (typeof firebase !== "undefined" && !firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = typeof firebase !== "undefined" && typeof firebase.auth === "function" ? firebase.auth() : null;
const db = typeof firebase !== "undefined" && typeof firebase.firestore === "function" ? firebase.firestore() : null;
const storage = typeof firebase !== "undefined" && typeof firebase.storage === "function" ? firebase.storage() : null;
