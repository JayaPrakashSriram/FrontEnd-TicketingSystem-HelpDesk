import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

// export function User({userName, Queries, SetQueries}) {
export function User({userName}) {
  const navigate = useNavigate();
    
  const [Queries, SetQueries] = useState([]);

  // Getting the last QueryNo from the array of object
  // const lastQuery = Queries[Queries.length-1];
  // const lastQueryNo = (+lastQuery.QueryNo) + 1;

  // // Getting the current time in ISO formate using the native Data object
  // const getCurrentTimestamp = () => {
  // //   return new Data.toISOString();           // Error Data is not define
  //   const DateTime = new Data();                // Error Data is not define
  //   return DateTime.toISOString();
  // }

  // // Getting the current Date and Time in ISO formate using moment.js
  // const getCurrentTimestamp = () => {
  //   return moment().format('YYYY-MM-DD hh:mm:ss');
  // }

  // Getting the current Date and Time seperately in ISO formate using moment.js
  const DateandTime = moment().format('DD-MM-YYYY hh:mm:ss');

  const Date = moment(DateandTime).format('DD-MM-YYYY');
  const Time = moment(DateandTime).format('hh:mm:ss');


  // State to store input values
  // const [currentNumber, setCurrentNumber] = useState(lastQueryNo);
  const [formData, setFormData] = useState({
    Name: userName,
    Type: '',
    Title: '',
    QueryDiscription: '',
    // QueryNo: currentNumber,
    // timeStamp: getCurrentTimestamp(),          // timeStamp get from moment library
    Date: Date,
    Time: Time,
  });

  // Handler for input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handler for form submission
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log('Submitted data:', formData);
  //   SetQueries([...Queries, formData]);
  //   navigate('/');
  //   // perform further actions can be done here, such as sending data to a server
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Adding the current timestamp to the formData before making the POST request
    // const updatedFormData = {
    //   ...formData,
    //   timeStamp: getCurrentTimestamp(),
    // };

    // formData is the object containing the form data
    const apiEndpoint = "https://64a63998096b3f0fcc7f7574.mockapi.io/queries";
  
    // Perform the API call
    fetch(apiEndpoint, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.json())
    .then((newQuery) => {
      // Update state with the new query received from the API
      SetQueries([...Queries, newQuery]);
  
      // Clear the form fields
      setFormData({
        Type: '',
        Title: '',
        QueryDiscription: '',
      });
  
      // Navigate to another page if needed
      navigate('/QueryDashBoard');
    })
    .catch((error) => {
      console.error('Error submitting data:', error);
      // Handle errors here if necessary
    });
  };

  return (
    <div className='wholeStru'>
      <div className='UserInterface'>
        <h1>User: {userName}</h1><br />

        <button className='MyQueryButton' onClick={() => navigate('/QueryDashBoard')}>My Queries</button>
          <br/>
        <button className='MyQueryButton' onClick={() => navigate('/User2')}>To User2</button>
        

        <h2 style={{ paddingLeft: "30px" }}>Create Query</h2>
        <div className='form'>
          <form onSubmit={handleSubmit}>
            <label> Type: </label>
            <select name="Type" value={formData.Type} onChange={handleInputChange}>
              <option style={{display: "none"}}></option>
              <option value="Techinical">Techinical</option>
              <option value="NonTechinical">NonTechinical</option>
            </select>
            
            <label> Name: </label>
            <input type='name' name="name" value={userName} readOnly />            

            <label> Title: </label>
            <input type="text" name="Title" value={formData.Title} onChange={handleInputChange} />

            <label> Discription: </label>
            <textarea type="text" className="Discription" name="QueryDiscription" value={formData.QueryDiscription} onChange={handleInputChange} />

            {/* <label>Query Number:</label>
            <input type='text' name="QueryNo" value={formData.QueryNo} readOnly /> */}

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

