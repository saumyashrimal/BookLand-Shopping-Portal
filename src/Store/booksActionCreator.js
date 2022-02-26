import axios from "../helpers/axios";


const createBook = (bookObj) => {
    return(dispatch)=>{
        axios.post("/books/createbook",bookObj)
        .then(res => {
            console.log(res.data.message);
            dispatch(
                {
                    type:"createBook",
                    payload:res.data.message
                }
            )
        })
        .catch(err => console.log(err.message));
        
    }
}



//get cart data 
const getCartData = (email) => {
    return(dispatch) => {
        axios.get(`/user/getcartbooks`,{ params: { email:email } })
        .then(res => {
            console.log(res.data.message);
            dispatch(
                {

                    type:"getCartData",
                    payload:res.data.message
                }
            )
        })
        .catch(err => console.log(err.message));
    
    }
}

//get porduct by category
const getBooksByCategory = (category) => {
    return(dispatch) => {
        axios.get(`/books/getbooksbycategory`,{ params: { category:category } })
        .then(res => {
            dispatch(
                {

                    type:"getBooksByCategory",
                    payload:res.data.message
                }
            )
        })
        .catch(err => console.log(err.message));
       
    }
}

//get product by field name that is bookname , bookauthor and bookcategory
const getBooksOnSearch = (searchText) => {
    console.log(searchText)
    return(dispatch) => {
        axios.get(`/books/getbooksonsearch`,{ params: { searchText:searchText } })
        .then(res => {
            console.log(res.data.message);
            dispatch(
                {

                    type:"getBooksOnSearch",
                    payload:res.data.message
                }
            )
        })
        .catch(err => console.log(err.message));
    }
}


//get autocomplete list 
const getAutocompleteListOfBooks = (searchText) => {
    console.log(searchText)
    return(dispatch) => {
        axios.get(`/books/getAutocompleteListOfBooks`,{ params: { searchText:searchText } })
        .then(res => {
            console.log(res.data.message);
            dispatch(
                {

                    type:"getAutocompleteListOfBooks",
                    payload:res.data.message
                }
            )
        })
        .catch(err => console.log(err.message));
    }
}

//Add to cart 
const addToCart = (cartObj) => {
    return(dispatch) => {
        axios.post(`/user/addtocart`, cartObj)
        .then(res => {
            console.log(res.data.message);
            dispatch(
                {

                    type:"addToCart",
                    payload:res.data.message
                }
            )
        })
        .catch(err => console.log(err.message));
    }
}

//remove from cart 
const removeFromCart = (cartObj) => {

    console.log(cartObj)
    return(dispatch) => {
        axios.put(`/user/deleteCartBook`, cartObj)
        .then(res => {
            console.log(res.data.message);
            dispatch(
                {

                    type:"removeFromCart",
                    payload:res.data.message
                }
            )
        })
        .catch(err => console.log(err.message));
    }
}

//adjust the quantity
const adjustOty = (cartObj) => {
    return(dispatch) => {

        axios.put(`/user/updateqty`, cartObj)
        .then(res => {
            console.log(res.data.message);
            dispatch(
                {

                    type:"adjustOty",
                    payload:res.data.message
                }
            )
        })
        .catch(err => console.log(err.message));
        
    }
}


//get all orders
const getOrders = (useremail) => {
    return(dispatch) => {

        axios.get(`/user/getuserorders`, { params: { useremail:useremail } })
        .then(res => {
            console.log(res.data.message);
            dispatch(
                {

                    type:"getOrders",
                    payload:res.data.message
                }
            )
        })
        .catch(err => console.log(err.message));
        
    }
}

//get book by book model
const getbookBybookmodel = (bookmodel) => {
    return(dispatch) => {

        axios.get(`/books/getbookbymodel`, { params: { bookmodel:bookmodel} })
        .then(res => {
            console.log(res.data.message);
            dispatch(
                {

                    type:"getbookBybookmodel",
                    payload:res.data.message
                }
            )
        })
        .catch(err => console.log(err.message));
        
    }
}

//place orders
const placeOrder = (orderObj) => {
    return(dispatch) => {

        axios.post(`/user/placeorder`, orderObj)
        .then(res => {
            console.log(res.data.message);
            dispatch(
                {

                    type:"placeOrder",
                    payload:res.data.message
                }
            )
        })
        .catch(err => console.log(err.message));
        
    }
}

//update order status
const updateOrderStatus = (orderObj) => {
    return(dispatch) => {

        axios.put(`/user/updateorderstatus`, orderObj)
        .then(res => {
            console.log(res.data.message);
            dispatch(
                {

                    type:"updateOrderStatus",
                    payload:res.data.message
                }
            )
        })
        .catch(err => console.log(err.message));
        
    }
}



const updateBook = (bookObj) => {
    return(dispatch) => {

        axios.put(`/books/updatebook`, bookObj)
        .then(res => {
            console.log(res.data.message);
            dispatch(
                {

                    type:"updateBook",
                    payload:res.data.message
                }
            )
        })
        .catch(err => console.log(err.message));
        
    }
}

//remove whole cart on placing an order
const removeWholeCart = (email) => {
    return(dispatch) => {

        axios.delete(`/user/deletewholecart`, {params:{email:email}})
        .then(res => {
            console.log(res.data.message);
            dispatch(
                {

                    type:"removeWholeCart",
                    payload:res.data.message
                }
            )
        })
        .catch(err => console.log(err.message));
        
    }
}

//load the current item 
const loadCurrentItem = (item) => {
    return(dispatch) => {
        dispatch(
            {
                type:"loadCurrentItem",
                payload:item
            }
        )
    }
}

const deleteBook = (bookmodel) => {
    return(dispatch) => {

        axios.delete(`/books/deletebook`, {params:{bookmodel:bookmodel}})
        .then(res => {
            console.log(res.data.message);
            dispatch(
                {

                    type:"deleteBook",
                    payload:res.data.message
                }
            )
        })
        .catch(err => console.log(err.message));
        
    }
}

const ResetResponse = () => {
    return(dispatch) => {
        dispatch(
            {
                type:"ResetResponse",
            }
        )
    }
}



export default {createBook ,addToCart , removeFromCart , adjustOty , loadCurrentItem ,getBooksOnSearch,getBooksByCategory,getCartData,getAutocompleteListOfBooks , ResetResponse , getOrders ,getbookBybookmodel , placeOrder , updateOrderStatus , removeWholeCart , deleteBook , updateBook   }