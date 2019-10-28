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
        <NavLink to={"/home/story/chapters/" + props.currentchapter._id }>
            <tr>
                <td><div className={props.currentchapter.chapter_status}></div></td>
                <td>{" - "+ props.currentchapter.chapter_nr + "."}</td>
                <td>{props.currentchapter.chapter_name}</td>
            </tr>
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
        chapterClass:'sidebarChapterTabel show'
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



}

createVipSidebarList = (e) => {
    return this.state.vip_sidebar_charecters.map(function(currentVip, i){

        return <MapVipCharecter currentcharecter={currentVip} key={i}/>

    });
}

createChapterSidebarList = (e) => {
    return this.state.sidebar_chapters.map(function(currentChapter, i){

        return <MapChapterList currentchapter={currentChapter} key={i}/>

    });
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
    } else {
        this.setState({
            hideTodo:true,
            todoClass:"nextSidebarTodoContent hide"
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

    render(){
        return(
            <div className="sidebarStyle">

                <div className="NextOnTodoSidebarDiv">
                        <div className="sidebartitle" onClick={this.hideTodoSidebar}>
                            <p> Next Todo:(1 af 1)  </p>
                            <p className="updateSidebar" onClick={this.updatesidebarVIP}>(update)</p>
                        </div>

                        <div className={this.state.todoClass}>
                            <p> Make this work</p> 
                            <p className="nextTodoDoneSidebar">Done/Next</p>
                        </div>
                </div>

                <div className="vipCharecterDiv">

                    <div className="sidebartitle" onClick={this.hideVipSidebar}>
                        <p> VIP Charecters:</p>
                        <p className="updateSidebar" onClick={this.updatesidebarVIP}>(update)</p>
                    </div>

                    <div className={this.state.vipClass}>

                        <ul>
                            {this.createVipSidebarList()}
                        </ul>
                    </div>
                </div>

                <div>

                    <div className="sidebartitle" onClick={this.hideChapterSidebar}>
                        <p>Chapters:</p>
                        <p className="updateSidebar" onClick={this.updatesidebarChapters}>(update)</p>
                    </div>

                    <div className={this.state.chapterClass}>

                        <table>
                                    
                

                            <tbody className="tableContentSidebar" >

                               {this.createChapterSidebarList()}

                            </tbody>
                        </table>

                    </div>

                </div>

            </div>
        )
    }

}

export default Sidebar