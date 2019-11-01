import React, { Component } from 'react';
import axios from 'axios';

import './editchapter.style.css';

class EditComponent extends Component {

    state={
        chapter:{
            chapter_name: ' ',
            chapter_nr: '',
            chapter_status: 'none'
        },
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

    saveChapter = (e) => {
        e.preventDefault();
        console.log('save: ', this.state.chapter._id)
    
        const ch = {
            chapter_nr:this.state.chapter.chapter_nr,
            chapter_name: this.state.chapter.chapter_name,
            chapter_status: this.state.chapter.chapter_status
        }
    
        axios.post('http://localhost:4464/update/chapter/' + this.state.chapter._id, ch)
        .then(res => console.log(res.data))
    
    }

    deleteChapterMenuHandler = (e) => {}

    checkChapterStatus = (e) => {
        console.log(this.state.chapter)
    }

    deleteChapter = (e) =>{}

    canceldeleteChapter = (e) =>{}


    onChangeChapterName = (e) => {
        this.setState({
            chapter:{
                chapter_name: e.target.value,
                chapter_status: this.state.chapter_status,
                _id:this.state.chapter._id,
                chapter_nr:this.state.chapter.chapter_nr,
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
            }
        })
    }


    render(){
        return(
            <div className="editChapterStyle">


    <div className="editToolsChaptersDiv">

            <form>
            <label>Name:</label>
            <input type="text" placeholder='name' onChange={this.onChangeChapterName} value={this.state.chapter.chapter_name}/>
            </form>


            <form>
                <label>Writing Status:</label>
                    <select value={this.state.chapter.chapter_status} onChange={this.onChangeChapterStatus}>
                        <option value="none">None</option>
                        <option value="ongoing">Ongoing</option>
                        <option value="done">Complete</option>
                    </select>

                    <div className={this.state.chapter.chapter_status}></div>

            </form>

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