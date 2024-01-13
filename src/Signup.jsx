import{useFormik} from "formik";
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export function Signup(){

  const navigate = useNavigate();

  const [signupSuccess, setSignupSuccess] = useState(false);
  const [Credential, SetCredential] = useState([]);

  const formValidationSchema = yup.object({       
    username: yup.string().required("Please enter your username"),                                                                            
    email: yup.string().required("Why not fill this email").min(12, "Need a bigger email"),                                          
    password: yup.string().required("Why not fill this password").min(8, "Need a bigger password").max(20, "Too much password"),     
    confirmPassword: yup.string().oneOf([yup.ref("password"), null], "password must match").required("Please confirm your password"),
  });

  const {handleSubmit, handleChange, handleBlur, values, touched, errors} = useFormik({
    initialValues: {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    },
    validationSchema: formValidationSchema,   
    // onSubmit: (values) => console.log("Login Form Values", values),
    onSubmit: (values) => handleSignUp(values),
  });

  const handleSignUp = (enteredValues) => {
    // console.log("Singup Successfull!", enteredValues);

    // Make the Api call to store the data of the registered user
    const apiEndpoint = "https://64a63998096b3f0fcc7f7574.mockapi.io/movies";
  
    // Perform the API call
    fetch(apiEndpoint, {
      method: 'POST',
      body: JSON.stringify(enteredValues),
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.json())
    .then((newCredential) => {
      // Update state with the new user details which was created and featched 
      SetCredential([...Credential, newCredential]);
  
      // Update state to indicate successful signup
      setSignupSuccess(true);

      // Here using setTimeout to delay the navigation. Delaying the navigation to show the success msg.
      setTimeout(() => {
        navigate('/QueryDashBoard')
      }, 3000);
    });
  };

  // Here using useEffect to clear the success meessage when the component unmounts
  useEffect(() => {
    return() => {
      setSignupSuccess(false);
    }
  }, []);

  return(
    <div className='LoginPage'> 
      <form className='LoginForm' onSubmit={handleSubmit}>
        <h1 className='UserLogin'>User Signup</h1>
        <input 
          name="username"
          onChange={handleChange}
          value={values.username} 
          type="text" 
          placeholder="Username"
          onBlur={handleBlur}
        />
        {/* {errors.username}  */}
        {touched.username && errors.username ? errors.username : null}
        <input 
          name="email"
          onChange={handleChange}
          value={values.email} 
          type="text" 
          placeholder="Email"
          onBlur={handleBlur}
        />
        {/* {errors.email}  */}
        {touched.email && errors.email ? errors.email : null}
        <input 
          name="password"
          onChange={handleChange}
          value={values.password} 
          type="password" 
          placeholder="Password"
          onBlur={handleBlur}
        />
        {/* {errors.password} */}
        {touched.password && errors.password ? errors.password : null}
        <input 
          name="confirmPassword"
          onChange={handleChange}
          value={values.confirmPassword} 
          type="text" 
          placeholder="Confirm Password"
          onBlur={handleBlur}
        />
        {/* {errors.password} */}
        {touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : null}

        <button type='submit'>submit</button>
        
        {signupSuccess && (<div className="SignupSuccessMsg">Signup Successful! Redirecting to dashboard...</div>)}

        <div>
          <button onClick={() => navigate('/Login')}>Already have an account</button>
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