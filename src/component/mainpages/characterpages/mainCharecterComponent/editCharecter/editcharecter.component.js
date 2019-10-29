import React, { Component } from 'react'
import axios from 'axios';

import './editcharecter.style.css'



class EditChareacter extends Component {

    state ={
        charecter: [],

        deleteOptionMenu: 'deleteoptionhide'
    }


 

    updateChosenCh = (e) => {
 
        axios.get('http://localhost:4464/selectedCharecter/' + this.props.match.params.id)
        .then(response => {
                this.setState({ 
                    charecter: response.data,
                })
        }).catch(function(error) {
            console.log('an Error has accurd in get from componentDidMount in todoList component')
        })

    }


    saveCharecter = (e) => {
        e.preventDefault();
        console.log('save: ', this.state.charecter._id)
    
        const ch = {
            ch_name: this.state.charecter.ch_name,
            ch_vip: this.state.charecter.ch_vip
        }
    
        axios.post('http://localhost:4464/update/' + this.state.charecter._id, ch)
        .then(res => console.log(res.data))
    
    
    }


    deleteChareterMenuHandler = (e) => {

        if(this.state.deleteOptionMenu === "deleteoptionhide"){
            this.setState({
                deleteOptionMenu: 'deleteoptionshow'
            })
        } else {

            this.setState({
                deleteOptionMenu: 'deleteoptionhide'
            })
        }
       
    }

    canceldeleteChareter = (e) =>{
        this.setState({
            deleteOptionMenu: 'deleteoptionhide'
        })
    }

    deleteChareter = (e) => {
        e.preventDefault();
        

        axios.delete('http://localhost:4464/delete/'+this.props.match.params.id)
            .then( res => console.log(res.data))

            this.setState({
                charecter:{
                    ch_id: 'none selected',
                    ch_name: 'This Chareter is no more',
                    ch_vip: false
                }
            })

            this.props.history.push('/home/characters')

    }

// onChange functions for Edit: 

onChangeName = (e) => {
    this.setState({
        charecter:{
            ch_name: e.target.value,
            ch_vip:this.state.charecter.ch_vip,
            _id: this.state.charecter._id
        }
    })
}

onChangeVip = (e) => {

    console.log(e.target.value)
    
    if(e.target.value === "normal"){
        this.setState({
            charecter:{
                ch_name: this.state.charecter.ch_name,
                ch_vip: false,
                _id: this.state.charecter._id
            }
        })
    } else {
        this.setState({
            charecter:{
                ch_name: this.state.charecter.ch_name,
                ch_vip: true,
                _id: this.state.charecter._id
            }
        })
    }
}


checkCharecterStatus = (e) => {
    console.log(this.state.charecter)
}


// Real Functions
render(){ 

    return(
        <div className="mainEditComponentStyle">

            <div className="mainCharecterEditContent">

    <h2> {this.state.charecter.ch_name}</h2>

    <form>

        <label>Name:</label>
        <input type="text" placeholder='name' onChange={this.onChangeName} value={this.state.charecter.ch_name}/>

            <form onChange={this.onChangeVip}> 

                <label>VIP Status:</label>
                <input type="radio" name="vip_status" value="normal" /> Normal 
                <input type="radio" name="vip_status" value="vip" /> VIP 

            </form>

                    
    </form>

</div>
               


        

            <div  className="mainCharecterEditTool">
            
                <div>
                    <p>Tools:</p>
                        <div><p>Status:</p></div>
                        <div className="button" onClick={this.updateChosenCh}><p>Get Charecter/Reset</p></div>
                        <div className="button" onClick={this.saveCharecter}><p>Save</p></div>
                        <div className="button" onClick={this.deleteChareterMenuHandler}><p>Delete</p></div>
                        <div className="button" onClick={this.checkCharecterStatus}><p>Check Charecter</p></div>
                </div>

                <div className={this.state.deleteOptionMenu}>
                    <div className="deleteChareterColorClass">
                    <p>Delete:</p>
                        <div><p>are you sure you want to delete:</p></div>
                        <div><p>{this.state.charecter.ch_name}</p></div>
                        <div className="button deleteYesColor" onClick={this.deleteChareter}><p>Yes</p></div>
                        <div className="button deleteNoColor" onClick={this.canceldeleteChareter}><p>No</p></div>
                    </div>
                </div>
         
            </div>
            


        </div>
    )

    }
}



export default EditChareacter