import React, { Component } from 'react';
import axios from 'axios';
import {NavLink} from "react-router-dom";

import './todo.style.css'

const PractialTodoListSetup = (props) => (
    

    <div className="listShower">

   

            <NavLink to={'/home/tools/todo/edit/' + props.currenttodo._id} className={props.currenttodo.todo_Sidebar_status}>{props.currenttodo.todo_name}</NavLink>
        

    </div>

)



class TodoComponent extends Component {

    state={

        // todoStates.
        todoSwitchStateCurrent: 'todoSwitch on',
        todoSwitchStateArkived: 'todoSwitch',
        todoListState: 'current',
        addTodoButten: 'addTodoButton',
        openCloseList_practical: 'Get List',
        openCloseList_story: 'Get List',
        openCloseList_create: 'Get List',

        todo_practical_list_holder: [],
        todo_story_list_holder: [],
        todo_create_list_holder: []
    
    }

    mappracticallist = (e) =>{
        return this.state.todo_practical_list_holder.map(function(currentItem, i){
            return <PractialTodoListSetup currenttodo={currentItem} key= {i} />
        })
    
    }

    mapstorylist = (e) =>{
        return this.state.todo_story_list_holder.map(function(currentItem, i){
            
        
                return <PractialTodoListSetup currenttodo={currentItem} key= {i} />
            

        })
    
    }


    mapcreatelist = (e) =>{
        return this.state.todo_create_list_holder.map(function(currentItem, i){
            return <PractialTodoListSetup currenttodo={currentItem} key= {i} />
        })
    
    }


// Knappen der vælger nuværende eller akrivede Todos:

    changeTodoSwitchCurrent = (e) =>{
      if(this.state.todoSwitchStateCurrent === 'todoSwitch'){
          this.setState({
            todoSwitchStateCurrent:'todoSwitch on',
            todoSwitchStateArkived:'todoSwitch',
            todoListState: 'current',
            addTodoButten: 'addTodoButton',
            openCloseList_practical: 'Get List',
            openCloseList_story: 'Get List',
            openCloseList_create: 'Get List',

            todo_practical_list_holder: [],
            todo_story_list_holder: [],
            todo_create_list_holder: []
          })
      }

    }
    
    changeTodoSwitchArkived = (e) =>{
        if(this.state.todoSwitchStateArkived === 'todoSwitch'){
            this.setState({
              todoSwitchStateCurrent:'todoSwitch',
              todoSwitchStateArkived:'todoSwitch on',
              todoListState: 'arkived',
              addTodoButten: 'addTodoButton hide',
              openCloseList_practical: 'Get List',
              openCloseList_story: 'Get List',
              openCloseList_create: 'Get List',

              todo_practical_list_holder: [],
              todo_story_list_holder: [],
              todo_create_list_holder: []
            })
        }
    }

    // ----------------------------------Get Lists
    getPracticalTodoList = (e) =>{

        if(this.state.openCloseList_practical  === 'Get List') {

            this.setState({
                openCloseList_practical: 'Close'
            })

            if(this.state.todoListState === "current") {

                axios.get('http://localhost:4464/gettodo/pratical')
                .then(response =>{
                    this.setState({
                        todo_practical_list_holder:response.data
                    })
        
                    console.log(this.state.todo_practical_list_holder)
                }).catch(function(error) {
                    console.log('an Error has accurd in get todoList practical component')
                })
            } else {
                axios.get('http://localhost:4464/gettodo/pratical/arkived')
                .then(response =>{
                    this.setState({
                        todo_practical_list_holder:response.data
                    })
        
                    console.log(this.state.todo_practical_list_holder)
                }).catch(function(error) {
                    console.log('an Error has accurd in get todoList practical component')
                })
    
            }
        } else {
            this.setState({
                openCloseList_practical: 'Get List',
    
                todo_practical_list_holder: []
            })
        }


     

    }



