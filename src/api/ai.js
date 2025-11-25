// // Base URL for the Express server running on port 5000
// const API_BASE_URL = "http://localhost:5000/api/ai";

// /**
//  * Fetches the initial set of questions from the backend.
//  * For now, returns static questions.
//  */
// export const getInitialQuestions = async (role) => {
//   if (!role) return [];

//   try {
//     return [
//       { id: 1, question: "Explain your understanding of the role.", answer: "", isAnswered: false },
//       { id: 2, question: "What are your technical strengths?", answer: "", isAnswered: false },
//       { id: 3, question: "Describe a challenging project you worked on.", answer: "", isAnswered: false },
//     ];
//   } catch (error) {
//     console.error("API call to get questions failed:", error);
//     throw new Error(`Failed to load questions. Details: ${error.message}`);
//   }
// };
// /**
//  * Submits user answers to the backend for AI feedback.
//  * NOW sends an array of OBJECTS: [{ question, answer }]
//  * @param {string} userId - Authenticated user ID
//  * @param {string} role - Selected interview role
//  * @param {Array<Object>} userAnswers - Array of answered questions [{ question, answer }]
//  * @returns {Promise<Array<Object>>} - AI feedback array [{ question, feedback }]
//  */
// export const getAIResults = async (userId, role, userAnswers) => {
//     try {
//         if (!Array.isArray(userAnswers) || userAnswers.length === 0) {
//             throw new Error("userAnswers must be a non-empty array");
//         }

//         // --- FIX IS HERE: Map userAnswers into the required OBJECT structure ---
//         const questionsToSend = userAnswers.map(q => {
//             // Ensure both question and answer fields are present (as required by Mongoose)
//             return {
//                 // Ensure question is always a string, fallback to empty string
//                 question: (typeof q.question === "string" && q.question.trim() !== "") 
//                     ? q.question 
//                     : "No question provided",
                
//                 // Ensure answer is always a string, fallback to empty string
//                 answer: (typeof q.answer === "string" && q.answer.trim() !== "")
//                     ? q.answer
//                     : "No answer provided",
//             };
//         });
//         // ---------------------------------------------------------------------

//         const response = await fetch(`${API_BASE_URL}/save-interview`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//                 userId,
//                 role,
//                 // Send the new array of objects
//                 questions: questionsToSend, 
//             }),
//         });

//         // ... rest of the error handling remains the same ...

//         if (!response.ok) {
//             let errorDetails = `HTTP error! status: ${response.status}`;
//             try {
//                 const errorData = await response.json();
//                 errorDetails = errorData.error || errorDetails;
//             } catch {
//                 errorDetails = `HTTP error! status: ${response.status}. Check backend logs.`;
//             }
//             throw new Error(errorDetails);
//         }

//         const data = await response.json();
//         // Return AI feedback array [{ question, feedback }]
//         return Array.isArray(data?.interview?.feedback) ? data.interview.feedback : [];
//     } catch (error) {
//         console.error("API call to save and get feedback failed:", error);
//         throw new Error(`Connection Error: Could not reach the AI service or server error occurred. Details: ${error.message}`);
//     }
// };








// src/api/ai.js

// Base URL for the Express server running on port 5000
const API_BASE_URL = "http://localhost:5000/api/ai";

/**
 * Fetches the initial set of questions from the backend.
 */
// 🟢 CRITICAL FIX: Ensure 'export' is used
export const getInitialQuestions = async (role) => {
  if (!role) return [];

  try {
    // This is the static data currently used for questions
    return [
      { id: 1, question: "Explain your understanding of the role.", answer: "", isAnswered: false },
      { id: 2, question: "What are your technical strengths?", answer: "", isAnswered: false },
      { id: 3, question: "Describe a challenging project you worked on.", answer: "", isAnswered: false },
    ];
  } catch (error) {
    console.error("API call to get questions failed:", error);
    throw new Error(`Failed to load questions. Details: ${error.message}`);
  }
};

/**
 * Submits user answers to the backend for AI feedback.
 */
// 🟢 CRITICAL FIX: Ensure 'export' is used
export const getAIResults = async (userId, role, userAnswers) => {
  try {
    if (!Array.isArray(userAnswers) || userAnswers.length === 0) {
      throw new Error("userAnswers must be a non-empty array");
    }

    const questionsToSend = userAnswers.map((q) => {
      // Ensure the keys match what the backend expects (question, answer)
      return {
        question: q.question || "No question provided",
        answer: q.answer || "No answer provided",
      };
    });

    const response = await fetch(`${API_BASE_URL}/save-interview`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        role,
        questions: questionsToSend, // Backend receives this array
      }),
    });

    if (!response.ok) {
      let errorDetails = `HTTP error! status: ${response.status}`;
      try {
        const errorData = await response.json();
        errorDetails = errorData.error || errorData.message || errorDetails; 
      } catch {
        errorDetails = `HTTP error! status: ${response.status}. Could not parse error response.`;
      }
      throw new Error(errorDetails); 
    }

    const data = await response.json();

    // Store the ID for the second fetch in ResultPage
    if (data?.interviewId) {
      localStorage.setItem("interviewId", data.interviewId);
      console.log("💾 Interview ID stored:", data.interviewId);
    } else {
      console.warn("⚠️ Interview ID missing in backend response!");
    }

    return data?.interview || {};
    
  } catch (error) {
    console.error("API call to save and get feedback failed:", error);
    throw new Error(
      `Connection Error or Server Failed: ${error.message}`
    );
  }
};

// Wait until AI feedback is actually ready
export const generateAIFeedback = async (interviewId) => {
  try {
    let attempts = 0;
    const maxAttempts = 25; // waits max 25 seconds

    while (attempts < maxAttempts) {
      const res = await fetch(`${API_BASE_URL}/results/${interviewId}`);

      if (!res.ok) {
        throw new Error(`Failed: ${res.statusText}`);
      }

      const data = await res.json();
      const questions = data?.interview?.questions || [];

      // Check if AI feedback exists
      const aiReady = questions.some(q => q.aiFeedback && q.aiFeedback.trim() !== "");

      if (aiReady) {
        // AI feedback finished — return real data
        return data.interview;
      }

      // Wait 1 second and check again
      await new Promise(resolve => setTimeout(resolve, 1000));

      attempts++;
    }

    // If AI never returns response
    return {
      success: false,
      error: "AI feedback taking too long. Try again.",
      questions: []
    };

  } catch (err) {
    console.error("Error fetching AI feedback:", err);
    return { success: false, questions: [], error: err.message };
  }
};
