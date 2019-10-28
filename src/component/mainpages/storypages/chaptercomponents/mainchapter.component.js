import React, { Component } from 'react'
import './mainchapter.style.css'
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";


// Components

import SelectOrCreatChapter from './selectorcreatechapter/selectorcreatchapger.component'

class MainChapterComponent extends Component {

    state={
        chapters: []
    }



    render(){
        return(
            <div className="mainChapterStyle">

                <p>Hej fra MainChapter</p>

                <SelectOrCreatChapter />

            </div>
        )
    }

}

export default MainChapterComponent