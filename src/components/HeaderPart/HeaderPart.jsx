import React from 'react';
import { Link } from 'react-router-dom';
import "./HeaderPart.css"

export const HeaderPart = () => {
    return (
       <> 
            <Link to="/login">
                <button className="button-17">
                    Sign in
                </button>
            </Link>
            <Link to="/register">
                <button className="button-17">
                    Sign up
                </button>
            </Link>
            
        </>
    )
}