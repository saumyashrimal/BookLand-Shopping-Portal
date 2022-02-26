import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import booksActionCreator from "../../Store/booksActionCreator";
import BookListCard from "./BookListCard";
import Home from "../Home";

function BooksList(props) {
  let bookStore = useSelector((store) => store);

  let booksList = bookStore.bookState.books
  // //check if cart is accessed 


  // CartState ? bookStore.bookState.cartBooks : ;

  console.log(booksList);
  return (
    <>
      <Home>
        {booksList && booksList.map((bookObj, ind) => (
          <BookListCard key={ind} bookObj={bookObj} />
        ))}
        {booksList.length === 0 && 
          <h1 className="bg-dark text-white text-center container p-5 w-75 mt-3">NO BOOKS FOUND</h1>
        }
      </Home>
    </>
  );
}

export default BooksList;
