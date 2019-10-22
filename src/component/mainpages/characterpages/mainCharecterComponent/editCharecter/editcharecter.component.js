import React, { Component } from 'react'
import axios from 'axios';

import './editcharecter.style.css'

const EditChareacter = (props) => {

function tools(){

    if(props.chosenCharecter.ch_name === "none selected" || !props.chosenCharecter.ch_name ) {


    } else {

        return(
            <div>
                <p>Tools:</p>
                    <div><p>Status:</p></div>
                    <div className="button" onClick={props.saveCharecter}><p>Save</p></div>
                    <div className="button"><p>Reset</p></div>
                    <div className="button"><p>Delete</p></div>
             </div>
        
        )

    }

}

// Real Functions

    return(
        <div className="mainEditComponentStyle">

            <div className="mainCharecterEditContent">

                <h2> {props.chosenCharecter.ch_name}</h2>

            <form>
                <label>Name:</label>
                <input type="text" placeholder='name' onChange={props.onChangeName} value={props.chosenCharecter.ch_name}/>
         
            </form>


            </div>

            <div  className="mainCharecterEditTool">
                {tools()}
            </div>


        </div>
    )


}

export default EditChareacter