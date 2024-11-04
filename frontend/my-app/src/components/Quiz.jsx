import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import api from './api'; 
import '../App.css';

const Quiz = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [timeLeft, setTimeLeft] = useState(3600);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [token, navigate]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await api.get('/quiz'); 

        const data = response.data;
        const questionData = data.flatMap(quiz => quiz.questions);
        setQuestions(questionData);
        setIsLoading(false);
      } catch (err) {
        console.log('Error fetching quiz data:', err);
      }
    };
    fetchQuestions();
  }, [token]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleOptionChange = (isCorrect, index) => {
    setSelectedIndex(index);
    if (isCorrect) {
      setCorrectAnswersCount(prev => prev + 1);
    }
  };

  const handleSubmit = async () => {
    const testStartTime = new Date(localStorage.getItem('testStartTime'));
    const testEndTime = new Date();
    const totalTime = Math.floor((testEndTime - testStartTime) / 1000);

    const resultData = {
      totalQuestions: questions.length,
      correctAnswers: correctAnswersCount,
      totalTime,
      testStartTime: testStartTime.toISOString(),
      testEndTime: testEndTime.toISOString(),
    };

    try {
      const response = await api.post('/saveRecord', resultData); 

      if (response.status === 201) {
        console.log('Results sent successfully');
        navigate('/result');
      } else {
        console.error('Failed to send results:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending results:', error);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedIndex(null);
    } else {
      handleSubmit();
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins} min${mins !== 1 ? 's' : ''}: ${secs < 10 ? '0' : ''}${secs} sec`;
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  const currentQuestion = questions.length > 0 && questions[currentIndex] ? questions[currentIndex].questionText : 'No Question Available';
  const currentOptions = questions.length > 0 && questions[currentIndex] ? questions[currentIndex].options : [];

  return (
    <>
      {isAuthenticated && (
        <div className='position-relative'>
        
          <div className='position-fixed top-0 end-0 p-2 m-2 mt-4 border rounded-3 bg-white text-success fw-bold'>
            Time Left: {formatTime(timeLeft)}
          </div>
          
          <div className='border mt-5 shadow bg-white box rounded-3'>
            <div className='mx-4 mt-4'>
              <b>Question {currentIndex + 1}/{questions.length}</b>
              <p className='mt-4'>{currentQuestion}</p>
            </div>
            <div className='d-flex flex-column gap-4 mt-4'>
              {currentOptions.map((item, index) => (
                <div key={index} className='d-flex gap-2 mx-4'>
                  <input 
                    type="checkbox" 
                    checked={selectedIndex === index} 
                    onChange={() => handleOptionChange(item.isCorrect, index)} 
                    className='checkBox' 
                  />
                  <label>{item.optionText}</label>
                </div>
              ))}
            </div>
            <div className='mx-4 mt-4'>
              <button type="button" onClick={handleNextQuestion} className="btn btn-outline-success">
                {currentIndex < questions.length - 1 ? "Next Question" : "Submit Quiz"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Quiz;













































































































































































































































































































































































































































































































// import React, { useEffect, useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useNavigate } from 'react-router-dom';
// import '../App.css';

// const Quiz = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [questions, setQuestions] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isLoading, setIsLoading] = useState(true);
//   const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
//   const [selectedIndex, setSelectedIndex] = useState(null);
//   const [timeLeft, setTimeLeft] = useState(3600);
//   const navigate = useNavigate();
//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     if (!token) {
//       navigate('/login');
//     } else {
//       setIsAuthenticated(true);
//     }
//   }, [token, navigate]);

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const response = await fetch('http://localhost:3000/quiz', {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
        
//         if (!response.ok) {
//           console.log('Network response was not ok');
//           return;
//         }
    
//         const data = await response.json();
//         const questionData = data.flatMap(quiz => quiz.questions);
//         setQuestions(questionData);
//         setIsLoading(false);
//       } catch (err) {
//         console.log('Error fetching quiz data:', err);
//       }
//     };
//     fetchQuestions();
//   }, [token]);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeLeft(prevTime => {
//         if (prevTime <= 1) {
//           clearInterval(timer);
//           handleSubmit();
//           return 0;
//         }
//         return prevTime - 1;
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   const handleOptionChange = (isCorrect, index) => {
//     setSelectedIndex(index);
//     if (isCorrect) {
//       setCorrectAnswersCount(prev => prev + 1);
//     }
//   };

//   const handleSubmit = async () => {
//     const testStartTime = new Date(localStorage.getItem('testStartTime'));
//     const testEndTime = new Date();
//     const totalTime = Math.floor((testEndTime - testStartTime) / 1000);

//     const resultData = {
//       totalQuestions: questions.length,
//       correctAnswers: correctAnswersCount,
//       totalTime,
//       testStartTime: testStartTime.toISOString(),
//       testEndTime: testEndTime.toISOString(),
//     };

//     try {
//       const response = await fetch('http://localhost:3000/saveRecord', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(resultData),
//       });

//       if (!response.ok) {
//         console.error('Failed to send results:', response.statusText);
//       } else {
//         console.log('Results sent successfully');
//         navigate('/result');
//       }
//     } catch (error) {
//       console.error('Error sending results:', error);
//     }
//   };

//   const handleNextQuestion = () => {
//     if (currentIndex < questions.length - 1) {
//       setCurrentIndex(prev => prev + 1);
//       setSelectedIndex(null);
//     } else {
//       handleSubmit();
//     }
//   };

//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins} min${mins !== 1 ? 's' : ''}: ${secs < 10 ? '0' : ''}${secs} sec`;
//   };

//   if (isLoading) {
//     return <h1>Token not found</h1>;

//   }

//   const currentQuestion = questions.length > 0 && questions[currentIndex] ? questions[currentIndex].questionText : 'No Question Available';
//   const currentOptions = questions.length > 0 && questions[currentIndex] ? questions[currentIndex].options : [];

//   return (
//     <>
//       {isAuthenticated && (
//         <div className='position-relative'>
        
//           <div className='position-fixed top-0 end-0 p-2 m-2 mt-4 border rounded-3 bg-white text-success fw-bold'>
//             Time Left: {formatTime(timeLeft)}
//           </div>
          
        
//           <div className='border mt-5 shadow bg-white box rounded-3'>
//             <div className='mx-4 mt-4'>
//               <b>Question {currentIndex + 1}/{questions.length}</b>
//               <p className='mt-4'>{currentQuestion}</p>
//             </div>
//             <div className='d-flex flex-column gap-4 mt-4'>
//               {currentOptions.map((item, index) => (
//                 <div key={index} className='d-flex gap-2 mx-4'>
//                   <input 
//                     type="checkbox" 
//                     checked={selectedIndex === index} 
//                     onChange={() => handleOptionChange(item.isCorrect, index)} 
//                     className='checkBox' 
//                   />
//                   <label>{item.optionText}</label>
//                 </div>
//               ))}
//             </div>
//             <div className='mx-4 mt-4'>
//               <button type="button" onClick={handleNextQuestion} className="btn btn-outline-success">
//                 {currentIndex < questions.length - 1 ? "Next Question" : "Submit Quiz"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Quiz;




































































































































































































































































































































































































































































// import React, { useEffect, useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useNavigate } from 'react-router-dom';
// import '../App.css';

// const Quiz = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [questions, setQuestions] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isLoading, setIsLoading] = useState(true);
//   const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
//   const [selectedIndex, setSelectedIndex] = useState(null);
//   const [timeLeft, setTimeLeft] = useState(3600);
//   const navigate = useNavigate();
//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     if (!token) {
//       navigate('/landing');
//     } else {
//       setIsAuthenticated(true);
//     }
//   }, [token, navigate]);

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const response = await fetch('http://localhost:3000/quiz', {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         if (!response.ok) {
//           console.log('Network response was not ok');
//           return;
//         }
//         const data = await response.json();
//         const questionData = data.flatMap(quiz => quiz.questions);
//         setQuestions(questionData);
//         setIsLoading(false);
//       } catch (err) {
//         console.log('Error fetching quiz data:', err);
//       }
//     };
//     fetchQuestions();
//   }, [token]);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeLeft(prevTime => {
//         if (prevTime <= 1) {
//           clearInterval(timer);
//           handleSubmit();
//           return 0;
//         }
//         return prevTime - 1;
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   const handleOptionChange = (isCorrect, index) => {
//     setSelectedIndex(index);
//     if (isCorrect) {
//       setCorrectAnswersCount(prev => prev + 1);
//     }
//   };

//   const handleSubmit = async () => {
//     const testStartTime = new Date(localStorage.getItem('testStartTime'));
//     const testEndTime = new Date();
//     const totalTime = Math.floor((testEndTime - testStartTime) / 1000);

//     const resultData = {
//       totalQuestions: questions.length,
//       correctAnswers: correctAnswersCount,
//       totalTime,
//       testStartTime: testStartTime.toISOString(),
//       testEndTime: testEndTime.toISOString(),
//     };

//     try {
//       const response = await fetch('http://localhost:3000/saveRecord', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(resultData),
//       });

//       if (!response.ok) {
//         console.error('Failed to send results:', response.statusText);
//       } else {
//         console.log('Results sent successfully');
//         navigate('/result');
//       }
//     } catch (error) {
//       console.error('Error sending results:', error);
//     }
//   };

//   const handleNextQuestion = () => {
//     if (currentIndex < questions.length - 1) {
//       setCurrentIndex(prev => prev + 1);
//       setSelectedIndex(null);
//     } else {
//       handleSubmit();
//     }
//   };

//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins} min${mins !== 1 ? 's' : ''}: ${secs < 10 ? '0' : ''}${secs} sec`;
//   };

//   if (isLoading) {
//     return <h1>Loading......</h1>;
//   }

//   const currentQuestion = questions.length > 0 && questions[currentIndex] ? questions[currentIndex].questionText : 'No Question Available';
//   const currentOptions = questions.length > 0 && questions[currentIndex] ? questions[currentIndex].options : [];

//   return (
//     <>
//       {isAuthenticated && (
//         <div className='position-relative'>
//           <div className='border mt-5 shadow bg-white box rounded-3'>
//             <div className='mx-4 mt-4'>
//               <b>Question {currentIndex + 1}/{questions.length}</b>
//               <p className='mt-4'>{currentQuestion}</p>
//             </div>
//             <div className='d-flex flex-column gap-4 mt-4'>
//               {currentOptions.map((item, index) => (
//                 <div key={index} className='d-flex gap-2 mx-4'>
//                   <input 
//                     type="checkbox" 
//                     checked={selectedIndex === index} 
//                     onChange={() => handleOptionChange(item.isCorrect, index)} 
//                     className='checkBox' 
//                   />
//                   <label>{item.optionText}</label>
//                 </div>
//               ))}
//             </div>
//             <div className='mx-4 mt-4'>
//               <button type="button" onClick={handleNextQuestion} className="btn btn-outline-success">
//                 {currentIndex < questions.length - 1 ? "Next Question" : "Submit Quiz"}
//               </button>
//             </div>
//           </div>
          
//           <div className='position-absolute top-0 end-0 p-0 mt-0'>
//             <div className='border rounded-3 bg-white p-2 text-success fw-bold '>
      
//               Time Left: {formatTime(timeLeft)}
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Quiz;






















































































































// import React, { useEffect, useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useNavigate } from 'react-router-dom';
// import '../App.css';

// const Quiz = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   const [questions, setQuestions] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isLoading, setIsLoading] = useState(true);
//   const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
//   const [selectedIndex, setSelectedIndex] = useState(null);
//   const [timeLeft, setTimeLeft] = useState(3600); 
//   const navigate = useNavigate();
//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     if (!token) {
//       navigate('/login');
//     } else {
//       setIsAuthenticated(true);
//     }
//   }, [token, navigate]);

//   useEffect(() => {
//     async function fetchQuestions() {
//       const token = localStorage.getItem("token");
//       try {
//         const response = await fetch('http://localhost:3000/quiz', {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           }
//         });
//         if (!response.ok) {
//           console.log('Network response was not ok');
//           return;
//         }
//         const data = await response.json();
//         const questionData = data.flatMap(quiz => quiz.questions);
//         setQuestions(questionData);
//         setIsLoading(false);
//       } catch (err) {
//         console.log("Error fetching quiz data:", err);
//       }
//     }
//     fetchQuestions();
//   }, []);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeLeft(prevTime => {
//         if (prevTime <= 1) {
//           clearInterval(timer);
//           handleSubmit();
//           return 0;
//         }
//         return prevTime - 1;
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [navigate]);

//   if (isLoading) {
//     // return <h1>Loading......</h1>;
//     navigate("/login");
//   }

//   const currentQuestion = questions.length > 0 && questions[currentIndex] ? questions[currentIndex].questionText : 'No Question Available';
//   const currentOptions = questions.length > 0 && questions[currentIndex] ? questions[currentIndex].options : [];

//   const handleOptionChange = (isCorrect, index) => {
//     setSelectedIndex(index);
//     if (isCorrect) {
//       setCorrectAnswersCount(prev => prev + 1);
//     }
//   };

//   const handleSubmit = async () => {
//     const token = localStorage.getItem("token");
//     const testStartTime = new Date(localStorage.getItem('testStartTime'));
//     const testEndTime = new Date();
//     const totalTime = Math.floor((testEndTime - testStartTime) / 1000); 

//     const resultData = {
//       totalQuestions: questions.length,
//       correctAnswers: correctAnswersCount,
//       totalTime, 
//       testStartTime: testStartTime.toISOString(),
//       testEndTime: testEndTime.toISOString()
//     };

//     try {
//       const response = await fetch('http://localhost:3000/saveRecord', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(resultData),
//       });

//       if (!response.ok) {
//         console.error('Failed to send results:', response.statusText);
//       } else {
//         console.log('Results sent successfully');
//         navigate("/result");
//       }
//     } catch (error) {
//       console.error('Error sending results:', error);
//     }
//   };

//   const handleNextQuestion = () => {
//     if (currentIndex < questions.length - 1) {
//       setCurrentIndex(prev => prev + 1);
//       setSelectedIndex(null);
//     } else {
//       handleSubmit();
//     }
//   };

//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins} mints:${secs < 10 ? '0' : ''}${secs} sec`;
//   };

//   return (
   
//    <>
    
//       <div className='position-relative'>
//         <div className='border mt-5 shadow bg-white box rounded-3'>
//           <div className='mx-4 mt-4'>
//             <b>Question {currentIndex + 1}/{questions.length}</b>
//             <p className='mt-4'>{currentQuestion}</p>
//           </div>
//           <div className='d-flex flex-column gap-4 mt-4'>
//             {currentOptions.map((item, index) => (
//               <div key={index} className='d-flex gap-2 mx-4'>
//                 <input 
//                   type="checkbox" 
//                   checked={selectedIndex === index} 
//                   onChange={() => handleOptionChange(item.isCorrect, index)} 
//                   className='checkBox' 
//                 />
//                 <label>{item.optionText}</label>
//               </div>
//             ))}
//           </div>
//           <div className='mx-4 mt-4'>
//             <button type="button" onClick={handleNextQuestion} className="btn btn-outline-success">
//               {currentIndex < questions.length - 1 ? "Next Question" : "Submit Quiz"}
//             </button>
//           </div>
//         </div>
//       </div>
//       <div className='position-absolute top-0 end-0 p-4 mt-0'>
//         <div className='border rounded-3 bg-white p-2 text-success fw-bold'>
//           Time Left: {formatTime(timeLeft)}
//         </div>
//       </div>

     
//     </>
 
//   );
// }

// export default Quiz;




































































































