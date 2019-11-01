import React, { Component } from 'react'
import './landingPage.style.css'

class LandingComponent extends Component {

    state={
    
    }



    render(){
        return(
            <div className="landingpageStyle">

                <div className="headlineLanding">
                    <p className="main">Aura</p>
                    <p className="under">A Story Management System</p>

                </div>

<div className="nextThingDiv">
    <p className="nextHeadline">Next <span>BIG</span> thing to happen!!!:</p>
    <p className="nextHeadlinechapter">Chapter: prolog (based on epic moments component)</p>
    <p className="nextDescription">Carvilia bliver overfaldet i stof butikken, hvor hun er sikker på at hun vil dø. Men i sidste øjeblik reder Niou hende.
        Efter overfaldet, tager Niou hende med hjem til hans familie, for sikkerhed. her annocere Carvilia at hun ønsker, Niou som Center Aura.
        Denne beslutning sætter tingende i bevægelse.
    </p>
</div>
 

            </div>
        )
    }

}

export default LandingComponent