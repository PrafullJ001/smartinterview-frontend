

// import React, { useEffect, useState } from "react";
// import { generateAIFeedback } from "../api/ai"; 
// import { useLocation, useNavigate } from "react-router-dom"; 

// export default function ResultPage() {
//   const navigate = useNavigate();
//   const location = useLocation(); 

//   const [interviewData, setInterviewData] = useState([]);
//   const [role, setRole] = useState("");
//   const [overallFeedback, setOverallFeedback] = useState(""); 
//   const [loading, setLoading] = useState(false);
//   const [idError, setIdError] = useState("");
//   const [hasFetched, setHasFetched] = useState(false); 
//   const [isGeneratingClicked, setIsGeneratingClicked] = useState(false); // ✅ NEW

//   useEffect(() => {
//     const data = JSON.parse(localStorage.getItem("tempInterviewData") || "[]");
//     const savedRole = localStorage.getItem("tempInterviewRole") || "";
//     setInterviewData(data);
//     setRole(savedRole);

//     localStorage.removeItem("tempInterviewData");
//     localStorage.removeItem("tempInterviewRole");
//   }, []);
  
//   const handleGenerateFeedback = async () => {
//     if (hasFetched) return;

//     const interviewId = localStorage.getItem("interviewId");

//     if (!interviewId) {
//       setIdError("❌ Interview ID not found! Cannot generate AI feedback.");
//       return;
//     }

//     try {
//       setIsGeneratingClicked(true);      // ✅ FIXED
//       setLoading(true);
//       setIdError(""); 
      
//       const res = await generateAIFeedback(interviewId);
//       const feedbackArray = res?.questions; 
//       const summary = res?.summary || "Summary feedback placeholder."; 

//       if (feedbackArray && Array.isArray(feedbackArray)) {
//         const updatedInterviewData = interviewData.map(qaItem => {
//           const feedbackItem = feedbackArray.find(
//             fb => fb.question === qaItem.question
//           );

//           return {
//             ...qaItem,
//             feedback: feedbackItem?.aiFeedback || "",
//           };
//         });

//         setInterviewData(updatedInterviewData);
//         setHasFetched(true);
//         setOverallFeedback(summary);
//       } else {
//         console.error("Server response structure problem:", res);
//         setIdError("⚠️ Feedback data structure missing in the server response. Check console.");
//       }

//     } catch (err) {
//       setOverallFeedback("Error generating feedback.");
//       setIdError(`Feedback Error: ${err.message}`);
//       console.error("Feedback error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!interviewData.length) {
//     return (
//       <div className="vh-100 d-flex justify-content-center align-items-center text-center bg-light">
//         <div className="card shadow-lg p-5">
//           <h3 className="text-danger">⚠️ Interview Data Missing</h3>
//           <p>Please complete the interview to view results.</p>
//           <button
//             onClick={() => navigate("/roles")}
//             className="btn btn-primary mt-3"
//           >
//             ⬅ Back to Role Selection
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div
//       className="min-vh-100"
//       style={{
//         background: "linear-gradient(135deg, #f0f4c3 0%, #e1f5fe 100%)",
//         padding: "2rem",
//       }}
//     >
//       <header className="text-center mb-4">
//         <h2 className="text-primary">📊 Interview Result</h2>
//         <span className="badge bg-info text-dark p-2">
//           {role.toUpperCase()}
//         </span>

//         <div className="mt-4">
//           <button
//             className="btn btn-primary btn-lg"
//             style={{
//               background: "linear-gradient(90deg, #2196F3, #21CBF3)",
//               border: "none",
//             }}
//             onClick={handleGenerateFeedback}
//             disabled={loading || hasFetched} 
//           >
//             {loading 
//               ? "Generating..." 
//               : hasFetched ? "AI Feedback Received" : "Generate AI Feedback"
//             }
//           </button>
//         </div>

//         {idError && (
//           <p className="text-danger mt-3 fw-bold">{idError}</p>
//         )}
//       </header>

//       <div className="container" style={{ maxWidth: "900px", margin: "0 auto" }}>

//         {overallFeedback && overallFeedback !== "Summary feedback placeholder." && (
//           <div className="card p-4 shadow mb-4 border-success border-3">
//             <h4 className="text-success mb-3">🧠 AI Overall Summary</h4>
//             <p>{overallFeedback}</p>
//           </div>
//         )}

//         {interviewData.map((item, idx) => (
//           <div
//             key={idx}
//             className="card shadow-sm mb-4 border-0"
//             style={{
//               borderRadius: "12px",
//               overflow: "hidden",
//               transition: "transform 0.3s",
//             }}
//             onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
//             onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
//           >
//             <div className="card-body p-4">
//               <h5 className="text-primary fw-bold mb-3">
//                 Q{idx + 1}: {item.question}
//               </h5>

//               <p className="mb-3">
//                 <strong>Answer:</strong> {item.answer || "No answer provided"}
//               </p>

//               <p className="text-secondary fst-italic mb-0">
//                 <strong>Feedback:</strong>{" "}
//                 <span className="text-success fw-bold d-block mt-2">
                  
//                   {/* FIXED LOADING + FEEDBACK DISPLAY */}
//                   {loading && isGeneratingClicked ? (
//                     "⏳ Generating feedback..."
//                   ) : hasFetched ? (
//                     item.feedback ? (
//                       item.feedback.split("\n").map((line, index) => (
//                         <div key={index}>{line}</div>
//                       ))
//                     ) : (
//                       "No specific feedback available."
//                     )
//                   ) : (
//                     ""
//                   )}

//                 </span>
//               </p>
//             </div>
//           </div>
//         ))}

