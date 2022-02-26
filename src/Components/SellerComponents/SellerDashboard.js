import {useEffect} from 'react';
import Header from './Header';
import SellerHomeContent from './SellerHomeContent';

function SellerDashboard(props) {
    
    return (
        <>
            <Header />
            {!props.children && <SellerHomeContent />}
            {props.children}
        </>
    )
}

export default SellerDashboard
