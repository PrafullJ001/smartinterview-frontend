// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

// export default function RoleSelection({ onSelectRole }) {
//   const navigate = useNavigate();

//   const roles = [
//     {
//       id: "frontend",
//       name: "Frontend Developer",
//       icon: "💻",
//       description: "React, Angular, Vue.js, HTML, CSS, JavaScript",
//       gradientStart: "#2196F3",
//       gradientEnd: "#00BCD4",
//     },
//     {
//       id: "backend",
//       name: "Backend Developer",
//       icon: "⚙️",
//       description: "Node.js, Python, Java, Databases, APIs",
//       gradientStart: "#9C27B0",
//       gradientEnd: "#E91E63",
//     },
//     {
//       id: "datascience",
//       name: "Data Science",
//       icon: "📊",
//       description: "Python, R, Statistics, Machine Learning",
//       gradientStart: "#4CAF50",
//       gradientEnd: "#8BC34A",
//     },
//     {
//       id: "aiml",
//       name: "AI/ML Engineer",
//       icon: "🤖",
//       description: "TensorFlow, PyTorch, Neural Networks, Deep Learning",
//       gradientStart: "#FF9800",
//       gradientEnd: "#F44336",
//     },
//   ];

//   const handleRoleClick = (roleId) => {
//     if (onSelectRole) onSelectRole(roleId);
//     navigate("/questions");
//   };

//   return (
//     <div
//       className="min-vh-100 d-flex flex-column"
//       style={{
//         background: "linear-gradient(135deg, #f8f9fa 0%, #e3f2fd 50%, #f8f9fa 100%)",
//         animation: "gradientMove 8s ease infinite alternate",
//         backgroundSize: "200% 200%",
//       }}
//     >
//       {/* Header */}
//       <header
//         className="bg-white shadow-sm"
//         style={{
//           position: "sticky",
//           top: 0,
//           zIndex: 1000,
//           backdropFilter: "blur(6px)",
//         }}
//       >
//         <div className="container py-3 text-center">
//           <h4
//             className="text-primary fw-bold mb-0"
//             style={{ letterSpacing: "1px" }}
//           >
//              Select Your Role to Begin
//           </h4>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="container flex-grow-1 py-5">
//         <div className="row g-4 justify-content-center">
//           {roles.map((role, index) => (
//             <div
//               key={role.id}
//               className="col-12 col-sm-6 col-lg-5"
//               style={{
//                 animation: `fadeInUp 0.8s ease ${index * 0.15}s both`,
//               }}
//             >
//               <div
//                 className="card h-100 border-0 shadow-lg"
//                 style={{
//                   cursor: "pointer",
//                   borderRadius: "1rem",
//                   transition: "all 0.4s ease",
//                   background: "#ffffffaa",
//                   backdropFilter: "blur(4px)",
//                 }}
//                 onClick={() => handleRoleClick(role.id)}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.transform = "translateY(-10px) scale(1.03)";
//                   e.currentTarget.style.boxShadow =
//                     "0 15px 30px rgba(0,0,0,0.2)";
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.transform = "translateY(0) scale(1)";
//                   e.currentTarget.style.boxShadow =
//                     "0 6px 12px rgba(0,0,0,0.1)";
//                 }}
//               >
//                 <div className="card-body text-center py-5">
//                   <div
//                     className="d-inline-flex align-items-center justify-content-center mb-4"
//                     style={{
//                       width: "80px",
//                       height: "80px",
//                       borderRadius: "50%",
//                       background: `linear-gradient(135deg, ${role.gradientStart}, ${role.gradientEnd})`,
//                       color: "white",
//                       fontSize: "2.2rem",
//                       boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
//                     }}
//                   >
//                     {role.icon}
//                   </div>
//                   <h5 className="fw-bold text-dark mb-2">{role.name}</h5>
//                   <p className="text-muted mb-3">{role.description}</p>
//                   <button
//                     className="btn btn-primary px-4"
//                     style={{
//                       borderRadius: "25px",
//                       transition: "0.3s",
//                     }}
//                     onMouseEnter={(e) =>
//                       (e.currentTarget.style.boxShadow =
//                         "0 0 15px rgba(13, 110, 253, 0.6)")
//                     }
//                     onMouseLeave={(e) =>
//                       (e.currentTarget.style.boxShadow = "none")
//                     }
//                     onClick={() => handleRoleClick(role.id)}
//                   >
//                     Start Practice →
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </main>

//       {/* Footer */}
//       <footer className="text-center py-4 text-muted small">
//         © {new Date().getFullYear()} <strong>SmartInterview</strong> — Choose.
//         Practice. Succeed. 💼
//       </footer>

//       {/* ✨ Smooth animations */}
//       <style>
//         {`
//           @keyframes fadeInUp {
//             from {
//               opacity: 0;
//               transform: translateY(40px);
//             }
//             to {
//               opacity: 1;
//               transform: translateY(0);
//             }
//           }
//           @keyframes gradientMove {
//             0% {
//               background-position: 0% 50%;
//             }
//             100% {
//               background-position: 100% 50%;
//             }
//           }
//         `}
//       </style>
//     </div>
//   );
// }



