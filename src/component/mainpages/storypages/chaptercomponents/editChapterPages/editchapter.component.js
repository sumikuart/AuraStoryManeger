import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {NavLink} from "react-router-dom";


import './editchapter.style.css';

import AddOldChareterToChapter from './addOldChareterPage/addOldCharecterToChapter.component'


class EditComponent extends Component {

    state={
        chapter:{
            chapter_name: ' ',
            chapter_nr: '',
            chapter_status: 'none'
        },
        deleteOptionMenu:'deleteoptionhide',

        addCharecterDivController: 'hideCharecterDiv',
        addCharecterDivbackdrop: 'hideCharecterBackdropDiv',
        addCharecterTypeOld: 'hideAddCharecterTypeOld',
        addCharecterTypeNew: 'hideAddCharecterTypeNew',

        exsistingCharecters: []
        
    }

    
    getChapter = (e) => {

        axios.get('http://localhost:4464/getchapter/' + this.props.match.params.id)
        .then(response => {
                this.setState({ 
                    chapter: response.data,
                })
        }).catch(function(error) {
            console.log('an Error has accurd in get from getChapter in editChapter component')
        });

        axios.get('http://localhost:4464/getNameList')
        .then(response =>{
            this.setState({
                exsistingCharecters:response.data
            })
        }).catch(function(error) {
            console.log('an Error has accurd in get from componentDidMount in todoList component')
        })

    }

    saveChapter = (e) => {
        e.preventDefault();
        console.log('save: ', this.state.chapter._id)
    
        const ch = {
            chapter_nr:this.state.chapter.chapter_nr,
            chapter_name: this.state.chapter.chapter_name,
            chapter_status: this.state.chapter.chapter_status,
            chapter_page_length:this.state.chapter.chapter_page_length
        }
    
        axios.post('http://localhost:4464/update/chapter/' + this.state.chapter._id, ch)
        .then(res => console.log(res.data))
    
    }

    deleteChapterMenuHandler = (e) => {
        if(this.state.deleteOptionMenu === "deleteoptionhide"){
            this.setState({
                deleteOptionMenu: 'deleteoptionshow'
            })
        } else {

            this.setState({
                deleteOptionMenu: 'deleteoptionhide'
            })
        }
    }

    checkChapterStatus = (e) => {
        console.log(this.state.chapter)
    }

    deleteChapter = (e) =>{
        e.preventDefault();
        

        axios.delete('http://localhost:4464/delete/chapter/'+this.props.match.params.id)
            .then( res => console.log(res.data))

            this.setState({
                chapter:{
                    chapter_name: ' ',
                    chapter_nr: '',
                    chapter_status: 'none'
                }
            })

            this.props.history.push('/home/story/chapters')
        
    }

    canceldeleteChapter = (e) =>{
        
        this.setState({
            deleteOptionMenu: 'deleteoptionhide'
        })
    }


    onChangeChapterName = (e) => {
        this.setState({
            chapter:{
                chapter_name: e.target.value,
                chapter_status: this.state.chapter_status,
                _id:this.state.chapter._id,
                chapter_nr:this.state.chapter.chapter_nr,
                chapter_page_length:this.state.chapter.chapter_page_length
            }
        })
    }

    onChangeChapterStatus = (e) =>{
        this.setState({
            chapter:{
                chapter_name:this.state.chapter.chapter_name,
                chapter_status: e.target.value,
                _id:this.state.chapter._id,
                chapter_nr:this.state.chapter.chapter_nr,
                chapter_page_length:this.state.chapter.chapter_page_length
            }
        })
    }

    onChangeChapterLength = (e) => {
        this.setState({
            chapter:{
                chapter_name:this.state.chapter.chapter_name,
                chapter_status: this.state.chapter.chapter_status,
                _id:this.state.chapter._id,
                chapter_nr:this.state.chapter.chapter_nr,
                chapter_page_length:e.target.value
            }
        })
    }


    addOldCharecter = (e) => {
            this.setState({
                addCharecterDivController: 'showCharecterDiv',
                addCharecterDivbackdrop: 'showCharecterBackdropDiv',
                addCharecterTypeOld:'showAddCharecterTypeOld',
                addCharecterTypeNew:'hideAddCharecterTypeNew'
            })

            console.log('chareters: ' + this.state.exsistingCharecters)


    }

    addNewCharecter = (e) => {
        this.setState({
            addCharecterDivController: 'showCharecterDiv',
            addCharecterDivbackdrop: 'showCharecterBackdropDiv',
            addCharecterTypeOld:'hideAddCharecterTypeOld',
            addCharecterTypeNew:'showAddCharecterTypeNew'
        })
    }

