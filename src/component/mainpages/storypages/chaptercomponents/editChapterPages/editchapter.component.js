import React, { Component } from 'react';
import axios from 'axios';

import './editchapter.style.css';

class EditComponent extends Component {

    state={
        chapter:[],
        deleteOptionMenu:'deleteoptionhide'
    }

    
    getChapter = (e) => {
        axios.get('http://localhost:4464/getchapter/' + this.props.match.params.id)
        .then(response => {
                this.setState({ 
                    chapter: response.data,
                })
        }).catch(function(error) {
            console.log('an Error has accurd in get from getChapter in editChapter component')
        })

    }

    saveChapter = (e) => {}

    deleteChapterMenuHandler = (e) => {}

    checkChapterStatus = (e) => {
        console.log(this.state.chapter)
    }

    deleteChapter = (e) =>{}

    canceldeleteChapter = (e) =>{}

    render(){
        return(
            <div className="editChapterStyle">

    <p>Hej fra EditComponent</p>

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
                <div className="deleteChareterColorClass">
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