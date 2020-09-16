import React from 'react'
import Label from '../images/covid-19-label.png'

const Header = () => {
    
    return(
        <div className='Header'>
            <img src={Label} style={{marginTop: "30px" }} alt="covid19Title"/>
        </div>

    );
}

export default Header;