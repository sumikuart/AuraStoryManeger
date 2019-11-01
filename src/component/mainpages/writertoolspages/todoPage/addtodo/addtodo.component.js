import React, { Component } from 'react'
import axios from 'axios';
import {NavLink} from "react-router-dom";


import './addtodo.style.css'

class AddTodoComponent extends Component {

    state={
    
 

        todo_name:'',
        todo_description: '',
        todo_Kategori: this.props.match.params.kategori
    }

 
    onChangeAddTodoName =(e) =>{
        this.setState({
            todo_name: e.target.value
        })
    }
     

     
    onChangeAddTodoDescription =(e) =>{
        this.setState({
            todo_description: e.target.value
        })
    }

    makeTodo = (e) => {
        e.preventDefault();

        console.log('name:', this.state.todo_name)
        console.log('description:', this.state.todo_description)
        console.log('kategori: ', this.state.todo_Kategori)
    
        const addtodo = {
            todo_name: this.state.todo_name,
            todo_description:this.state.todo_description,
            todo_kategori:this.state.todo_Kategori
        }
    
        axios.post('http://localhost:4464/add/todo', addtodo)
        .then(res => console.log(res.data))
    
        this.setState({
            
            todo_name:'',
            todo_description: '',
            todo_Kategori: this.props.match.params.kategori
                
        })

    }
    
    render(){ 
        return(
            <div className="addTodoStyle">

                <div className="todoBackButton">
                    <NavLink to='/home/tools/todo/'> Back</NavLink>
                </div>

                <div className="headline">
                    <p>{'Add a ' + this.state.todo_Kategori + ' todo'}</p>
                </div>

                <div className="infoGathereTodoDiv">

                    <form>
                        <label>Todo Name:</label>
                        <input type="text" placeholder="todo name" value={this.state.todo_name} onChange={this.onChangeAddTodoName}/>

                        <label> Description:</label>
                        <textarea rows="4" cols="50" placeholder="describe todo" value={this.state.todo_description} onChange={this.onChangeAddTodoDescription}/>


                    </form>
                
                    <div className="addTodoButton">
                     <p onClick={this.makeTodo}>Add Todo</p>
                    </div>
                    
                   

                </div>

            </div>
        )
    }

}

export default AddTodoComponent