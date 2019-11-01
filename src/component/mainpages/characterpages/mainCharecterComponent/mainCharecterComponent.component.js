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
            ch_name: ''
        },

        charecterList:'',
        selectedCharecterValue: 'addCharecter',

        charecterarray:[],
        chselecterid: '',
        selectedCharecterFunctiourl_positionn: '',
        url_position: '',
        hideselector: true,
        hideTextShow: 'hide'
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
            selectedCharecterFunction: 'info',

            charecter:{
                ch_id: 'none selected',
                ch_name: ''
            }


        })
    }

    getnewCharecterfunction = (e) => {
        e.preventDefault();
        console.log('ny karakter')

        this.setState({
            selectedCharecterFunction: 'new',

            
        charecter:{
            ch_id: 'none selected',
            ch_name: 'New Charecter'
        }

        })
    }

    // onChangeSelect functions

    onChangeSelect = (e) => {
     this.setState({
        url_position: e.target.value
     })   
    }


    
creatNewCharecter = (e) => {
    e.preventDefault();
    
    const addch = {
        ch_name: this.state.charecter.ch_name
    }

    axios.post('http://localhost:4464/add/savech', addch)
    .then(res => console.log(res.data))

    this.setState({
            selectedCharecterFunction: '',

            charecter:{
                ch_id: 'none selected',
                ch_name: ''
            }
            
    })

}

onChangeName = (e) => {

    this.setState({

        charecter:{
            ch_name: e.target.value
        }
})
}

hideShowSelectCharecter = (e) => {

    if(this.state.hideselector){
        this.setState({
            hideselector:false,
            hideTextShow: 'show'
        })
    } else {
        this.setState({
            hideselector:true,
            hideTextShow:'hide'
        })
    }

}

    render(){
        return(
            <div className="mainCharecterComponentStyle">

                <div>
                    <SelectOrMakeCharecter onHide={this.state.hideselector} onChangeName={this.onChangeName} creatNewCharecter={this.creatNewCharecter} url_position={this.state.url_position}  onChangeSelect={this.onChangeSelect} selectedCharecterFunction={this.state.selectedCharecterFunction} getnewCharecterfunction={this.getnewCharecterfunction} ch_state={this.state.charecterarray} changeCharecterSelectValue={this.changeCharecterSelectValue} getlistfunction={this.getlistfunction}/>
                  
                    <div className="hideSelectCharecterFunctionDiv" onClick={this.hideShowSelectCharecter}>
                        <p>{this.state.hideTextShow}</p>
                    </div>

                    <Route path='/home/characters/:id' component={EditChareacter}/>

                </div>


            </div>
        )
    }

}

export default MainCharecterComponent