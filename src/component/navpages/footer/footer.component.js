import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

import './footer.style.css'
import MainTools from '../../mainpages/writertoolspages/maintools.component'

class footer extends Component {

    state={
    
    }

 

    render(){
        return(
            <div className="footerstyle">

                <MainTools />

            <div className="credits">
                <p>Made by: Sumiku-Art</p>
            </div>


            </div>
        )
    }

}

export default footer