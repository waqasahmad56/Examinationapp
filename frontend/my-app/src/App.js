import './App.css';
import LandingPage from './components/LandingPage';
import SignUpForm from './components/SignUpForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from './components/LoginForm';
import Quiz from './components/Quiz';
import Result from './components/Result';
import Table from './components/Table';
import Layout from './components/Layout';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function App() {
  return (
    <>
  <div className="main-containers">
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/signup"
          element={
              <SignUpForm />
          }
        />
        <Route
          path="/login"
          element={
              <LoginForm />
          }
        />
        <Route
          path="/landing"
          element={
            <Layout>
              <LandingPage />
            </Layout>
          }
        />
        <Route
          path="/quiz"
          element={
            <Layout>
              <Quiz />
            </Layout>
          }
        />
        <Route
          path="/result"
          element={
            <Layout>
              <Result />
            </Layout>
          }
        />
        <Route
          path="/table"
          element={
            <Layout>
              <Table />
            </Layout>
          }
        />
      </Routes>
    </Router>
    </div>
    </>
  );
}

export default App;












































































// import './App.css';
// import LandingPage from './components/LandingPage';
// import Nav from './components/Nav';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import SignUpForm from './components/SignUpForm';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import Footer from './components/Footer';
// import LoginForm from './components/LoginForm';
// import Quiz from './components/Quiz';
// import Result from './components/Result';
// import Table from './components/Table';


// function App() {
//   return (
//    <>
//   <div className="main-containers">
 
//   <Router>
//       <Routes>
//         <Route path="/signup" element={<><Nav /><SignUpForm /></> }/>
//         <Route path="/login" element={<><Nav/><LoginForm /></>} />
//         <Route path="/landing" element={<><Nav/><LandingPage /></>} />
//         {/* <Route path="/" element={<Navigate to="/signup" />} /> */}
//         <Route path="/quiz" element={<><Nav/><Quiz/></>} />
//         <Route path="/result" element={<><Nav/><Result/></>} />
//         <Route path="/table" element={<><Nav/><Table/></>} />
      
//       </Routes>
//     </Router>
   
//  <Footer/>
 
//  </div>
 
//    </>
//   );
// }

// export default App;