import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function RoleSelection({ onSelectRole }) {
  const navigate = useNavigate();

  const roles = [
    {
      id: "frontend",
      name: "Frontend Developer",
      icon: "💻",
      description: "React, Angular, Vue.js, HTML, CSS, JavaScript",
      gradientStart: "#2196F3",
      gradientEnd: "#00BCD4",
    },
    {
      id: "backend",
      name: "Backend Developer",
      icon: "⚙️",
      description: "Node.js, Python, Java, Databases, APIs",
      gradientStart: "#9C27B0",
      gradientEnd: "#E91E63",
    },
    {
      id: "datascience",
      name: "Data Science",
      icon: "📊",
      description: "Python, R, Statistics, Machine Learning",
      gradientStart: "#4CAF50",
      gradientEnd: "#8BC34A",
    },
    {
      id: "aiml",
      name: "AI/ML Engineer",
      icon: "🤖",
      description: "TensorFlow, PyTorch, Neural Networks, Deep Learning",
      gradientStart: "#FF9800",
      gradientEnd: "#F44336",
    },

    // ⭐ NEW ROLE 1 — DevOps
    {
      id: "devops",
      name: "DevOps Engineer",
      icon: "🛠️",
      description: "CI/CD, Docker, Kubernetes, AWS, Terraform",
      gradientStart: "#673AB7",
      gradientEnd: "#3F51B5",
    },

    // ⭐ NEW ROLE 2 — Cybersecurity
    {
      id: "cybersecurity",
      name: "Cybersecurity Specialist",
      icon: "🛡️",
      description: "Network Security, Pentesting, Cryptography, SIEM",
      gradientStart: "#FF5722",
      gradientEnd: "#795548",
    },
  ];

  const handleRoleClick = (roleId) => {
    if (onSelectRole) onSelectRole(roleId);
    navigate("/questions");
  };

  return (
    <div
      className="min-vh-100 d-flex flex-column"
      style={{
        background: "linear-gradient(135deg, #f8f9fa 0%, #e3f2fd 50%, #f8f9fa 100%)",
        animation: "gradientMove 8s ease infinite alternate",
        backgroundSize: "200% 200%",
      }}
    >
      {/* Header */}
      <header
        className="bg-white shadow-sm"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          backdropFilter: "blur(6px)",
        }}
      >
        <div className="container py-3 text-center">
         <h4
          className="fw-bold mb-0 role-heading"
          style={{ 
          letterSpacing: "1px",
          transition: "0.3s ease",
         color: "black"
    }}
      >
      Select Your Role to Begin
     </h4>

        </div>
      </header>

      {/* Main Content */}
      <main className="container flex-grow-1 py-5">
        <div className="row g-4 justify-content-center">
          {roles.map((role, index) => (
            <div
              key={role.id}
              className="col-12 col-sm-6 col-lg-5"
              style={{
                animation: `fadeInUp 0.8s ease ${index * 0.15}s both`,
              }}
            >
              <div
                className="card h-100 border-0 shadow-lg"
                style={{
                  cursor: "pointer",
                  borderRadius: "1rem",
                  transition: "all 0.4s ease",
                  background: "#ffffffaa",
                  backdropFilter: "blur(4px)",
                }}
                onClick={() => handleRoleClick(role.id)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px) scale(1.03)";
                  e.currentTarget.style.boxShadow =
                    "0 15px 30px rgba(0,0,0,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 12px rgba(0,0,0,0.1)";
                }}
              >
                <div className="card-body text-center py-5">
                  <div
                    className="d-inline-flex align-items-center justify-content-center mb-4"
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, ${role.gradientStart}, ${role.gradientEnd})`,
                      color: "white",
                      fontSize: "2.2rem",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                    }}
                  >
                    {role.icon}
                  </div>
                  <h5 className="fw-bold text-dark mb-2">{role.name}</h5>
                  <p className="text-muted mb-3">{role.description}</p>
                  <button
                    className="btn btn-primary px-4"
                    style={{
                      borderRadius: "25px",
                      transition: "0.3s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.boxShadow =
                        "0 0 15px rgba(13, 110, 253, 0.6)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.boxShadow = "none")
                    }
                    onClick={() => handleRoleClick(role.id)}
                  >
                    Start Practice →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="text-center py-4 text-muted small">
        © {new Date().getFullYear()} <strong>SmartInterview</strong> — Choose.
        Practice. Succeed. 💼
      </footer>

      {/* Animations */}
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(40px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes gradientMove {
            0% {
              background-position: 0% 50%;
            }
            100% {
              background-position: 100% 50%;
            }
          }

          /* Heading hover effect */
          .role-heading:hover {
            color: #0d6efd;
            text-shadow: 0 0 10px rgba(13,110,253,0.7);
            transform: scale(1.05);
          }
        `}
      </style>
    </div>
  );
}
