import React, { Component } from 'react'
import axios from 'axios';
import {NavLink} from "react-router-dom";


import './edittodo.style.css'

class EditTodo extends Component {

    state={
        current_todo: {
            todo_name: ''
        },
         
        todo_sidebar_status_holder: [],

        todo_sidebar_saveholder:[],

        sidebarconfirmer: 'normal',
        sidebarCategoryNumber: ''
        
    }



// Functional functions:

    loadeCurrentTodo = (e) => {

        axios.get('http://localhost:4464/gettodo/' + this.props.match.params.id)
        .then(response => {
                this.setState({ 
                    current_todo: response.data,
                })
        }).catch(function(error) {
            console.log('an Error has accurd in get from componentDidMount in todoList component')
        })

        axios.get('http://localhost:4464/gettodo/next')
        .then(response => {
                this.setState({ 
                    todo_sidebar_status_holder: response.data,
                })
        }).catch(function(error) {
            console.log('an Error has accurd in get from componentDidMount in todoList component')
        })


    }
  
    changeCompleteStatus = (e) =>{
        this.setState({
            sidebarconfirmer: 'normal',
            sidebarCategoryNumber: '',
            current_todo: {
                todo_name: this.state.current_todo.todo_name,
                todo_description: this.state.current_todo.todo_description,
                todo_kategori: this.state.current_todo.todo_kategori,
                todo_arkive: this.state.current_todo.todo_arkive,
                todo_Sidebar_status:this.state.current_todo.todo_Sidebar_status,
                todo_complete_status: true,
                _id:this.state.current_todo._id

            }
        })
    }

    changeArkiveStatus = (e) =>{
        this.setState({
            sidebarconfirmer: 'normal',
            sidebarCategoryNumber: '',
            current_todo: {
                todo_name: this.state.current_todo.todo_name,
                todo_description: this.state.current_todo.todo_description,
                todo_kategori: this.state.current_todo.todo_kategori,
                todo_arkive: true,
                todo_Sidebar_status:this.state.current_todo.todo_Sidebar_status,
                todo_complete_status:  this.state.current_todo.todo_complete_status,
                _id:this.state.current_todo._id

            }
        })
    }

    debugTodo = (e) => {
        console.log('current Todo: ', this.state.current_todo)
        console.log('Shown in Sidebar Todo: ', this.state.todo_sidebar_status_holder)
    }

    // Save alle ændringer
    saveTodoEdit = (e) => {
        console.log('save: ', this.state.current_todo._id)
    
        const ch = {
            todo_name: this.state.current_todo.todo_name,
            todo_description: this.state.current_todo.todo_description,
            todo_kategori: this.state.current_todo.todo_kategori,
            todo_arkive: this.state.current_todo.todo_arkive,
            todo_Sidebar_status:this.state.current_todo.todo_Sidebar_status,
            todo_complete_status:this.state.current_todo.todo_complete_status
        }
    
        axios.post('http://localhost:4464/update/todo/' + this.state.current_todo._id, ch)
        .then(res => console.log(res.data))


    }

    // ALt omkring Sidebar Visning af Todos
    sidebarPrimaryTodoHandler = (e) => {


        
        console.log(this.state.sidebarconfirmer)

        for (var i = 0; i < this.state.todo_sidebar_status_holder.length; i++){

            if(this.state.current_todo.todo_kategori === this.state.todo_sidebar_status_holder[i].todo_kategori){

                console.log('der findes allrede en sidebar show i: ' + this.state.current_todo.todo_kategori)

                this.setState({
                    sidebarconfirmer: 'makesure',
                    sidebarCategoryNumber: i
                })

            }

            if(this.state.current_todo.todo_name === this.state.todo_sidebar_status_holder[i].todo_name){
                this.setState({
                    sidebarconfirmer: 'allready'
                })
            }

            if(this.state.sidebarCategoryNumber === ''){
                this.setState({
                    current_todo: {
                        todo_name: this.state.current_todo.todo_name,
                        todo_description: this.state.current_todo.todo_description,
                        todo_kategori: this.state.current_todo.todo_kategori,
                        todo_arkive: this.state.current_todo.todo_arkive,
                        todo_Sidebar_status:'show',
                        todo_complete_status:this.state.current_todo.todo_complete_status,
                        _id:this.state.current_todo._id
        
                    }
                })
            }

            }

    }
    

