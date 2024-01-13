import * as React from 'react';
import InboxIcon from '@mui/icons-material/Inbox';
import ListIcon from '@mui/icons-material/List';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import AddTaskIcon from '@mui/icons-material/AddTask';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {useEffect, useState} from 'react';

function QueryList({nm, setQuery}){
  return(
    <div className='Query-Content'>
      <div className='Query-content-wrap'>
        <h4>QueryNo.{nm.QueryNo}</h4>
        <h4>{nm.Name}</h4>
      </div>
      <div className='Query-content-wrap'> 
        <h4 className='Query-title'>{nm.Title}</h4>
        <button className='OpenQuery-button' onClick={()=> setQuery(nm)}>
          <OpenInNewIcon/> <br/>
            Open
        </button>
      </div>
    </div>
  )
}

// export function HelDesk({ Queries }){
export function HelDesk(){
  const AssociateName = 'Sundar Pichai';

  const [Queries, SetQueries] = useState([]);
  
  const [query, setQuery] = useState({});

  // below code is for filtering all, tec and non-tec queries
  const [filterQuery, setFilterQuery] = useState('');
  // Initialize filteredQuery with all data
  const [filteredData, setFilteredData] = useState(Queries);
  // Handler for option change
  const handleQueryType = (e) => {

    const selectCatQuery = e.target.value;
    setFilterQuery(selectCatQuery);
    
    // Update filteredData based on the selected category
    if(selectCatQuery === '') {
      setFilteredData(Queries);
    }
    else{
      const newData = Queries.filter(Q => Q.Type === selectCatQuery);
      setFilteredData(newData);
    }
  };

  useEffect(() => {
    fetch("https://64a63998096b3f0fcc7f7574.mockapi.io/queries")
      .then((data) => data.json())
      .then((qry) => SetQueries(qry));
    }, [])
  
  return(
    <div className='whole-structure'>

      {/* <div className='Navigation-Bar'> */}
        {/* <div><InboxIcon/></div> Assigned */}
        {/* <div><ListIcon/></div> Unassigned */}
        {/* <div><CrisisAlertIcon/></div> Over Due */}
        {/* <div><AddTaskIcon/></div> Solved */}
      {/* </div> */}


      <div className="left">

        <form className='gap'>
          <label>Query Type:</label>
          <select value={filterQuery} onChange={handleQueryType}>
            <option style={{display: "none"}}></option>
            <option value="">All Query</option>
            <option value="Techinical">Techinical</option>
            <option value="NonTechinical">NonTechinical</option>
          </select>
        </form>

        {/* <form className='gap'>
          <label>Status of the Query:</label>
          <select>
            <option style={{display: "none"}}></option>
            <option value="New">New</option>
            <option value="Delayed">Delayed</option>
            <option value="Over_due">Over_due</option>
          </select>
        </form> */}

        <div>
          <h3 className='title-as-query'>Queries:</h3>
          <div className='Query-Box'>
            {filteredData.map((nm) => (
              <QueryList key={nm.QueryNo} nm={nm} setQuery={setQuery}/>
            ))}
          </div>
        </div>

      </div>


      <div className='center'>

        <div className='gap'>Associate Details</div>
        <div className='AssociateName-Name'>
          <h3>Associate-Name:</h3>
          <h3 className='AssociateName'>{AssociateName}</h3>
        </div>
        

        <div className='QueryDiscription'>
          <h2 className='Query-Discription-Titles'>Query Discription</h2>
          <div className='Single-Query-no-name'>
            <h2 className='QueryNo'>QueryNo.{query.QueryNo}</h2>
            <h2>{query.Name}</h2>
          </div>
          <h1 className='Single-Query-Title'>{query.Title}</h1>
          <h3 className='Single-Query-Type'>{query.Type}</h3>
          <h4 className='Single-Query-Discription'>{query.QueryDiscription}</h4>
        </div>

        <div className='QueryChating'>
          <h2 className='Query-Chat-Titles'>Chat</h2>
          <div className='Query-Chat'>
          </div>
          <input></input>
        </div>
    
      </div>


      {/* <div className="right">
        <div className='gap'>Associate Details</div>
        <div className='Co-Ordinator-Details-Box'></div>
        <div className='gap'>Recent Activities</div>
        <div className='Recent-Activities-box'></div>
      </div> */}
    </div>
    )
}

