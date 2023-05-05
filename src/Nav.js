import React, { useEffect, useState } from 'react'
import './Nav.css'

function Nav() {
    //make the navbar show when you scroll down
    const [show, handleShow] = useState(false)
    useEffect(() => {
        window.addEventListener("scroll", () => {
            (window.scrollY > 50) 
            ? handleShow(true)
            : handleShow(false);
        });
        return () => {
            window.removeEventListener("scroll", handleShow);
        };
    }, []);

    return (
        <div className={`nav ${show && "nav_black"}`}>
            <img
                className='nav_logo'
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/799px-Netflix_2015_logo.svg.png?20190206123158'
                alt='Netflix logo'
            />
            <div id='home' className='nav_category'>Home</div>
            <div id='tvShows' className='nav_category'>TV Shows</div>
            <div id='movies' className='nav_category'>Movies</div>
            
            <img
                className='nav_avatar'
                src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png?20201013161117'
                alt='Netflix avatar'
            />


        </div>
    )
}

export default Nav