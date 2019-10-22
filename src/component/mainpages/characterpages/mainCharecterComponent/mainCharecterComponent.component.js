import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import axios from 'axios';

import './mainCharecterComponent.style.css'

import SelectOrMakeCharecter from './selectOrCreate/selectorcreate.component'
import EditChareacter from './editCharecter/editcharecter.component'



class MainCharecterComponent extends Component {

    state={

        charecter:{
            ch_id: 'none selected',
            ch_name: '',
        },

        charecterList:'',
        selectedCharecterValue: 'addCharecter',

        charecterarray:[],
        chselecterid: '',
        selectedCharecterFunction: ''
 
    }

// -----------------------------------------------------------------------------------------SelectOrCreat Functions:
    changeCharecterSelectValue = (e) =>{

        console.log(e.target.value)

        if(e.target.value === "none"){
            this.setState({
                charecter: {
                    ch_name: 'none selected'
                }
            });

        } else {
            axios.get('http://localhost:4464/selectedCharecter/' + e.target.value).then(response => {
                this.setState({
                    charecter:response.data
                });
    
                console.log('charecter: ', this.state.charecter)
                
            })
     
        }
        
    
    }



    getlistfunction = () => {
        axios.get('http://localhost:4464/getNameList')
        .then(response =>{
            this.setState({
                charecterarray:response.data
            })

            console.log(this.state.charecter)
        }).catch(function(error) {
            console.log('an Error has accurd in get from componentDidMount in todoList component')
        })


        this.setState({
            selectedCharecterFunction: 'info'
        })
    }

    getnewCharecterfunction = (e) => {
        e.preventDefault();
        console.log('ny karakter')

        this.setState({
            selectedCharecterFunction: 'new'
        })
    }
    
// -----------------------------------------------------------------------------------------Edit Functions:

saveCharecter = (e) => {
    e.preventDefault();
    console.log('save', this.state.charecter._id)

    const ch = {
        ch_name: this.state.charecter.ch_name
    }

    axios.post('http://localhost:4464/update/' + this.state.charecter._id, ch)
    .then(res => console.log(res.data))


}

// onChange functions for Edit: 

onChangeName = (e) => {
    console.log('save id1', this.state.charecter._id)
    console.log('save id2', this.state.charecter._id)
    
    this.setState({
        charecter:{
            ch_name: e.target.value,
            _id: this.state.charecter._id
        }
    })

    console.log('save id3', this.state.charecter._id)
}

    render(){
        return(
            <div className="mainCharecterComponentStyle">

                <div>
                    <SelectOrMakeCharecter selectedCharecterFunction={this.state.selectedCharecterFunction} getnewCharecterfunction={this.getnewCharecterfunction} ch_state={this.state.charecterarray} selectCharecterFunction={this.selectCharecterFunction} changeCharecterSelectValue={this.changeCharecterSelectValue} getlistfunction={this.getlistfunction}/>

                    <EditChareacter onChangeName={this.onChangeName} saveCharecter={this.saveCharecter} chosenCharecter={this.state.charecter} />

                </div>


            </div>
        )
    }

}

export default MainCharecterComponent