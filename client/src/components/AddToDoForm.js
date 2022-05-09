import React, { Component, createRef } from "react";

class AddToDoForm extends Component {

    constructor(props) {
        super(props);
        this.input_text = createRef();
    }

    // Form - onSubmit
    submitForm = e => {
 
                        e.preventDefault();

                        fetch("http://127.0.0.1:8081/addtodo", {  method: "POST",
                                                                body: JSON.stringify({task: this.input_text.current.value}),
                                                                headers: {"Content-Type": "application/json"}
                                                                }
                        );
                        
                        this.input_text.current.value = "";
    
    }


    render() {
        return (
            
            <form onSubmit={this.submitForm} autoComplete={'off'}>
                
                <label> Add a new task here : </label>
                
                <input  type="text" name="task" id = "task" ref = {this.input_text}/>
                
                <button style={{margin: '5px'}} type="submit">Add</button>
            
            </form>
        
        );
    }
}  

export default AddToDoForm;