//         <div className="text-center mt-5">
//           <button
//             className="btn btn-primary btn-lg"
//             style={{
//               background: "linear-gradient(90deg, #2196F3, #21CBF3)",
//               border: "none",
//             }}
//             onClick={() => navigate("/roles")}
//           >
//             ⬅ Back to Role Selection
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }







import React, { useEffect, useState } from "react";
import { generateAIFeedback } from "../api/ai"; 
import { useLocation, useNavigate } from "react-router-dom"; 

export default function ResultPage() {
  const navigate = useNavigate();
  const location = useLocation(); 

  const [interviewData, setInterviewData] = useState([]);
  const [role, setRole] = useState("");
  const [overallFeedback, setOverallFeedback] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [idError, setIdError] = useState("");
  const [hasFetched, setHasFetched] = useState(false); 
  const [isGeneratingClicked, setIsGeneratingClicked] = useState(false); 

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("tempInterviewData") || "[]");
    const savedRole = localStorage.getItem("tempInterviewRole") || "";
    setInterviewData(data);
    setRole(savedRole);

    localStorage.removeItem("tempInterviewData");
    localStorage.removeItem("tempInterviewRole");
  }, []);
  
  const handleGenerateFeedback = async () => {
    if (hasFetched) return;

    const interviewId = localStorage.getItem("interviewId");

    if (!interviewId) {
      setIdError("❌ Interview ID not found! Cannot generate AI feedback.");
      return;
    }

    try {
      setIsGeneratingClicked(true);      
      setLoading(true);
      setIdError(""); 
      
      const res = await generateAIFeedback(interviewId);
      const feedbackArray = res?.questions; 
      const summary = res?.summary || "Summary feedback placeholder."; 

      if (feedbackArray && Array.isArray(feedbackArray)) {
        const updatedInterviewData = interviewData.map(qaItem => {
          const feedbackItem = feedbackArray.find(
            fb => fb.question === qaItem.question
          );

          return {
            ...qaItem,
            feedback: feedbackItem?.aiFeedback || "",
          };
        });

        setInterviewData(updatedInterviewData);
        setHasFetched(true);
        setOverallFeedback(summary);
      } else {
        console.error("Server response structure problem:", res);
        setIdError("⚠️ Feedback data structure missing in the server response. Check console.");
      }

    } catch (err) {
      setOverallFeedback("Error generating feedback.");
      setIdError(`Feedback Error: ${err.message}`);
      console.error("Feedback error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!interviewData.length) {
    return (
      <div className="vh-100 d-flex justify-content-center align-items-center text-center bg-light">
        <div className="card shadow-lg p-5">
          <h3 className="text-danger">⚠️ Interview Data Missing</h3>
          <p>Please complete the interview to view results.</p>
          <button
            onClick={() => navigate("/roles")}
            className="btn btn-primary mt-3"
          >
            ⬅ Back to Role Selection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-vh-100"
      style={{
        background: "linear-gradient(135deg, #f0f4c3 0%, #e1f5fe 100%)",
        padding: "2rem",
      }}
    >
      <header className="text-center mb-4">
        <h2 className="text-primary">📊 Interview Result</h2>
        <span className="badge bg-info text-dark p-2">
          {role.toUpperCase()}
        </span>

        <div className="mt-4">
          <button
            className="btn btn-primary btn-lg"
            style={{
              background: "linear-gradient(90deg, #2196F3, #21CBF3)",
              border: "none",
            }}
            onClick={handleGenerateFeedback}
            disabled={loading || hasFetched} 
          >
            {loading 
              ? "Generating..." 
              : hasFetched ? "AI Feedback Received" : "Generate AI Feedback"
            }
          </button>
        </div>

        {idError && (
          <p className="text-danger mt-3 fw-bold">{idError}</p>
        )}
      </header>

      <div className="container" style={{ maxWidth: "900px", margin: "0 auto" }}>

        {overallFeedback && overallFeedback !== "Summary feedback placeholder." && (
          <div className="card p-4 shadow mb-4 border-success border-3">
            <h4 className="text-success mb-3">🧠 AI Overall Summary</h4>
            <p>{overallFeedback}</p>
          </div>
        )}

        {interviewData.map((item, idx) => (
          <div
            key={idx}
            className="card shadow-sm mb-4 border-0"
            style={{
              borderRadius: "12px",
              overflow: "hidden",
              transition: "transform 0.3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <div className="card-body p-4">
              <h5 className="text-primary fw-bold mb-3">
                Q{idx + 1}: {item.question}
              </h5>

              <p className="mb-3">
                <strong>Answer:</strong> {item.answer || "No answer provided"}
              </p>

              {/* 🛑 FIX: Changed parent <p> to <div> to allow nested <div> elements for line breaks */}
              <div className="text-secondary fst-italic mb-0"> 
                <strong>Feedback:</strong>{" "}
                <span className="text-success fw-bold d-block mt-2">
                  
                  {/* The logic here ensures that only one set of feedback text is rendered based on state. */}
                  {loading && isGeneratingClicked ? (
                    "⏳ Generating feedback..."
                  ) : hasFetched ? (
                    item.feedback ? (
                      // Allows multi-line feedback using <div> for line breaks
                      item.feedback.split("\n").map((line, index) => (
                        <div key={index}>{line}</div> 
                      ))
                    ) : (
                      "No specific feedback available."
                    )
                  ) : (
                    ""
                  )}

                </span>
              </div>
            </div>
          </div>
        ))}

        <div className="text-center mt-5">
          <button
            className="btn btn-primary btn-lg"
            style={{
              background: "linear-gradient(90deg, #2196F3, #21CBF3)",
              border: "none",
            }}
            onClick={() => navigate("/roles")}
          >
            ⬅ Back to Role Selection
          </button>
        </div>
      </div>
    </div>
  );
}