import React, { Component } from 'react'
import axios from 'axios';

import './editcharecter.style.css'


class EditChareacter extends Component {

    state ={
        charecter: []
    }


 

    updateChosenCh = (e) => {
 
        axios.get('http://localhost:4464/selectedCharecter/' + this.props.match.params.id)
        .then(response => {
                this.setState({ 
                    charecter: response.data
                })
        }).catch(function(error) {
            console.log('an Error has accurd in get from componentDidMount in todoList component')

    
      
        })
    


    }


    saveCharecter = (e) => {
        e.preventDefault();
        console.log('save', this.state.charecter._id)
    
        const ch = {
            ch_name: this.state.charecter.ch_name
        }
    
        axios.post('http://localhost:4464/update/' + this.state.charecter._id, ch)
        .then(res => console.log(res.data))
    
    
    }

    deleteChareter = (e) => {
        e.preventDefault();

        console.log('destory')


             

        axios.delete('http://localhost:4464/delete/'+this.props.match.params.id)
            .then( res => console.log(res.data))

            this.setState({
                charecter:{
                    ch_id: 'none selected',
                    ch_name: 'This Chareter is no more'
                }
            })

            this.props.history.push('/home/characters')

    }

// onChange functions for Edit: 

onChangeName = (e) => {
    this.setState({
        charecter:{
            ch_name: e.target.value,
            _id: this.state.charecter._id
        }
    })
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
         
            </form>


            </div>

            <div  className="mainCharecterEditTool">
            
                    <p>Tools:</p>
                        <div><p>Status:</p></div>
                        <div className="button" onClick={this.updateChosenCh}><p>Get Charecter</p></div>
                        <div className="button" onClick={this.saveCharecter}><p>Save</p></div>
                        <div className="button"><p>Reset</p></div>
                        <div className="button" onClick={this.deleteChareter}><p>Delete</p></div>
                 
            </div>
            


        </div>
    )

    }
}



export default EditChareacter