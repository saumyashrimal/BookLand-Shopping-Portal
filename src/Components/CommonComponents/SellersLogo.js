import React from 'react';
import {useHistory} from 'react-router-dom';

function SellersLogo() {


    //history hook to redirect to home content whenever logo is clicked
    let history = useHistory();

    let handleLogoClick = (e) => {
        e.preventDefault();

        history.push("/sellerdashboard");

    }

    return (
        <button className="bg-transparent shadow-none pt-1 pb-1" onClick={handleLogoClick} style={{ color: "white" , borderStyle: "none" }} >
            <h4 className="d-inline">BookLand</h4>
            <p className="d-inline me-2">.in</p>
            <p className="d-inline me-2">Sellers Account</p>
            <img src="http://www.clker.com/cliparts/d/b/0/1/1207431622846796151bookstore%20book%20store%20white.svg.hi.png" alt="" width="36rem" />
        </button>
    )
}

export default SellersLogo
