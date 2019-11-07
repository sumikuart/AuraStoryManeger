import React, { Component } from 'react';
import {NavLink} from "react-router-dom";
import axios from 'axios';

import './addOldCharecterToChapter.style.css'

const MapChareters = (props) => {

    return (
                                    <li>{props.currentChareter.ch_name}  - <p onClick={() => props.chosenOldChareter(props.currentChareter._id)} >Add</p></li>
    )
}


const AddOldChareterToChapter = (props) => {

    const mapOutOldCharecters = (e) => {

        return props.oldChareterList.map(function(item, i){
            return <MapChareters currentChareter={item} key={i} chosenOldChareter={props.chosenChareter}/> // BEMÆRK
        });
    }
    
    return(
        <div class='addOldChareterToComponentStyle'>

            <ul>
                {mapOutOldCharecters()}
            </ul>


        </div>
    )

    }



export default AddOldChareterToChapter
