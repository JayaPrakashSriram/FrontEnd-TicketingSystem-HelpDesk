import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {useState, useEffect} from 'react';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useNavigate } from "react-router-dom";

function QueryList({nm, setQuery}){
  return(
    <div className='Query-Content'>
      <div className='Query-content-wrap'>
        <h4>QueryNo.{nm.QueryNo}</h4>
        {/* <h4>{nm.Name}</h4> */}
        <div>
          <div className='QueryDate'>
            {/* <AccessTimeIcon/> */}
            <p>{nm.Date}</p>
          </div>
          <div className='QueryTime'>
            {/* <CalendarMonthIcon/> */}
            <p>{nm.Time}</p>
          </div>
        </div>
      </div>
      <div className='Query-content-wrap'> 
        <h4 className='Query-title'>{nm.Title}</h4>
        <button className='OpenQuery-button' onClick={()=>  setQuery(nm)}>
          <OpenInNewIcon/> <br/>
            Open
        </button>
      </div>
    </div>
  )
}


// export function QueryDashBoard({userName, Queries, SetQueries}){
export function QueryDashBoard(){
  
  const storedData = localStorage.getItem('user');
  let username;

  if(storedData){
    username = JSON.parse(storedData);
    // console.log(username);     // This code helps to console the username, which was available from localstorage
  } else {
    console.log('No data found in local storage');
  }
  
  const navigate = useNavigate();

  const [Queries, SetQueries] = useState([]);

  const getQueries = () => {  
      fetch("https://64a63998096b3f0fcc7f7574.mockapi.io/queries", {
        method: "GET",
      })
        .then((data) => data.json())
        .then((qry) => SetQueries(qry))
  };
  useEffect(() => getQueries(), []);

  // console.log(Queries);              // Through this code data from featch will be console.

  const [query, setQuery] = useState({});
  
  const initialQueryFilter = Queries.filter(Q => Q.Name === username);
  const filterQueryByName = initialQueryFilter;
  // console.log(`userNamefiltered${filterQueryByName}`)

  // below code is for filtering all, tec and non-tec queries
  const [filterQuery, setFilterQuery] = useState('');
  // Initialize filteredQuery with all data
  const [filteredData, setFilteredData] = useState(filterQueryByName);
  // Handler for option change
  const handleQueryType = (e) => {
    const selectCatQuery = e.target.value;
    setFilterQuery(selectCatQuery);
    // Update filteredData based on the selected category
    if(selectCatQuery === '') {
      setFilteredData(filterQueryByName);
    }
    else{
      const newData = filterQueryByName.filter(Q => Q.Type === selectCatQuery);
      setFilteredData(newData);
    }
  };

  return(
    <div className='DashBoard'>

      <div className='leftSideOfDashBoard'>
        <div>
          <div className='QType-Name'>
            <form className='gap'>
              <label>Query Type:</label>
              <select value={filterQuery} onChange={handleQueryType}>
              {/* <select> */}
                <option style={{display: "none"}}></option>
                <option value="">All Query</option>
                <option value="Techinical">Techinical</option>
                <option value="NonTechinical">NonTechinical</option>
              </select>
            </form>
  
            <h3 className='gap'>{username}</h3>
          </div>
  
          <h2 className='Query-As-Title'>Query</h2>
          <div className='Create-Query-Button'>
            <button onClick={() => navigate('/User')}>+ Create Query</button>
          </div>

          <div className='Query-Box'>
            {/* {filterQueryByName.map((nm) => (
              <QueryList key={nm.QueryNo} nm={nm} setQuery={setQuery}/>
            ))} */}
            {filteredData.map((nm) => (
              <QueryList key={nm.QueryNo} nm={nm} setQuery={setQuery}/>
            ))}
          </div>
        </div>  
      </div>

      <div className='rightSideOfDashBoard'>
        <div className='QueryDiscription'>
          <h2 className='Query-Discription-Titles'>Query Discription</h2>
          <div className='Single-Query-no-title'>
            <h2 className='QueryNo'>QueryNo.{query.QueryNo}</h2>
            {/* <h2>{query.Name}</h2> */}
            <h1 className='Single-Query-Title'>{query.Title}</h1>
          </div>
          <h3 className='Single-Query-Type'>{query.Type}</h3>
          <h4 className='Single-Query-Discription'>{query.QueryDiscription}</h4>
          <p className='DateTimeinQueryDiscription'>{query.Date}, {query.Time}</p>
        </div>

        <div className='QueryChating'>
          <h2 className='Query-Discription-Titles'>Chat</h2>
        </div>
      </div>
    </div>
  )
}