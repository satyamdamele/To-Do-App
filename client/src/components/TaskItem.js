import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashCan } from '@fortawesome/free-regular-svg-icons'


function TaskItem(props) {

        const checked = props.status === "finished" ? true : false
        const lineStyle = props.status === "finished" ? "line-through" : ""
        const status_id = props.status === "finished" ? 1 : 0
        
        // Checkbox - onChange 
        function handleCheck(e) {

            e.preventDefault();

            fetch("http://127.0.0.1:8081/changestatus", { method: "PUT",
                                                          headers:{'Content-Type':'application/json'},
                                                          body: JSON.stringify({task_id: props.id, status_id: status_id})
                                                        }
            );
        }

        // TrashIcon - onClick
        function handleDelete(e) {
            
            e.preventDefault();

            var confirmDelete = window.confirm("Are you sure you want to delete?");

            if (confirmDelete) {

                fetch ( "http://127.0.0.1:8081/deletethis", { method: "PUT", 
                                                            headers:{'Content-Type':'application/json'}, 
                                                            body: JSON.stringify({task_id: props.id})      
                                                            }
                );
                
            }

        }

        // EditIcon - onClick
        function handleEdit(e) {
            
            e.preventDefault();

            var new_task = window.prompt("Edit your task: ", props.description);
            
            if (new_task != null){
                fetch("http://127.0.0.1:8081/editthis", { method: "PUT",
                                                            headers:{'Content-Type':'application/json'},
                                                            body: JSON.stringify({task_id: props.id, new_task: new_task})
                                                        }
                );
            }                                    
        }
        
        return (           
            <div style={{margin: '10px', whiteSpace:'nowrap' , border: '1px solid grey', padding: '5px'}}  key={props.id} >
                
                <input  type={'checkbox'} key={props.id} defaultChecked={checked} onChange={handleCheck}/>  
                
                <span  style={{textDecoration: lineStyle, marginRight: '10px'}} > {props.description}                  </span>
                
                <FontAwesomeIcon style={{margin: '3px', cursor:'pointer'}} icon={faEdit}     onClick = {handleEdit}/>
                
                <FontAwesomeIcon style={{margin: '3px', cursor:'pointer'}} icon={faTrashCan} onClick = {handleDelete}/>
                
            </div>  
        );

}

export default TaskItem;