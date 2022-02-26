import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Logo from "./CommonComponents/Logo";
import Header from "./CommonComponents/Layout/Header";
import HomeContent from "./BooksComponent/HomeContent";
import { useSelector, useDispatch } from "react-redux";
import BooksList from "../../src/Components/BooksComponent/BooksList";
import Book from "./BooksComponent/Book";

function Home(props) {
  let history = useHistory();
  console.log("home rendered");
  let bookStore = useSelector((store) => store);
  let booksList = bookStore.bookState.books;
  let componentState = bookStore.componentState;


  return (
    <>
      <Header />
      {componentState.homeState === true && <HomeContent />}
      {componentState.homeState === false && props.children}

      
      
    </>
  );
}

export default Home;
