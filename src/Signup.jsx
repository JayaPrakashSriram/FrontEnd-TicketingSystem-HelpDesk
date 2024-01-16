import{useFormik} from "formik";
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export function Signup(){

  const navigate = useNavigate();

  const [signupSuccess, setSignupSuccess] = useState(false);
  const [Credential, SetCredential] = useState([]);

  // This useState errorMessage hold the 'Invalid Credentials' text
  const [errorMessage, setErrorMessage] = useState();

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

  // const handleSignUp = async (enteredValues) => {
  //   // console.log("Singup Successfull!", enteredValues);

  //   // Make the Api call to Check or store the data of the registered user
  //   const apiEndpoint = "https://64a63998096b3f0fcc7f7574.mockapi.io/movies";

  // //   const userDetails = () => {  
  // //     fetch(apiEndpoint)
  // //       .then((data) => data.json());
  // //   };

  //   const userDetails =
  //     await fetch(apiEndpoint)
  //       .then((data) => data.json());

  //   const user = userDetails.find(
  //     (usr) => usr.username === enteredValues.username || usr.email === enteredValues.email,
  //   );
  
  //   if(user){
  //     setErrorMessage('Credentials taken, please try something else');
  //     console.log(errorMessage);
  //   }
  //   else{
  //     // Perform the API call
  //     fetch(apiEndpoint, {
  //       method: 'POST',
  //       body: JSON.stringify(enteredValues),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     })

  //   //  .then((response) => response.json())
  //   //  .then((newCredential) => {
  //   //    // Update state with the new user details which was created and featched 
  //   //    SetCredential([...Credential, newCredential]);
  
  //     const newCredential = await response.json();
  //     SetCredential([...userDetails, newCredential]);
  
  //     // Update state to indicate successful signup
  //     setSignupSuccess(true);
  
  //     // Here using setTimeout to delay the navigation. Delaying the navigation to show the success msg.
  //     setTimeout(() => {
  //       navigate('/QueryDashBoard')
  //     }, 3000);
  //   };
  // }
  
  
  const handleSignUp = async (enteredValues) => {
    try {
      const apiEndpoint = "https://64a63998096b3f0fcc7f7574.mockapi.io/movies";
      const userDetails = await fetch(apiEndpoint).then((response) => response.json());

      const user = userDetails.find(
        (usr) => usr.username === enteredValues.username || usr.email === enteredValues.email
      );

      if (user) {
        setErrorMessage('Credentials taken, please try alternative username or password');
        console.log('Credentials taken, please try alternative username or password');
      } else {
        const response = await fetch(apiEndpoint, {
          method: 'POST',
          body: JSON.stringify(enteredValues),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const newCredential = await response.json();
        SetCredential([...userDetails, newCredential]);

        setSignupSuccess(true);

        navigate('/QueryDashBoard');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      // Handle errors, maybe set an error state
    }
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
        
        { setSignupSuccess === true 
            ? signupSuccess && (<div className="SignupSuccessMsg">Signup Successful! Redirecting to dashboard...</div>) 
            : errorMessage && (<div className="SignupFailedMsg">Credentials taken, please try something else</div>)}

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