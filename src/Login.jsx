import{useFormik} from "formik";
import * as yup from "yup"   
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";

export function Login(){

  const navigate = useNavigate();
  // The data hold by the users variable, is to verify the entered email and password credentials.
  // const users = [
  //   {
  //     email: "samone@gmail.com", password: "password123" 
  //   },
  // ]

  // Here using MockAPI to verify the credential entered at the time of login
  const [loginDetails, setLoginDetails] = useState([]);

  // This useState errorMessage hold the 'Invalid Credentials' text
  const [errorMessage, setErrorMessage] = useState('');

  // Make the Api call to receive the data from the registered user
  const apiEndpoint = "https://64a63998096b3f0fcc7f7574.mockapi.io/movies";

  const getLoginDetails = () => {  
    fetch(apiEndpoint, {
      method: "GET",
    })
    .then((data) => data.json())
    .then((LoginDetails) => setLoginDetails(LoginDetails))
  };

  useEffect(() => getLoginDetails(), []);

  // This code will helps to console all the user SignUp details, which was accured from featch
  // console.log('loginDetails', loginDetails);

  const formValidationSchema = () => yup.object({                                                                                          
    username: yup.string().required("Enter a valid username"),
    password: yup.string().required("Enter a valid password")
  });

  const handleLogin = (enteredValues) => {

    // Checking the user credential with local data stored in users variable
    // const user = users.find(
    //   (usr) => usr.email === enteredValues.email && usr.password === enteredValues.password
    // );

    // Checking the user credential with MockAPI data stored in LoginDetails useState variable
    const user = loginDetails.find(
      (usr) => usr.username === enteredValues.username && usr.password === enteredValues.password,
    );
    if(user){
      // Below setItem helps to store the data of username in locally
      localStorage.setItem('user', JSON.stringify(user.username))
      navigate('/QueryDashBoard');
    }
    else{
      setErrorMessage('Invalid Credentials');
    }
  }

  const {handleSubmit, handleChange, handleBlur, values, touched, errors} = useFormik({
    initialValues: {username: "", password: ""},
    validationSchema: formValidationSchema,   
    onSubmit: (values) => {
      // console.log("Login Form Values", values),
      handleLogin(values)
    },
  });

  return(
    <div className='LoginPage'> 
      <form className='LoginForm' onSubmit={handleSubmit}>
        <h1 className='UserLogin'>User login</h1>
        <input 
          name="username"
          onChange={handleChange}
          value={values.username} 
          type="text" 
          placeholder="User Name"
          onBlur={handleBlur}
        />
        {/* {errors.email}  */}
        {touched.username && errors.username ? <div className='loginErrorMessage'>{errors.username}</div> : null}
        <input 
          name="password"
          onChange={handleChange}
          value={values.password} 
          type="password" 
          placeholder="Password"
          onBlur={handleBlur}
        />
        {/* {errors.password} */}
        {touched.password && errors.password ? <div className='loginErrorMessage'>{errors.password}</div> : null}

        <button type='submit'>submit</button>

        {/* Display a error message if username or password is invalid */}
        {errorMessage && <div className='loginErrorMessage'>{errorMessage}</div>}

        <div>
          <button onClick={() => navigate('/')}>Don't have an account</button>
        </div>

        {/* <br/>
        Values 
        <pre> {JSON.stringify(values)} </pre>
        Error 
        <pre> {JSON.stringify(errors)} </pre>
        Touched
        <pre> {JSON.stringify(touched)} </pre> */}
      </form>
    </div>
  )
}