    returnToSideBarStatusOption = (e) => {
        this.setState({
            sidebarconfirmer: 'normal',
            sidebarCategoryNumber: '',
            current_todo: {
                todo_name: this.state.current_todo.todo_name,
                todo_description: this.state.current_todo.todo_description,
                todo_kategori: this.state.current_todo.todo_kategori,
                todo_arkive: this.state.current_todo.todo_arkive,
                todo_Sidebar_status:'dont show',
                todo_complete_status:this.state.current_todo.todo_complete_status,
                _id:this.state.current_todo._id

            }
        })
    }

    changeSideBarStatus = (e)=>{

        console.log('lets go')

        this.setState({
            current_todo: {
                todo_name: this.state.current_todo.todo_name,
                todo_description: this.state.current_todo.todo_description,
                todo_kategori: this.state.current_todo.todo_kategori,
                todo_arkive: this.state.current_todo.todo_arkive,
                todo_Sidebar_status:'show',
                todo_complete_status:this.state.current_todo.todo_complete_status,
                _id:this.state.current_todo._id

            },   
            
            sidebarconfirmer: 'normal',
            sidebarCategoryNumber: ''

        })

        const saveObj = {
            todo_name: this.state.todo_sidebar_status_holder[this.state.sidebarCategoryNumber].todo_name,
            todo_description: this.state.todo_sidebar_status_holder[this.state.sidebarCategoryNumber].todo_description,
            todo_kategori: this.state.todo_sidebar_status_holder[this.state.sidebarCategoryNumber].todo_kategori,
            todo_arkive: this.state.todo_sidebar_status_holder[this.state.sidebarCategoryNumber].todo_arkive,
            todo_Sidebar_status:'dont show',
            todo_complete_status:this.state.todo_sidebar_status_holder[this.state.sidebarCategoryNumber].todo_complete_status,
        }
    
        axios.post('http://localhost:4464/update/todo/' + this.state.todo_sidebar_status_holder[this.state.sidebarCategoryNumber]._id, saveObj)
        .then(res => console.log(res.data))



    }


    // OnChange functions

    onTodoNameChange = (e) => {
        this.setState({
            current_todo: {
                todo_name: e.target.value,
                todo_description: this.state.current_todo.todo_description,
                todo_kategori: this.state.current_todo.todo_kategori,
                todo_arkive: this.state.current_todo.todo_arkive,
                todo_Sidebar_status:this.state.current_todo.todo_Sidebar_status,
                todo_complete_status:this.state.current_todo.todo_complete_status,
                _id:this.state.current_todo._id

            }
        })
    }

    onTodoDescriptionChange = (e) => {
        this.setState({
            current_todo: {
                todo_name: this.state.current_todo.todo_name,
                todo_description:  e.target.value,
                todo_kategori: this.state.current_todo.todo_kategori,
                todo_arkive: this.state.current_todo.todo_arkive,
                todo_Sidebar_status:this.state.current_todo.todo_Sidebar_status,
                todo_complete_status:this.state.current_todo.todo_complete_status,
                _id:this.state.current_todo._id

            }
        })
    }

    onTodoCategoryChange = (e) => {
        this.setState({
            current_todo: {
                todo_name: this.state.current_todo.todo_name,
                todo_description: this.state.current_todo.todo_description,
                todo_kategori: e.target.value,
                todo_arkive: this.state.current_todo.todo_arkive,
                todo_Sidebar_status:this.state.current_todo.todo_Sidebar_status,
                todo_complete_status:this.state.current_todo.todo_complete_status,
                _id:this.state.current_todo._id

            }
        })
    }



