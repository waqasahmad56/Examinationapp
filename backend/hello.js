
import quizRouter from './routes/quiz.js'
import userRouter from './routes/user.js'
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import connectDB from './database/db.js';
import authRouter from './routes/auth.js';
import quizRoute from './routes/quizRoute.js';
import { verifyToken } from './middleware/auth.js'
import Result from './models/Result.js';

dotenv.config();
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;


app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
 
app.get('/exam/getResult', verifyToken,async (req, res) => {
  console.log("user id",req.token.id)
  const userId = req.token.id;
  try {
    // const resultData = await Result.findOne({ user:userId });                       
    const resultData = await Result.find({ user: userId }).sort({ testEndTime: -1 });  
      console.log("result my",resultData);
    if (!resultData) {
      return res.status(404).json({ message: 'No result data found' });
    }
    res.json(resultData);
  } catch (error) {
    console.error("Server er ror:", error);
    res.status(500).json({ message: 'Server error' });
  }
});


const start = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

app.use('/exam/auth', authRouter);
app.use('/', quizRouter);
app.use('/user/', userRouter);
app.use('/exam/',quizRoute)



start();




















// const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const User = require('./models/User'); 
// const Quiz = require('./models/Quiz');
// const Question = require('./models/questions');
// const UserAnswer = require('./models/UserAnswer');
// const cors = require('cors');
// const bcrypt=require("bcrypt");

// const app = express();
// const port = 3000;
// app.use(bodyParser.json());
// app.use(cors());


// mongoose.connect('mongodb://localhost:27017/mydatabase',
//     // { useNewUrlParser: true, useUnifiedTopology: true }
// );
// mongoose.connection.on('connected', ()=>{
//     console.log("Connection with moongose is ok");
// })
// mongoose.connection.on('error', ()=>{
//     console.log("Connection not ok");
// });

// app.use(express.json());

// const saltRounds = 10;

// app.post('/signup', async (req, res) => {
//   const { username, email, password } = req.body;

//   if (!username || !email || !password) {
//     return res.status(400).json({ message: 'All fields are required' });
//   }

//   try {
//     console.log('Received data:', { username, email, password }); 

//     const hashedPassword = await bcrypt.hash(password, saltRounds);
//     console.log('Hashed Password:', hashedPassword); 
    
//     const newUser = new User({ username, email, password: hashedPassword });
//     await newUser.save();

//     res.status(201).json({ message: 'User created successfully' });
//   } catch (error) {
//     console.error('Error creating user:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: 'Email and password are required' });
//   }

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     res.status(200).json({ message: 'Login successful', user });
//   } catch (error) {
//     console.error('Error during login:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });
// app.loginUser("/user",async(req,res))
// {
//   const {userId} = req.body;
//   const {Firstname,Lastname} = req.body;

//   console.log(userId, Firstname , Lastname);
//   try{
//       const user = await User.findById(userId);
//       if(!user){
//           return res.status(404).json({message:"User not found"});
//       }
//       if(Firstname!== undefined) user.Firstname = Firstname;
//       if(Lastname !== undefined) user.Lastname = Lastname;

//       const loginUser = await user.save();
//       res.status(200).json(loginUser);

//   }
//   catch(err){
//       res.status(500).json({message:err.message})
//   }
// }

// app.get('/quizzes', async (req, res) => {
//   try {
  
//     const quizzes = await Quiz.find();
//     res.json(quizzes);
//   } catch (error) {
    
//     console.error('Error fetching quizzes:', error);
//     res.status(500).json({ message: 'Server error', error });
//   }
// });


// app.get('/quiz/:quizId', async (req, res) => {
//   const quizId = req.params.quizId;

//   try {
//     const questions = await Question.find({ quizId });
//     res.json(questions);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });
// app.post('/submit-answers', async (req, res) => {
//   const { userId, quizId, answers } = req.body;

//   try {
    
//     if (!userId || !quizId || !answers || !Array.isArray(answers)) {
//       return res.status(400).json({ message: 'Invalid input' });
//     }

    
//     const userAnswer = new UserAnswer({
//       userId,
//       quizId,
//       answers
//     });
//     await userAnswer.save();

    
//     const questions = await Question.find({ quizId }).exec();
    
    
//     const correctAnswers = questions.reduce((acc, question) => {
//       acc[question._id.toString()] = question.correctOption;
//       return acc;
//     }, {});

//     let correctCount = 0;
//     const results = answers.map(answer => {
//       const correctAnswer = correctAnswers[answer.questionId];
//       const correct = correctAnswer && correctAnswer === answer.answer;
//       if (correct) correctCount++;
//       return {
//         questionId: answer.questionId,
//         correct
//       };
//     });

//     res.json({
//       message: 'Answers submitted successfully',
//       results,
//       correctCount
//     });
//   } catch (error) {
//     console.error('Error during answer submission:', error);
//     res.status(500).json({ message: 'Server error', error });
//   }
// });

// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });


// app.post('/items', async (req, res) => {
//   try {
//     const newItem = new item(req.body);
//     await newItem.save();
//     res.status(201).send(newItem);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

// app.get('/getitems', async (req, res) => {
//   try {
//     const newitems = await item.find();
//     res.status(200).json(newitems);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// app.get('/getitems/:id', async (req, res) => {
//   try {
//     const newItem = await item.findById(req.params.id);
//     if (!newItem) {
//       return res.status(404).send();
//     }
//     res.status(200).json(newItem);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// app.patch('/updateitems/:id', async (req, res) =>  {
//   try {
//     const Updateitem = await item.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
//     if (!Updateitem) {
//       return res.status(404).send();
//     }
//     res.status(200).json(Updateitem);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

// app.delete('/delete/:id', async (req, res) => {
//   try {
//     const delitem = await item.findByIdAndDelete(req.params.id);
//     if (!delitem) {
//       return res.status(404).send();
//     }
//     res.status(200).json(delitem);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });
























































// import React, { useEffect, useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useNavigate } from 'react-router-dom';
// import '../App.css';

// const Quiz = () => {
//   const [qu, setQu] = useState([]);
//   const [count, setCount] = useState(0);
//   const [isLoading, setIsLoading] = useState(true);
//   const [checkAnswer, setCheckAnswer] = useState(0);
//   const [corectAnswer, setCorectAnswer] = useState(null);
//   const [selectedIndex, setSelectedIndex] = useState(null);
//   const [timeLeft, setTimeLeft] = useState(3600); 
//   const navigate = useNavigate();
  
//   useEffect(() => {
//     async function getValue() {
//       let token = localStorage.getItem("token");
//       console.log("token", token);
//       try {
//         const response = await fetch('http://localhost:3000/quiz', {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           }
//         });
//         if (!response.ok) {
//           console.log('Network response was not ok');
//         }
//         const data = await response.json();
//         console.log("data", data);
//         const questionData = await data.flatMap(quiz => quiz.questions);
//         setQu(questionData);
//         setIsLoading(false);
//       } catch (err) {
//         console.log("error in front end");
//       }
//     }
//     getValue();
//   }, []);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeLeft(prevTime => {
//         if (prevTime <= 1) {
//           clearInterval(timer);
//           sendResults();
//           navigate("/result");
//           return 0;
//         }
//         return prevTime - 1;
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [navigate]);

//   if (isLoading) {
//     return <h1>Loading......</h1>;
//   }

//   // const currentQuestion = qu[count].questionText;
//   const currentQuestion = qu.length > 0 && qu[count] ? qu[count].questionText : 'No Question Available';
//   const currentOptions = qu.length > 0 && qu[count] ? qu[count].options : [];
  
//   // console.log("options", currentOptions.options);

//   const handleCheckboxChange = (isCorrect, index) => {
//     setSelectedIndex(prevIndex => (prevIndex === index ? null : index));
//     setCorectAnswer(isCorrect);
//   };

//   const formSubmit = () => {
  
//     if (count === qu.length - 1) {
//       sendResults();
//       navigate("/result");
//     } else {
//       setCount(prev => prev + 1);
//       setSelectedIndex(null);
//       if (corectAnswer) {
//         setCheckAnswer(prev => prev + 1);
//       }
//     }
//   };
//   const sendResults = async () => {
//     const token = localStorage.getItem("token");
//     const testStartTime = new Date(localStorage.getItem('testStartTime'));
//     const testEndTime = new Date();
//     const totalTime = Math.floor((testEndTime - testStartTime) / 1000); 

//     const resultData = {
//       totalQuestions: qu.length,
//       correctAnswers: checkAnswer,
//       totalTime, 
//       testStartTime: testStartTime.toISOString(),
//       testEndTime: testEndTime.toISOString()
//     };
//     console.log(qu.length-1)
    
//     console.log(resultData.totalQuestions);

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

//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins} mints:${secs < 10 ? '0' : ''}${secs} sec`;
//   };

//   return (
//     <>
//       <div className='position-relative'>
//         <div className='border mt-5 shadow bg-white box rounded-3'>
//           <div className='mx-4 mt-4'>
//             <b>Question {count + 1}/{qu.length}</b>
//             <p className='mt-4'>{currentQuestion}</p>
//           </div>
//           <div className='d-flex flex-column gap-4 mt-4'>
//           {currentOptions.length > 0 && currentOptions.map((item, index) => (
//   <div key={index} className='d-flex gap-2 mx-4'>
//     <input 
//       type="checkbox" 
//       checked={selectedIndex === index} 
//       onChange={() => handleCheckboxChange(item.isCorrect, index)} 
//       className='checkBox' 
//     />
//     <label>{item.optionText}</label>
//   </div>
// ))}

//           </div>
//           <div className='mx-4 mt-4'>
        
//             <button type="button" onClick={formSubmit} className="btn btn-outline-success">Submit Answer</button> 
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




















