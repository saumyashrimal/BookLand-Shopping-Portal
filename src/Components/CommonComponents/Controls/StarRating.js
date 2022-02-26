import React from 'react';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarHalfIcon from '@material-ui/icons/StarHalf';

function StarRating(props) {
    let rating = props.rating;
    let i = 0;
    let starsArray = [0,0,0,0,0];
    //creating an array
    for(i=0;i<Math.floor(rating);i++){
        starsArray[i] = 1;
    }

    //partial rating 
    let partialRating = rating-i;
    if(partialRating >0)
        starsArray[i] = partialRating;

    return (
        <div>
            {starsArray.map((val) => {
                return(
                     <>
                         {val===0 && <StarBorderIcon />}
                         {val ===1 &&  <StarIcon/>}
                         {(val>0 && val <1) &&  <StarHalfIcon/>}
                     </>
                )
            })
            }
        </div>
    )
}

export default StarRating
