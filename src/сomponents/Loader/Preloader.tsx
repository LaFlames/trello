import React from 'react';
import preloader from "./loader.svg";


export const Preloader = () => {
    return (
        <div style={{position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}>
            <img src={preloader} />
        </div>
    )
}