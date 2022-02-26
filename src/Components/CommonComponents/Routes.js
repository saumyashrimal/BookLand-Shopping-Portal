import React from 'react';
import {Route,Switch, Redirect } from 'react-router-dom';
import UserLogin from '../UserComponents/UserLogin';
import Register from '../UserComponents/Register';
import Home from '../Home';
import SellerRegistration from '../SellerComponents/SellerRegistration';
import SellerDashboard from '../SellerComponents/SellerDashboard';
import HomeContent from '../BooksComponent/HomeContent';
import CreateBooks from '../BooksComponent/CreateBooks';
import Book from '../BooksComponent/Book';
import BookList from "../BooksComponent/BooksList"
import Cart from '../UserComponents/Cart';
import Checkout from '../UserComponents/Checkout';
import Orders from '../UserComponents/Orders';
import SellerOrders from '../SellerComponents/SellerOrders';
import SellerBooks from '../SellerComponents/SellerBooks';
import AdminDashboard from '../AdminComponents/AdminDashboard';
import ProtectedRoutes from './Layout/ProtectedRoutes';
import AddCategory from '../AdminComponents/AddCategory';
import UsersManagement from '../AdminComponents/UsersManagement';
import AllOrders from '../AdminComponents/AllOrders';
import AllBooks from '../AdminComponents/AllBooks';
import SellerHomeContent from '../SellerComponents/SellerHomeContent';

function Routes(props) {
    return (
        <Switch>
            <Route path="/home">
                <Home />
            </Route>
            <Route path="/signin">
                <UserLogin state = {props.state}/>
            </Route>
            <Route path="/register">
                <Register />
            </Route>
            <Route path="/sellersregister">
                <SellerRegistration />
            </Route>
            <Route path="/sellerdashboard">
                <SellerDashboard />
            </Route>
            <Route path="/homecontent">
                <HomeContent/>
            </Route>
            <Route path="/createbook">
                <CreateBooks/>
            </Route>
            <Route path="/currentbook">
                <Book/>
            </Route>
            <Route path="/booklist">
                <BookList />
            </Route>
            {/* <Route path="/cartItems">
                <Cart />
            </Route> */}
            <ProtectedRoutes path="/cartItems" component={Cart} />

            <Route path="/checkout">
                <Checkout />
            </Route>
            {/* <Route path="/orders">
                <Orders />
            </Route> */}
            <ProtectedRoutes path="/orders" component={Orders} />

            <Route path="/sellerorders">
                <SellerOrders />
            </Route>
            <Route path="/sellerbooks">
                <SellerBooks />
            </Route>
            <Route path="/sellerhome">
                <SellerHomeContent />
            </Route>
            <Route path="/admindashboard">
                <AdminDashboard />
            </Route>
            <Route path="/admincategory">
                <AddCategory />
            </Route>
            <Route path="/adminusermgmnt">
                <UsersManagement />
            </Route>

            <Route path="/adminorders">
                <AllOrders />
            </Route>
            <Route path="/adminbooks">
                <AllBooks />
            </Route>

            

            <Route path="/">
                <Redirect to="/home"></Redirect>
            </Route>
            
        </Switch>
    )
}

export default Routes
