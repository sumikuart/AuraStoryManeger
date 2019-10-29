import React, { Component } from 'react'
import {NavLink} from "react-router-dom";

import './selectorcreatchapger.style.css'

const ChapterListWorker = (props) => (
    <option value={props.currentchapter._id}>{props.currentchapter.chapter_nr +" - " + props.currentchapter.chapter_name}</option>
)


const SelectOrCreatChapter = (props) => {

        const makeChapterSelectionList = (e) =>{
            
            console.log('hej', props)
      
            return props.chapterdata.map(function(currentItem, i){
                return <ChapterListWorker currentchapter={currentItem} key= {i} />
            })
        }



        return(
            <div className="selectOrCreatChapterStyle">

                <div className="getChapterListDiv" onClick={props.getChapterList}>
                        <p>Get Chapter List</p>
                </div>

                <div className="selectChapterOrAddDiv">

                    <select onChange={props.onChangeSelectChapters}>
                        <option value="none">Select Chapter</option>
                        {makeChapterSelectionList()}
                    </select>

                     <p>or</p>

                    <div className="addChapterButton" onClick={props.makeNewChapter}>
                        <p>ADD Chapter</p>
                    </div>

                </div>

                <div>
                  <NavLink to={'/home/story/chapters/'+props.url_position}> Send </NavLink>
                </div>





            </div>
        )
    

}

export default SelectOrCreatChapter