import React, { Component } from 'react';
import {NavLink} from "react-router-dom";
import axios from 'axios';

import './selectorcreate.style.css'

// const CharecterListWorker = props => (
//     <option value={props.currentcharecter._id}>{props.currentcharecter.ch_name}</option>
// )



const CharecterListWorker = (props) => (
    <option value={props.currentcharecter._id}>{props.currentcharecter.ch_name}</option>
)



const SelectOrMakeCharecter = (props) => {

        const makeCharecterSelectionList = (e) =>{
            console.log('hej', props.ch_state)
      
                return props.ch_state.map(function(currentItem, i){
                    return <CharecterListWorker currentcharecter={currentItem} key= {i} />
                })
            
        }

        function openSelect(){
            
            return(
                <div className="flexChoise">
                    <div className="getCompleteChList" onClick={props.getlistfunction}>
                    <p>Get list</p> 
                    </div>
                    <div className="getCompleteChList" onClick={props.getnewCharecterfunction}>
                    <p>New Charecter</p> 
                    </div>
                        
                </div>
         
            )
            
        }

        function ch_Info(){
            console.log(props.selectedCharecterFunction)
            if(props.selectedCharecterFunction=== "info") {
                return(
                    <div>
                    <div className="formDiv">
                        <div className="selectCharecterDiv">
                            <form onSubmit={props.selectCharecterFunction}>
                                <label>Select Charecter:</label>
                                <select onChange={props.changeCharecterSelectValue}>
                                    <option value="none">Select Charecter:</option>
                                    {makeCharecterSelectionList()}
                                </select>
                                <p className="inline"> or</p>
                                <input type="text" placeholder="search" className="searchbar" />
    
                        
                            </form>
    
                    
                        </div>
                        </div>
                    </div>
                   
                )

            }
            if(props.selectedCharecterFunction=== "new"){
                return(
                    <div>
                        <p>Comming Soon</p>
                    </div>
                )
            }
        }

        return(
            <div className="SelectOrMakeCharecterStyle">

                <div className="headline">
                    <p>Charecters:</p>
                </div>

                {openSelect()}

                <div className="flexerSelect">
                {ch_Info()}
            </div>
            </div>
        )
    }

// }

export default SelectOrMakeCharecter
