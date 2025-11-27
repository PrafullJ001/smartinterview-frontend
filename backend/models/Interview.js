

// import mongoose from "mongoose";

// const InterviewSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: String, // Firebase UID
//       required: true,
//     },
//     role: {
//       type: String,
//       required: true,
//     },
//     questions: [
//       {
//         question: { type: String, required: true },

//         // 🔥 FIX: allow empty user answers safely
//         answer: { 
//           type: String, 
//           required: true, 
//           default: "No answer provided" 
//         },

//         // AI Feedback (optional)
//         aiFeedback: { 
//           type: String, 
//           default: "" 
//         },
//       },
//     ],
//   },
//   { timestamps: true }
// );

// // Export Interview model
// export default mongoose.model("Interview", InterviewSchema);





import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true, 
  },
  aiFeedback: {
    type: String,
    // Set to false: If the AI call fails, you can still save the interview.
    required: false, 
    default: "No AI feedback generated."
  },
}, { _id: false }); 

const interviewSchema = new mongoose.Schema(
  {
    userId: {
      type: String, // ✅ CORRECTED: Use String for Firebase UIDs or external identifiers.
      required: true,
      index: true,
    },
    role: {
      type: String,
      required: true,
    },
    questions: [questionSchema],
  },
  {
    timestamps: true,
  }
);

const Interview = mongoose.model("Interview", interviewSchema);

export default Interview;