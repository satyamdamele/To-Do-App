import React from 'react';
import './App.css';
import AddToDoForm from './components/AddToDoForm'
import List from './components/List'

function App() {
  
  return (
    
    <div className="App" >
      
      <h1>Welcome to the To-Do App!</h1>
      
      <AddToDoForm />
      <br />
      
      <span> (Click on the check-boxes to mark Tasks as Finished) </span>
      
      <div id='listsContainer'>
      
        <div>
          <h4>TO-DO</h4>
          <List status={"unfinished"}/>
        </div>
      
        <div>
          <h4>FINISHED</h4>
          <List status={"finished"}/>
        </div>
      
      </div>
    
    </div>
  );
}

export default App;
