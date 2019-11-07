import React, { Component } from 'react'
import axios from 'axios';
import {NavLink} from "react-router-dom";

import './sidebar.style.css'


const MapVipCharecter = (props) =>{
    return(
        <li><NavLink to={"/home/characters/" + props.currentcharecter._id}> {props.currentcharecter.ch_name} </NavLink></li>
    )
}



const MapChapterList =(props) => {

    return(
        <NavLink to={"/home/story/chapters/" + props.currentchapter._id } className="chapterLinkA">
        
                <div className={props.currentchapter.chapter_status}></div>

                <div>
                    <p>{" "+ props.currentchapter.chapter_nr + "." + props.currentchapter.chapter_name}</p>
                </div>
                
                <div className="pageChapterCounterSidebar">
                    <p>{"(" + props.currentchapter.chapter_page_length + ")"}</p>
                </div>
            
        </NavLink>
    )

    
}

class Sidebar extends Component {

    
    state={
        vip_sidebar_charecters:[],
        sidebar_chapters:[],

        hideTodo:true,
        hideVip:true,
        hideChapter:false,

        todoClass:'nextSidebarTodoContent hide',
        vipClass:"listingVipCharecters hide",
        chapterClass:'sidebarChapterTabel show',

        todoCategories: ["Practical", "Story", "Create"],
        todoColor:["red","green","blue"],
        todoArrayPoint: 1,
        todoSidebarContent: {
            todoSidebar_description: ["Make The Todo Function", "Skriv op til at Carvilia forlader Aristokrat kvarteret", "Uddyb Carvilias lillebror"],
            todoSidebar_Total: [1,5,2],
            todoSidebar_Done: [0,0,1],
        },


        sidebar_next_todo: [],
        current_next_todo: '',
        current_next_todo_show: '',
        current_next_todo_id:''
    }

    componentDidMount(){

        // VIP charecters
    axios.get('http://localhost:4464/vipchlist')
    .then(response => {
            this.setState({ 
                vip_sidebar_charecters: response.data,
            })
    }).catch(function(error) {
        console.log('an Error has accurd in get from componentDidMount in sidebar component')
    })


    // Chapter List
    axios.get('http://localhost:4464/getChapterList')
    .then(response => {
            this.setState({ 
                sidebar_chapters: response.data,
            })
    }).catch(function(error) {
        console.log('an Error has accurd in get from componentDidMount in sidebar component')
    })

    // Todo List


    // get Next todos
    axios.get('http://localhost:4464/gettodo/next')
    .then(response => {
            this.setState({ 
                sidebar_next_todo: response.data
            })
    }).catch(function(error) {
        console.log('an Error has accurd in get from componentDidMount in sidebar component')
    })

    console.log(this.state.sidebar_next_todo)



}

createVipSidebarList = (e) => {
    return this.state.vip_sidebar_charecters.map(function(currentVip, i){

        return <MapVipCharecter currentcharecter={currentVip} key={i}/>

    });
}

createChapterSidebarList = (e) => {


    return this.state.sidebar_chapters.map(function(currentChapter, i){

        return <MapChapterList currentchapter={currentChapter} key={i} />

    });
}


updatesidebarTodo = (e) => {
    
    axios.get('http://localhost:4464/gettodo/next')
    .then(response => {
            this.setState({ 
                sidebar_next_todo: response.data,
            })
    }).catch(function(error) {
        console.log('an Error has accurd in get from componentDidMount in sidebar component')
    })

    console.log(this.state.sidebar_next_todo)


}

updatesidebarVIP = (e) => {
    console.log('hej fra sidebar')

    axios.get('http://localhost:4464/vipchlist')
    .then(response => {
            this.setState({ 
                vip_sidebar_charecters: response.data,
            })
    }).catch(function(error) {
        console.log('an Error has accurd in get from componentDidMount in sidebar component')
    })
}

updatesidebarChapters = (e) => {
    axios.get('http://localhost:4464/getChapterList')
    .then(response => {
            this.setState({ 
                sidebar_chapters: response.data,
            })
    }).catch(function(error) {
        console.log('an Error has accurd in get from componentDidMount in sidebar component')
    })

}

hideTodoSidebar = (e) => {
    if (this.state.hideTodo) {
        this.setState({
            hideTodo:false,
            todoClass:"nextSidebarTodoContent show"
        })

        for (var i = 0; i < this.state.sidebar_next_todo.length; i++){

            if(this.state.sidebar_next_todo[i].todo_kategori === "story"){
                this.setState({
                    current_next_todo_show:this.state.sidebar_next_todo[i].todo_name,
                    current_next_todo_id:this.state.sidebar_next_todo[i]._id
                })
            }


        }

    } else {
        this.setState({
            hideTodo:true,
            todoClass:"nextSidebarTodoContent hide",
            todoArrayPoint: 1
        })
    }
}

hideVipSidebar = (e) => {
    if (this.state.hideVip) {
        this.setState({
            hideVip:false,
            vipClass:"listingVipCharecters show"
        })
    } else {
        this.setState({
            hideVip:true,
            vipClass:"listingVipCharecters hide"
        })
    }
}

hideChapterSidebar = (e) => {
    if (this.state.hideChapter) {
        this.setState({
            hideChapter:false,
            chapterClass:"sidebarChapterTabel show"
        })
    } else {
        this.setState({
            hideChapter:true,
            chapterClass:"sidebarChapterTabel hide"
        })
    }
}
todoTypeRightClick = (e) => {
    
    var arrayTake = this.state.todoArrayPoint - 1

    if(arrayTake === -1){
        arrayTake = this.state.todoCategories.length-1
    }

    this.setState({
        todoArrayPoint:arrayTake,
        current_next_todo_show:[],
        current_next_todo_id:[]

    })

    if(this.state.todoArrayPoint === 1){

       
        for (var i = 0; i < this.state.sidebar_next_todo.length; i++){

            console.log(i)



            if(this.state.sidebar_next_todo[i].todo_kategori === "practical"){

                this.setState({
                    current_next_todo_show:this.state.sidebar_next_todo[i].todo_name,
                    current_next_todo_id:this.state.sidebar_next_todo[i]._id
                })
    
            }


        }
    }

    if(this.state.todoArrayPoint === 2){


        for (var i = 0; i < this.state.sidebar_next_todo.length; i++){

            console.log(i)
 

            if(this.state.sidebar_next_todo[i].todo_kategori === "story"){
                this.setState({
                    current_next_todo_show:this.state.sidebar_next_todo[i].todo_name,
                    current_next_todo_id:this.state.sidebar_next_todo[i]._id
                })
            }


        }


    }

    if(this.state.todoArrayPoint === 0){
   

        for (var i = 0; i < this.state.sidebar_next_todo.length; i++){

            console.log(i)



            if(this.state.sidebar_next_todo[i].todo_kategori === "create"){
                this.setState({
                    current_next_todo_show:this.state.sidebar_next_todo[i].todo_name,
                    current_next_todo_id:this.state.sidebar_next_todo[i]._id
                })
            }


        }

    }
}


todoTypeLeftClick = (e) =>{
    var arrayTake = this.state.todoArrayPoint + 1

    if(arrayTake > this.state.todoCategories.length-1 ){
        arrayTake = 0
    }

    this.setState({
        todoArrayPoint:arrayTake,
        current_next_todo_show:[],
        current_next_todo_id:[]
    })

    if(this.state.todoArrayPoint === 2){
       
        for (var i = 0; i < this.state.sidebar_next_todo.length; i++){

            console.log(i)

            if(this.state.sidebar_next_todo[i].todo_kategori === "practical"){
                this.setState({
                    current_next_todo_show:this.state.sidebar_next_todo[i].todo_name,
                    current_next_todo_id:this.state.sidebar_next_todo[i]._id
                })
            }


        }
    }

    if(this.state.todoArrayPoint === 0){


        for (var i = 0; i < this.state.sidebar_next_todo.length; i++){

            console.log(i)



            if(this.state.sidebar_next_todo[i].todo_kategori === "story"){
                this.setState({
                    current_next_todo_show:this.state.sidebar_next_todo[i].todo_name,
                    current_next_todo_id:this.state.sidebar_next_todo[i]._id
                })
            }


        }


    }

    if(this.state.todoArrayPoint === 1){
   

        for (var i = 0; i < this.state.sidebar_next_todo.length; i++){

            console.log(i)


            if(this.state.sidebar_next_todo[i].todo_kategori === "create"){
                this.setState({
                    current_next_todo_show:this.state.sidebar_next_todo[i].todo_name,
                    current_next_todo_id:this.state.sidebar_next_todo[i]._id
                })
            }


        }

    }

}


