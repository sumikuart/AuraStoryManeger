import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import axios from 'axios';

import './mainchapter.style.css'


// Components

import SelectOrCreatChapter from './selectorcreatechapter/selectorcreatchapger.component';
import EditComponent from './editChapterPages/editchapter.component'

class MainChapterComponent extends Component {

    state={
        chapters: [],

        chapterList:' ',
        url_position:'',
        hideAndShowSelectChapter:'showChapterSelect',
        hideOrShowTekst: 'hide'
    }

getChapterList = (e) => {
    console.log('hej')
    axios.get('http://localhost:4464/getChapterList')
    .then(response => {
            this.setState({ 
                chapters: response.data,
            })

    }).catch(function(error) {
        console.log('an Error has accurd in get from componentDidMount in chapters component')
    })

    this.setState({
        chapterList: 'loaded'
    })
}

makeNewChapter = (e) => {
    console.log(this.state.chapterList)

    if(this.state.chapterList ==='loaded'){
    console.log('length: ', this.state.chapters.length)
    
    const addchapter = {
        chapter_nr: this.state.chapters.length
    }

    axios.post('http://localhost:4464/add/savechapter', addchapter)
    .then(res => console.log(res.data))


    
    this.setState({

        chapterList: '',
        url_position: this.state.chapters._id
        
            
    })

    }
}
onChangeSelectChapters = (e) => {
    this.setState({
        url_position: e.target.value
            
    })
}

hideOrShowSelectFunction = (e) => {

    if(this.state.hideAndShowSelectChapter === 'showChapterSelect'){
        this.setState({
            hideAndShowSelectChapter: 'hideChapterSelect',
            hideOrShowTekst: 'show'
                
        })

    } else {
        this.setState({
            hideAndShowSelectChapter: 'showChapterSelect',
            hideOrShowTekst: 'hide'
                
        })
    }

}

    render(){
        return(
            <div className="mainChapterStyle">
            <div className={this.state.hideAndShowSelectChapter}>
                <div className="headline"> 
                  <p>Chapters:</p>
                </div>
              

                <SelectOrCreatChapter onChangeSelectChapters={this.onChangeSelectChapters} url_position={this.state.url_position} makeNewChapter={this.makeNewChapter} getChapterList={this.getChapterList} chapterdata={this.state.chapters}/>
              
              </div>

                <div className="hideAndShowChapterSelect" onClick={this.hideOrShowSelectFunction}>
                    <p>{this.state.hideOrShowTekst}</p>
                </div>

                <Route path='/home/story/chapters/:id' component={EditComponent}/>


            </div> 
        )
    }

}

export default MainChapterComponent