    // Display functions:
GetOrShowTitle = (e) => {

    if(!this.state.current_todo.todo_name == ''){
        return(
            <div className= 'maincurrentTodoHeadline'>

            <div className="smallTodoLoadButton" onClick={this.loadeCurrentTodo}>
                <p> Reload Todo</p>
            </div>

                <div className="todoShowCurrentEditDiv">
                    <p>{this.state.current_todo.todo_name}</p>
                    <p>{'Id: ' + this.state.current_todo._id}</p>
                </div>
            
            </div>
        
        )

    } else {
        return(
            <div className="todoLoadButton" onClick={this.loadeCurrentTodo}>
                <p> Load Todo</p>
            </div>
        )
    }
  
    
}

sidebarStatusChanger = (e) => {


        if (this.state.sidebarconfirmer === 'normal') {

            return(
                <div className="editTodoStatusDiv" >
        
                        <div className="nextTodoStatusDiv">
                            <p className="labelForNextTodoStatus">Sidebar Status:</p>
                            <div className="statusForNextTodoStatus">
                            <p>{this.state.current_todo.todo_Sidebar_status}</p>
                            </div>
        
                        </div>
        
                        <div className="makeNextTodoButton" onClick={this.sidebarPrimaryTodoHandler}>
                            <p>{'Make this the primary Todo for: ' + this.state.current_todo.todo_kategori}</p>
                        </div>
        
                </div>
            )
            
        } else if(this.state.sidebarconfirmer === 'makesure'){

            return(
                <div className="editTodoStatusDiv" >

                    <div className="editTodoStatusAreYouSureDiv" >     

                        <div className="editStatusInfoAreYouSureDiv">
                            <p>{'Currently primary todo in ' + this.state.current_todo.todo_kategori +':'}</p>
                            <p>*</p>
                             <p>{'"' + this.state.todo_sidebar_status_holder[this.state.sidebarCategoryNumber].todo_name + '"'}</p>
                        </div>

                        <div className="editStatusInfoConfDiv">
                            <p>Do you want to change it?:</p>
                            
                            <div onClick={this.changeSideBarStatus}>
                                <div><p>yes</p></div>
                            </div>

                            
                            <div onClick={this.returnToSideBarStatusOption}>
                                <div><p>no</p></div>
                            </div>
                        </div>
                    </div>

                </div>
            )
        } else {

            return(
                <div className="editTodoStatusDiv">
                    <p>{'This is allready the Primary Todo in ' +this.state.current_todo.todo_kategori }</p>

                    <div onClick={this.returnToSideBarStatusOption} >    
                        <p>Back</p>
                    </div>
                </div>
            )
        }


    

}

editTodoMainTools = (e) => {
    if(!this.state.current_todo.todo_name == ''){
        return(


            <div>
            <div className="editTodoMainEditDiv">

            <form>

                <div className="editTodoFlexDiv">
                    <div className="editTodoNameDiv">
                        <label>Name:</label>
                        <input type="text" value={this.state.current_todo.todo_name} placeholder='todo name' onChange={this.onTodoNameChange}/>
                    </div>

                    {this.sidebarStatusChanger()}

                    <div className="editTodoCategoryDiv">
                        <label>Change Category:</label>
                        <select value={this.state.current_todo.todo_kategori} onChange={this.onTodoCategoryChange}>
                            <option value='practical' className="red">Pratical</option>
                            <option value='story' className="green">Story</option>
                            <option value='create' className="blue">Create</option>
                        </select>
                    </div>
                </div>
       


                <div className="editTodoDescriptionDiv">
                    <label>Description:</label>
                    <textarea value={this.state.current_todo.todo_description} placeholder='todo description' onChange={this.onTodoDescriptionChange}/>
                </div>

            </form>

    

            <div className="editTodoToolBoxDiv">
                <div onClick={this.saveTodoEdit}>
                    <p>Save</p>
                </div>

                <div onClick={this.loadeCurrentTodo}>
                    <p>Reset</p>
                </div>

                <div onClick={this.changeCompleteStatus}>
                    <p>Complete</p>
                </div>

                <div onClick={this.changeArkiveStatus}>
                    <p>Move to Archived</p>
                </div>

                
                <div>
                    <p>Delete</p>
                </div>

                
                <div onClick={this.debugTodo}>
                    <p>Debug-Todo</p>
                </div>


            </div>

            </div>



            </div>
        )
    } else {
        
        return(
            <div>
                <p>Please Load a Todo</p>
            </div>
        )

    }
}

    render(){
            return(
                <div className="editTodoStyle">
    
                    <div className="backToTodoDiv">
                        <NavLink to="/home/tools/todo">Back</NavLink>
                    </div>

                    <div className="todoHeadlineDiv">
                        <p className="mainTodoHeadline">Edit Todo:</p>
                        {this.GetOrShowTitle()}
                    </div>

                   

                   {this.editTodoMainTools()}
    
               
    
                </div>
            )
        }

    }



export default EditTodo