import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'; 
import '../App.css'

const Form = () => {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');                     
    } else {
      // setIsAuthenticated(true);
    }
  }, [token, navigate]); 
  const handlesubmit=()=>{
  navigate("/quiz");
    
  }

  localStorage.setItem('testStartTime', new Date().toISOString());
  return (
    <>
    {/* {isAuthenticated && ( */}
    <div>
        <div className="formContent border rounded-3 bg-white p-5 shadow-sm">
           <p><b>TEST START FORM</b></p>
       
            <div className=" tick d-flex align-items-center ">
           
            <h5>Start the test</h5>
            </div>
            <h6>Fill in the form before starting the test.</h6>
            <p>The question have many answer you choose one of the following <br></br>
               You select only one option only one option is correct<br></br> 
               and other options are false Please don't select <br></br>
               one or more options.
            </p>
            <p>Once you start the test you are not able to stop the test</p>
            <div className='d-flex justify-content-center'>
                 
                  <a className="btn btn-primary w-10 mt-3" onClick={handlesubmit}>Start Test</a>
            </div>
            
        </div>
    </div>
  {/* )}; */}
        </>

  )
}

export default Form;