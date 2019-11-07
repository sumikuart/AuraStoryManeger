import React, { Component } from 'react'
import {NavLink} from "react-router-dom";

import './navigation.style.css'

class Navbar extends Component {

    state={
        storyClass: 'hidden'
    }


    handelOnClickStory = (e) => {
        console.log('hej')

        if(this.state.storyClass === 'hidden'){
            this.setState({
                storyClass: 'show'
            })
        } else {
            this.setState({
                storyClass: 'hidden'
            })
        }
    }


    render(){
        return(
            <div className="navbarstyle">


<div className="basicNav">


    <div className="spaceNavOut">

    <div className="logo">
        <NavLink to="/home"> Aura </NavLink> 
    </div>

        <nav>
            <ul className="mainNavDiv">

            <li><div className='centerStoryDropdown'> <p onClick={this.handelOnClickStory} className={this.state.storyClass}> The Story </p>
                
                <div className="storyDropdown">
                    <div className={this.state.storyClass}>
                        <ul>
                            <li><NavLink to='/home/story/chapters'>Chapters</NavLink></li>
                            <li><NavLink to='/home/story/moments'>Epic Moments</NavLink></li>
                            <li><NavLink to='/home/story/notes'>Other Notes</NavLink></li>
                        </ul>
                    </div>
                </div>

            </div>
            </li>

                <li><NavLink to="/home/characters"> Characters </NavLink></li>
              
                <li><NavLink to="/home/world"> The World </NavLink></li>
            </ul>
        </nav>
</div>

</div>

            </div>
        )
    }

}

export default Navbar