import { useState , useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SellersActionReducer from "../../Store/SellersActionReducer";
import booksActionCreator from "../../Store/booksActionCreator";
import componentStateActionCreator from "../../Store/componentStateActionCreator";
import { bindActionCreators } from "redux";
import Popup from "../CommonComponents/Controls/Popup";
import SellerDashboard from "./SellerDashboard";
import {useHistory} from "react-router-dom";

function SellerBooks() {

    let history = useHistory();

    let [bookList,setBookList] = useState(null);
  let [resTrigger, setResTrigger] = useState(false);
  let StoreObj = useSelector((store) => store);

  const dispatch = useDispatch();

  const { getBooks, setCurrentBook } = bindActionCreators(
    SellersActionReducer,
    dispatch
  );
  const { deleteBook, ResetResponse } = bindActionCreators(
    booksActionCreator,
    dispatch
  );

  const { setEditBookState } = bindActionCreators(
    componentStateActionCreator,
    dispatch
  );

  let email = JSON.parse(localStorage.getItem("user")).email;

  useEffect(() => {

    getBooks(email);
    setBookList(StoreObj.sellerState.Books);

    console.log("inside useeffect storeobj",StoreObj);
    
  }, []);


  //Edit the book
  let EditBook = (e , bookObj) => {
      e.preventDefault();
      setCurrentBook(bookObj);
      setEditBookState(true);
      history.push("/createbook");
  }

  let DeleteBook = (e,bookObj) => {
      deleteBook(bookObj.booksmodel);
      setResTrigger(true)
      setTimeout(() => {
        setResTrigger(false)
        ResetResponse();
        getBooks(email);  
      },1000)
  }

  return (
    <>
      <Popup trigger={resTrigger}>{StoreObj.bookState.response}</Popup>
      <SellerDashboard>
        {bookList && (
          <div>
            <div className="text-center">
              <h1 className="bg-dark text-white p-1 ">Books</h1>
            </div>

            <div className="orders-table">
              <table class="table container">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">Sno.</th>
                    <th scope="col">Book Model</th>
                    <th scope="col">BookName</th>
                    <th scope="col">Available Qty</th>
                    <th scope="col">Price</th>
                    <th scope="col">Author</th>
                    <th scope="col">Category</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {bookList.map((bookObj, ind) => {
                    return (
                      <tr key={ind}>
                        <th scope="row">{ind + 1}</th>
                        <td>{bookObj.booksmodel}</td>
                        <td>{bookObj.bookname.substring(0, 15)}...</td>
                        <td>{bookObj.availableqty}</td>
                        <td>{bookObj.bookprice}</td>
                        <td>{bookObj.bookauthor}</td>
                        <td>{bookObj.parentcategory}</td>
                        <td>
                          <button
                            className="btn btn-dark border border-white text-white"
                            onClick={(e) => EditBook(e, bookObj)}
                          >
                           Edit
                          </button>
                          <button
                            className="btn btn-dark border border-white text-white"
                            onClick={(e) => DeleteBook(e, bookObj)}
                          >
                           Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </SellerDashboard>
    </>
  );
}

export default SellerBooks;
