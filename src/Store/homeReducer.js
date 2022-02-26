

let initialState = {
    newReleases:null,
    mostPopularbooks:null,
    mixedCollections:null

}

const homeReducer = (state = initialState, action) => {
    switch (action.type) {
  
  
  
      case "getMostpopularBooks" : 
      console.log(action.payload);
      return {...state,mostPopularbooks:action.payload}
  
      case "getNewReleases" : 
      return {...state,newReleases:action.payload}


      case "getMixedCollections" : 
      return {...state,mixedCollections:action.payload}
  
      default:
        return state;
    }
}


export default homeReducer;