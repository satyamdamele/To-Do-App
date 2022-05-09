import React from "react";
import {useEffect, useState} from 'react';
import TaskItem from "./TaskItem";

// List is a common Component for displaying list of 'To-Do' and 'Finished' Tasks
function List(props) {

    const [list, setList] = useState([]);

    // Save endpoint address in 'api_url'
    const api_url = props.status === "unfinished" ? "http://127.0.0.1:8081/getunfinishedtasks" : 
                    props.status === "finished"   ? "http://127.0.0.1:8081/getfinishedtasks"   : ""


    // Fetch list from database
    fetch(api_url)
    .then(response => response.json())
    .then(setList);

    return (   
        <div style={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap', border: '1px solid black', margin: '2px'}}>
           { list.map ( item => <TaskItem id={item.task_id} key={item.task_id} description={item.description} status={props.status}/> ) }
         </div>
       );
    
}

export default List;