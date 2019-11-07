import React, { Component } from 'react';
import axios from 'axios';
import {NavLink} from "react-router-dom";

import './maintools.style.css'

class MainTools extends Component {

    state={
    
    }



    render(){
        return(
            <div className="toolStyle">
                                
                <div className="linkDiv">
                    <NavLink to="/home/tools/todo">Todo</NavLink>
                </div>

                <div className="linkDiv">
                    <NavLink to="/home/tools/todo">Keep in Mind</NavLink>
                </div>

                <div className="linkDiv">
                    <NavLink to="/home/tools/todo">Inspiration</NavLink>
                </div>

                <div className="linkDiv">
                    <NavLink to="/home/tools/todo">Tips And Tricks</NavLink>
                </div>

                <div className="linkDiv">
                    <NavLink to="/home/tools/todo">Links</NavLink>
                </div>

               
                <div className="linkDiv">
                    <NavLink to="/home/files"> File Maneger </NavLink>
                </div>


            </div>
        )
    }

}

export default MainTools