    getStoryTodoList = (e) =>{
        
        if(this.state.openCloseList_story === 'Get List') {

            this.setState({
                openCloseList_story: 'Close'
            })


            if(this.state.todoListState === "current") {
                axios.get('http://localhost:4464/gettodo/story')
                .then(response =>{
                    this.setState({
                        todo_story_list_holder:response.data
                    })
        
                    console.log(this.state.todo_story_list_holder)
                }).catch(function(error) {
                    console.log('an Error has accurd in get todoList story component')
                })
            } else {
                axios.get('http://localhost:4464/gettodo/story/arkived')
                .then(response =>{
                    this.setState({
                        todo_story_list_holder:response.data
                    })
        
                    console.log(this.state.todo_story_list_holder)
                }).catch(function(error) {
                    console.log('an Error has accurd in get todoList story component')
                })
            }
        
        } else {
            this.setState({
                openCloseList_story: 'Get List',
    
                todo_story_list_holder: []
            })
        }
        

    }

    getCreateTodoList = (e) =>{
           
                
        if(this.state.openCloseList_create === 'Get List') {

            this.setState({
                openCloseList_create: 'Close'
            })

            
        if(this.state.todoListState === "current") {
        axios.get('http://localhost:4464/gettodo/create')
        .then(response =>{
            this.setState({
                todo_create_list_holder:response.data
            })

            console.log(this.state.todo_story_list_holder)
        }).catch(function(error) {
            console.log('an Error has accurd in get todoList create component')
        })
    } else {
        axios.get('http://localhost:4464/gettodo/create/arkived')
        .then(response =>{
            this.setState({
                todo_create_list_holder:response.data
            })

            console.log(this.state.todo_story_list_holder)
        }).catch(function(error) {
            console.log('an Error has accurd in get todoList create component')
        })

    }
        } else {
            this.setState({
                openCloseList_create: 'Get List',
    
                todo_create_list_holder: []
            })
        }
    }



    render(){
        return(
            <div className="todoStyle">

            <div className="headline">
                <p>Todo:</p>
            </div>

            <div className="todoSwitchCurrentOrArkivedMainDiv">

                <div className={this.state.todoSwitchStateCurrent} onClick={this.changeTodoSwitchCurrent}>
                    Current
                </div>

                <div className={this.state.todoSwitchStateArkived} onClick={this.changeTodoSwitchArkived}>
                  Archived
                </div>

            </div>

            
            <div className="overviewCollectivDiv">

                <div className="praktiskOverviewDiv">
                    <p className="todoOverviewHeadline">Practical:</p>

                    <div className={this.state.addTodoButten}>
                     <NavLink to='/home/tools/todo/add/practical'>Add Practical Todo</NavLink>
                    </div>

                    <div className="getTodoListButtonDiv" onClick={this.getPracticalTodoList}>
                        <p>{this.state.openCloseList_practical}</p>
                    </div>

                    <div className="todoContainer"> 
                        {this.mappracticallist()}
                    </div>
                </div>

                <div className="storyOverviewDiv">
                    <p className="todoOverviewHeadline">Story:</p>
                    <div className={this.state.addTodoButten}>
                        <NavLink to='/home/tools/todo/add/story'>Add Story Todo</NavLink>
                    </div>

                    <div className="getTodoListButtonDiv" onClick={this.getStoryTodoList}>
                        <p>{this.state.openCloseList_story}</p>
                    </div>

                    <div className="todoContainer">
                    {this.mapstorylist()}
                    </div>
                </div>

                <div className="creatOverviewDiv">
                    <p className="todoOverviewHeadline">Create:</p>

                    <div className={this.state.addTodoButten}>
                        <NavLink to='/home/tools/todo/add/create'>Add Create Todo</NavLink>
                    </div>

                    <div className="getTodoListButtonDiv" onClick={this.getCreateTodoList}>
                        <p>{this.state.openCloseList_create}</p>
                    </div>
                    
                    <div className="todoContainer">
                    {this.mapcreatelist()}
                    </div>
                </div>

            </div>


            </div>
        )
    }

}

export default TodoComponent