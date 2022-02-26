import React from "react";
import "./HomeCardStyles.css";
import StarRating from "../CommonComponents/Controls/StarRating";
import booksActionCreator from "../../Store/booksActionCreator";
import componentStateActionCreator from "../../Store/componentStateActionCreator";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";
import {useHistory} from 'react-router-dom';

function HomeCards(props) {

  let history = useHistory();

  let bookObj = props.bookObj;
  let StockStatus = bookObj.availableqty > 0 ? "In Stock" : "Out of Stock";

  const dispatch = useDispatch();

  const {loadCurrentItem} = bindActionCreators(booksActionCreator,dispatch);
  const {setBookState} = bindActionCreators(componentStateActionCreator,dispatch);


  let handleViewItem = (e) => {
    e.preventDefault();
    loadCurrentItem(bookObj)
    setTimeout(() => {
      setBookState(true);
      history.push("/currentbook")
    },500)
  }

  return (
    <div className="card col-md-3 border border-dark">
      <img
        className="card-img-top"
        src={bookObj.booksPhotos}
        alt="Card image cap"
      />
      <div className="card-body">
        <h5 className="card-title">{bookObj.bookname.substring(0, 30)}....</h5>
        <p className="card-text">
          {bookObj.bookdescription.substring(0, 30)}....
        </p>
        <h5 className="card-text d-inline">
          Rating : <StarRating rating={bookObj.rating} />{" "}
        </h5>
        <h5 className="text-success ">{StockStatus}</h5>
      </div>
      <div className="text-center mb-1">
          <a href="#" className="btn btn-dark" onClick={handleViewItem}>
            view Item
          </a>
        </div>
    </div>
  );
}

export default HomeCards;
