import axios from "../helpers/axios";


const getMostpopularBooks = () => {
    return(dispatch) => {
        axios.get(`/books/getmostpopularbooks`)
        .then(res => {
            dispatch(
                {

                    type:"getMostpopularBooks",
                    payload:res.data.message
                }
            )
        })
        .catch(err => console.log(err.message));
       
    }
}

const getNewReleases = () => {
    return(dispatch) => {
        axios.get(`/books/getnewreleases`)
        .then(res => {
            dispatch(
                {

                    type:"getNewReleases",
                    payload:res.data.message
                }
            )
        })
        .catch(err => console.log(err.message));
       
    }
}


const getMixedCollections = () => {
    return(dispatch) => {
        axios.get(`/books/getmixedcollections`)
        .then(res => {
            dispatch(
                {

                    type:"getMixedCollections",
                    payload:res.data.message
                }
            )
        })
        .catch(err => console.log(err.message));
       
    }
}




export default {getMostpopularBooks ,getMixedCollections , getNewReleases };