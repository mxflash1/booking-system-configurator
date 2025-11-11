// Firebase Admin Configuration for Client Submissions
// This is YOUR Firebase project that stores client orders

// Firebase config for Booking Builder Service
const firebaseConfig = {
  apiKey: "AIzaSyA68uFSW06Bt0a60x4CgCEwwukzHgiQo9s",
  authDomain: "booking-website-builder.firebaseapp.com",
  projectId: "booking-website-builder",
  storageBucket: "booking-website-builder.firebasestorage.app",
  messagingSenderId: "1030221122115",
  appId: "1:1030221122115:web:e8afad42d58179463062f6",
  measurementId: "G-8PW7EN6165"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Collection name for client submissions
const SUBMISSIONS_COLLECTION = 'client_submissions';

// Save a client submission to Firestore
async function saveClientSubmission(formData) {
  try {
    const submission = {
      ...formData,
      status: 'pending', // pending, in_progress, completed, cancelled
      submittedAt: firebase.firestore.FieldValue.serverTimestamp(),
      notes: '', // Admin notes
      completedAt: null
    };
    
    const docRef = await db.collection(SUBMISSIONS_COLLECTION).add(submission);
    console.log('✅ Submission saved with ID:', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('❌ Error saving submission:', error);
    return { success: false, error: error.message };
  }
}

// Get all submissions (for admin dashboard)
async function getAllSubmissions() {
  try {
    const snapshot = await db.collection(SUBMISSIONS_COLLECTION)
      .orderBy('submittedAt', 'desc')
      .get();
    
    const submissions = [];
    snapshot.forEach(doc => {
      submissions.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return submissions;
  } catch (error) {
    console.error('❌ Error fetching submissions:', error);
    return [];
  }
}

// Update submission status
async function updateSubmissionStatus(submissionId, status, notes = '') {
  try {
    const updates = { status, notes };
    
    if (status === 'completed') {
      updates.completedAt = firebase.firestore.FieldValue.serverTimestamp();
    }
    
    await db.collection(SUBMISSIONS_COLLECTION).doc(submissionId).update(updates);
    console.log('✅ Submission updated');
    return { success: true };
  } catch (error) {
    console.error('❌ Error updating submission:', error);
    return { success: false, error: error.message };
  }
}

// Delete a submission
async function deleteSubmission(submissionId) {
  try {
    await db.collection(SUBMISSIONS_COLLECTION).doc(submissionId).delete();
    console.log('✅ Submission deleted');
    return { success: true };
  } catch (error) {
    console.error('❌ Error deleting submission:', error);
    return { success: false, error: error.message };
  }
}

// Email notifications are handled automatically by Firebase Cloud Functions
// When a client submits an order, the function in functions/index.js triggers
// Configure your email in functions/index.js and deploy with: firebase deploy --only functions
// See functions/EMAIL-SETUP-GUIDE.md for setup instructions