    render(){
        return(
            <div className="sidebarStyle">

                <div className="NextOnTodoSidebarDiv">
     
                            <div className="sidebartitle" >
                                <p onClick={this.hideTodoSidebar}> Next Todo </p>
                                <p className="updateSidebar" onClick={this.updatesidebarTodo}>(update)</p>
                            </div>

                            <div className={this.state.todoClass}>

                                <div className="todoSidebarTypeFunctionDiv">
                                <div className="rightbutton" onClick={this.todoTypeRightClick}> &lt;</div>

                                <div className="selectTypeTodo">
                                    <div className={this.state.todoColor[this.state.todoArrayPoint]}> 
                                    <p>{this.state.todoCategories[this.state.todoArrayPoint]} </p>
                                    </div>
                                </div>
                                
                                <div className="leftbutton" onClick={this.todoTypeLeftClick}>&gt;</div>
                                </div>
                            
                                <div className="sidebarTodoDescriptionDiv">
                                  <NavLink to={'/home/tools/todo/edit/'+ this.state.current_next_todo_id}>{this.state.current_next_todo_show} </NavLink> 
                                </div>
                            


                      
                            </div>
                    
                </div>

                <div className="vipCharecterDiv">

                    <div className="sidebartitle">
                        <p onClick={this.hideVipSidebar}> VIP Charecters:</p>
                        <p className="updateSidebar" onClick={this.updatesidebarVIP}>(update)</p>
                    </div>

                    <div className={this.state.vipClass}>

                        <ul>
                            {this.createVipSidebarList()}
                        </ul>
                    </div>
                </div>

                <div>

                    <div className="sidebartitle">
                        <p onClick={this.hideChapterSidebar}>Chapters:</p>
                        <p className="updateSidebar" onClick={this.updatesidebarChapters}>(update)</p>
                    </div>

                    <div className={this.state.chapterClass}>


                    <div className='sidebarChapterTabel'>
                        {this.createChapterSidebarList()}   
                    </div>



                    </div>

                </div>

            </div>
        )
    }

}

export default Sidebar