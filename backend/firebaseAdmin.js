// backend/firebaseAdmin.js (The final, most stable structure)

// 🔑 CRITICAL FIX: Use the specific imports provided by the SDK's index.
import admin from 'firebase-admin'; // Use default import for the main object

import { createRequire } from 'module'; 

const require = createRequire(import.meta.url);

// 🎯 Ensure this loads your valid key file
const serviceAccount = require('./serviceAccountKey.json'); 

// Initialize Firebase Admin SDK
try {
    // Check if the app is already running (for nodemon stability)
    // Use admin.apps.length only after ensuring admin is imported above
    if (!admin.apps.length) { 
        admin.initializeApp({ // Use admin.initializeApp
            credential: admin.credential.cert(serviceAccount) // Use admin.credential.cert
        });
        console.log("🔥 Firebase Admin SDK Initialized.");
    }
} catch (error) {
    // This catches the error if the key file was not valid or loaded
    console.error("❌ Firebase Admin SDK Initialization Error:", error);
}

export default admin;