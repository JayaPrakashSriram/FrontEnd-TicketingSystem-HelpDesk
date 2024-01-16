import './App.css'
import { Signup } from './Signup'
import { Login } from './Login'
import { User } from './User'
import { ForgotPassword } from './ForgotPassword'
import { QueryDashBoard } from './QueryDashboard'
import { HelDesk } from './HelDesk'
// import  UserChat from './UserChat'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function App() {
  const navigate = useNavigate();

  // const [Queries, SetQueries] = useState(
  //   [
  //     {
  //       "QueryNo" : "1",
  //       "Name" : "SamOne",
  //       "Title": "Low Internet Speed",
  //       "Type" : "Techinical",
  //       "QueryDiscription": "Work as been keep on intrupting, fix internet speed ASAP."
  //     },
  //     {
  //       "QueryNo" : "2",
  //       "Name" : "SamTwo",
  //       "Title": "Need to change the working Shift",
  //       "Type" : "NonTechinical",
  //       "QueryDiscription": "Due to some helath related issues i want to change my shift from night to day shift."
  //     },
  //     {
  //       "QueryNo" : "3",
  //       "Name" : "SamThree",
  //       "Title": "Battery Problem",
  //       "Type" : "Techinical",
  //       "QueryDiscription": "Laptop is facing power problem. It as to be stay on charging while it as been in use"
  //     },
  //     {
  //       "QueryNo" : "4",
  //       "Name" : "SamOne",
  //       "Title": "Delay pickup by Cab",
  //       "Type" : "NonTechinical",
  //       "QueryDiscription": "Got problem with cab pickup, can't able to reach office on time."
  //     },
  //     {
  //       "QueryNo" : "5",
  //       "Name" : "SamTwo",
  //       "Title": "OS need to be Installed",
  //       "Type" : "Techinical",
  //       "QueryDiscription": "The OS that as been using will expire tomorrow, ReInstall the OS with any delay."
  //     },
  //     {
  //       "QueryNo" : "6",
  //       "Name" : "SamThree",
  //       "Title": "Team Collaboration ",
  //       "Type" : "NonTechinical",
  //       "QueryDiscription": "As we started with a new project with already having a existing project at work, the man power seems to be limited to handle both the project. So assist more memebers to my team or provide team for collaboration or seperating the projecct with each time. Otherwise projet can be came to production in time."
  //     },
  //     {
  //       "QueryNo" : "7",
  //       "Name" : "SamOne",
  //       "Title": "Computer Malfunction",
  //       "Type" : "Techinical",
  //       "QueryDiscription": "From day before yesterday facing issues while working with computer, the malfunction issue is significant and affects work flow. The prblem getting lot worst on today. Fix it as soon as possible"
  //     },
  //     {
  //       "QueryNo" : "8",
  //       "Name" : "SamTwo",
  //       "Title": "Changing the cab pickup address",
  //       "Type" : "NonTechinical",
  //       "QueryDiscription": "I am moving to new rent house so i want to change my cab location to my new place."
  //     },
  //     {
  //       "QueryNo" : "9",
  //       "Name" : "SamThree",
  //       "Title": "System is Slow",
  //       "Type" : "Techinical",
  //       "QueryDiscription": "Kindly sort out the issue in my system of provide me good one. Which will helps to do work in time."
  //     },
  //   ]
  // );


  return (
    <div>
      <Routes>
        <Route path='/' element={<Signup/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/User' element={<User/>}/>
        <Route path='/ForgotPassword' element={<ForgotPassword/>}/>
        <Route path='/QueryDashBoard' element={<QueryDashBoard/>}/>
        <Route path="/HelpDesk" element={<HelDesk/>}/>

        <Route path="*" element={<NotFound/>}/>
        
        {/* <Route path="/UserChat" element={<UserChat/>}/> */}
      </Routes>
    </div>
  )
}

function NotFound(){
  return (
    <div ClassName='not-found'>
      <img
         src='https://cdn.dribbble.com/users/1175431/screenshots/6188233/404-error-dribbble-800x600.gif'
         alt='Error 404: Not Found'
      />
    </div>
  )
}

export default App

