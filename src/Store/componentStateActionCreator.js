

//Home State
const setHomeState = (val) => {
    return(dispatch) => {
        dispatch(
            {
                type:"setHomeState",
                payload:val
            }
        )
    }
}

//BookList State 
const setBookListState = (val) => {
    return(dispatch) => {
        dispatch(
            {
                type:"setBookListState",
                payload:val
            }
        )
    }
}
//Book State
const setBookState = (val) => {
    return(dispatch) => {
        dispatch(
            {
                type:"setBookState",
                payload:val
            }
        )
    }
}

//set cart state
const setCartState = (val) => {
    return(dispatch) => {
        dispatch(
            {
                type:"setCartState",
                payload:val
            }
        )
    }
}

//set login state
const setLoginState = (val) => {
    return(dispatch) => {
        dispatch(
            {
                type:"setLoginState",
                payload:val
            }
        )
    }
}

const setAddToCartState = () => {
    return(dispatch) => {
        dispatch(
            {
                type:"setAddToCartState"
            }
        )
    }
}

const setOrderState = (val) => {
    return(dispatch) => {
        dispatch(
            {
                type:"setOrderState",
                payload:val
            }
        )
    }
}

const setaddressList = (addressList) => {
    console.log(addressList);
    return(dispatch) => {
        dispatch(
            {
                type:"setaddressList",
                payload:addressList
            }
        )
    }
}

const setEditBookState = (val) => {
    return(dispatch) => {
        dispatch(
            {
                type:"setEditBookState",
                payload:val
            }
        )
    }
}


export default {setHomeState , setBookState ,setBookListState , setCartState,setLoginState , setAddToCartState , setOrderState , setaddressList , setEditBookState}