    closeAddChareterDiv = (e) => {

        this.setState({
            addCharecterDivController: 'hideCharecterDiv',
            addCharecterDivbackdrop: 'hideCharecterBackdropDiv',
            addCharecterTypeOld:'hideAddCharecterTypeOld',
            addCharecterTypeNew:'hideAddCharecterTypeNew'
        })

    }


inputAddOldCharecterChangedHandler =(e) =>{
    console.log('hej, du har valgt karateren med id: ', e)

}
addNewCharecterToAppearAndCharecterComponent= (e) => {
    e.preventDefault();
    console.log('hej')
}

    render(){
        return(
            <div className="editChapterStyle">

            <div className={this.state.addCharecterDivbackdrop}>

            </div>

                <div className={this.state.addCharecterDivController}>

                <div className="closeAddCharecterDiv" onClick={this.closeAddChareterDiv}>
                    <p>X</p>
                </div>

                <div className={this.state.addCharecterTypeOld}>
                    <p className="addCharterToChapterHeadline">Add Exsisting Charecter</p>

            <div className="ShowOldChareterList">

                <AddOldChareterToChapter oldChareterList={this.state.exsistingCharecters}  chosenChareter={this.inputAddOldCharecterChangedHandler}/>
 
            </div>

         

            <div className="completetAddCharecterFromOldButton">
                <p>Complete Add</p>
            </div>
               
                </div>

                
                <div className={this.state.addCharecterTypeNew}>
                    <p className="addCharterToChapterHeadline">Make New Charecter</p>

                    <form onSubmit={this.addNewCharecterToAppearAndCharecterComponent}>
                        <label>Charecter Name:</label>
                        <input type="text" placeholder="New Charecter Name"/>
                    </form>

<div className="createNewChareterToChapterFlexer"> 
    <div>
        <p>Create</p>
    </div>

    <div onClick={this.closeAddChareterDiv}>
        <p>Cancel</p>
    </div>

</div>
                </div>



            </div>


    <div className="editToolsChaptersDiv">


            <div className="headlineEditChapter">
                <p className="mainHeadlineEditChapter">Edit Chapter:</p>
                <p className="titleHeadlineEditChapter">{this.state.chapter.chapter_name}</p>
                <p>{"id: " + this.state.chapter._id}</p>
            </div>

            
            
            <div className="editToolsContainer"> 

            <form className="nameChapterEditForm">
            <label>Name:</label>
            <input type="text" placeholder='name' onChange={this.onChangeChapterName} value={this.state.chapter.chapter_name}/>
            </form>

<div className="editChapterFlexer">

<div className="descriptionChapterEditTools">

    <p>Description:</p>
    <textarea placeholder=" Chapter Description"></textarea>
</div>

<div className="chapterEditTools">

<p className="dataheadlineInChapterEdit">Data:</p>
<div className="editChapterFlexer">


<form className="writingStatusEditChapter">
                <label>Writing Status:</label>
                    <select value={this.state.chapter.chapter_status} onChange={this.onChangeChapterStatus}>
                        <option value="none">None</option>
                        <option value="ongoing">Ongoing</option>
                        <option value="done">Complete</option>
                    </select>

                    <div className={this.state.chapter.chapter_status}></div>

            </form>

            <form className="pageCounterEditChapter">
                <label>Chapter Length:</label>
                <input type="number" value={this.state.chapter.chapter_page_length} onChange={this.onChangeChapterLength}/>
            </form>


</div>

<div className="charetersChapterApperingMainDiv">

<p className="titleOfChareterApperinginChapter">Appering Charecters:</p>

<div className="addChareterToChapterMainDiv">

    <div  className="addCharecterButton" onClick={this.addOldCharecter}>
        <p>Add Exsisting Charecter</p>
    </div>

    <div   className="addCharecterButton" onClick={this.addNewCharecter}>
        <p>Make New Charecter</p>
    </div>
</div>

<div className="charterApperingInChapterDisplayer">

    <div className="apperingHeader">
        <p>Charecters Appering: </p>
    </div>

</div>
</div>

</div>


</div>


            </div>
    </div>

    <div  className="mainChapterEditTool">
            
            <div>
                <p>Tools:</p>
                    <div><p>Status:</p></div>
                    <div className="button" onClick={this.getChapter}><p>Get Chapter/Reset</p></div>
                    <div className="button" onClick={this.saveChapter}><p>Save</p></div>
                    <div className="button" onClick={this.deleteChapterMenuHandler}><p>Delete</p></div>
                    <div className="button" onClick={this.checkChapterStatus}><p>Check Chapter</p></div>
            </div>

            <div className={this.state.deleteOptionMenu}>
                <div className="deleteChapterColorClass">
                <p>Delete:</p>
                    <div><p>are you sure you want to delete:</p></div>
                    <div><p>{this.state.chapter.chapter_name}</p></div>
                    <div className="button deleteYesColor" onClick={this.deleteChapter}><p>Yes</p></div>
                    <div className="button deleteNoColor" onClick={this.canceldeleteChapter}><p>No</p></div>
                </div>
            </div>
     
        </div>

            </div>
        )
    }

}

export default EditComponent