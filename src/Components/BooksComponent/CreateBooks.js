import { useState, useEffect } from "react";
import axios from "../../helpers/axios";
import Header from "../SellerComponents/Header";
import BookImages from "./BookImages";
import booksActionCreator from "../../Store/booksActionCreator";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";
import Popup from "../CommonComponents/Controls/Popup";
import {useHistory} from "react-router-dom";

function CreateBooks() {

  let history = useHistory();
  let [restrigger,setResTrigger] = useState(false);
  let StoreObj = useSelector((store) => store);
  //get the current seller object 
  let currentSellerbookObj = StoreObj.sellerState.currentBook

  let [bookObj, setBookObj] = useState({
    booksmodel: "",
    bookname: "",
    bookauthor: "",
    availableqty: 0,
    bookprice: 0,
    bookdescription: "",
    booklevel: "",
    parentcategory: "",
    selleremail: "",
    discount: 0,
  });
  

  let [categories, setCategory] = useState([]);
  let [bookPhotos, setBookPhotos] = useState([]);

  let EditBookState = StoreObj.componentState.EditBookState;

  let initialErrState = {
    bookmodelErr: "",
    booknameErr: "",
    bookauthorErr: "",
    availableqtyErr: "",
    bookpriceErr: "",
    bookdescriptionErr: "",
    booklevelErr: "",
    parentcategoryErr: "",
  };

  let [errState, setErrState] = useState(initialErrState);

  const dispatch = useDispatch();

  const { createBook ,ResetResponse , updateBook } = bindActionCreators(booksActionCreator, dispatch);

  useEffect(() => {

    console.log(StoreObj)

    if(EditBookState){
      setBookObj(currentSellerbookObj);
    }


    // get all the categories
    axios
      .get("books/getcategories")
      .then((res) => {
        setCategory(res.data.message);
        console.log(categories);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  let handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(bookObj);
    //error handling
    setErrState(initialErrState);

    if (bookObj.booksmodel === "") {
      setErrState({
        ...initialErrState,
        bookmodelErr: "book model is required",
      });
    } else if (bookObj.bookname === "") {
      setErrState({ ...initialErrState, booknameErr: "book name is required" });
    } else if (bookObj.bookauthor === "") {
      setErrState({
        ...initialErrState,
        bookauthorErr: "book Author is required",
      });
    } else if (bookObj.bookprice === "") {
      setErrState({
        ...initialErrState,
        bookpriceErr: "book Price is required",
      });
    } else if (bookObj.parentcategory === "") {
      setErrState({
        ...initialErrState,
        parentcategoryErr: "Parent Category is required",
      });
    } else if (bookObj.availableqty === "") {
      setErrState({
        ...initialErrState,
        availableqtyErr: "Please select available quantity",
      });
    } else if (bookObj.bookdescription === "") {
      setErrState({
        ...initialErrState,
        bookdescriptionErr: "Book Description is required",
      });
    } else {
      //form data object to handle multimedia content
      let formData = new FormData();

      //add file(s) to formdata object
      formData.append("photo", bookPhotos, bookPhotos.name);

      //add seller email
      bookObj.selleremail = JSON.parse(localStorage.getItem("user")).email;

      //add userObj to formData object
      formData.append("bookObject", JSON.stringify(bookObj));

      createBook(formData);
      setResTrigger(true)

      setTimeout(() => {
        setResTrigger(false)
        ResetResponse();
        window.location.reload();
      },2000)
    }
  };


  let handleUpdateBook = (e) => {
    e.preventDefault();
    updateBook(bookObj);
    setResTrigger(true);

    setTimeout(() => {
      setResTrigger(false)
      ResetResponse();
      history.push("/sellerbooks")
    },1000)
    
  }


  return (
    <>
    <Popup trigger={restrigger}>{StoreObj.bookState.response}</Popup>
      <Header />
      
      <form
        className="container mx-auto w-75 border border-secondary shadow p-5 my-5"
        onSubmit={handleFormSubmit}
      >
        <h3>Create New Book</h3>
        <div className="form-row d-flex">
          {/* book model  */}
          <div className="form-group col-md-6 me-2">
            <label htmlFor="bm" className="form-label">
              BookModel
            </label>
            <input
              type="text"
              className="form-control"
              id="bm"
              placeholder="Enter Book model..."
              disabled = {EditBookState}
              value={bookObj.booksmodel}
              onChange={(e) =>
                setBookObj({ ...bookObj, booksmodel: e.target.value })
              }
            />
            {errState.bookmodelErr && (
              <p className="text-danger">{errState.bookmodelErr}</p>
            )}
          </div>

          {/* book name */}
          <div className="form-group col-md-6">
            <label htmlFor="bn" className="form-label">
              BookName
            </label>
            <input
              type="text"
              class="form-control"
              id="bn"
              placeholder="Enter Book Name..."
              disabled = {EditBookState}
              value={bookObj.bookname}
              onChange={(e) =>
                setBookObj({ ...bookObj, bookname: e.target.value })
              }
            />
            {errState.booknameErr && (
            <p className="text-danger">{errState.booknameErr}</p>
          )}
          </div>
          
        </div>

        <div className="form-row d-flex">
          {/* book Author  */}
          <div className="form-group col-md-6 me-2">
            <label htmlFor="bm" className="form-label">
              Author
            </label>
            <input
              type="text"
              className="form-control"
              id="bm"
              placeholder="Enter Author..."
              disabled = {EditBookState}
              value={bookObj.bookauthor}
              onChange={(e) =>
                setBookObj({ ...bookObj, bookauthor: e.target.value })
              }
            />
            {errState.bookauthorErr && (
              <p className="text-danger">{errState.bookauthorErr}</p>
            )}
          </div>

          {/* Available quantity */}
          <div className="form-group col-md-3">
            <label htmlFor="bn" className="form-label">
              Available Quantity
            </label>
            <input
              type="number"
              class="form-control"
              id="bn"
              placeholder="Enter total quantity available..."
              value={bookObj.availableqty}
              onChange={(e) =>
                setBookObj({ ...bookObj, availableqty: e.target.value })
              }
            />
            {errState.availableqtyErr && (
              <p className="text-danger">{errState.availableqtyErr}</p>
            )}
          </div>

          {/* Discount */}
          <div className="form-group col-md-3">
            <label htmlFor="bn" className="form-label">
              Discount %
            </label>
            <input
              type="number"
              class="form-control"
              id="bn"
              placeholder="Enter discount if any ..."
              value={bookObj.discount}
              onChange={(e) =>
                setBookObj({ ...bookObj, discount: e.target.value })
              }
            />
          </div>
        </div>

        <div className="form-row d-flex mt-3">
          {/* book price  */}
          <div className="form-group col-md-4 me-2">
            <label htmlFor="bp" className="form-lable">
              Price
            </label>
            <input
              type="number"
              className="form-control"
              id="bp"
              placeholder="Enter Book price..."
              value={bookObj.bookprice}
              onChange={(e) =>
                setBookObj({ ...bookObj, bookprice: e.target.value })
              }
            />
            {errState.bookpriceErr && (
              <p className="text-danger">{errState.bookpriceErr}</p>
            )}
          </div>

          {/* book Level */}
          <div className="form-group col-md-4 ms-3">
            <label className=" form-label d-block" htmlFor="level">
              Book Level
            </label>
            <select
              className="custom-select  mr-sm-2 p-1 border-secondary rounded"
              id="level"
              value={bookObj.booklevel}
              onChange={(e) =>
                setBookObj({ ...bookObj, booklevel: e.target.value })
              }
            >
              <option selected>Choose level...</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advance">Advanced</option>
            </select>
            {errState.booklevelErr && (
              <p className="text-danger">{errState.booklevelErr}</p>
            )}
          </div>

          {/* book parent category */}
          <div className="form-group col-md-4">
            <label className=" mr-2 d-block form-label" htmlFor="level">
              Category
            </label>
            <select
              className="custom-select mr-sm-2 border-secondary rounded p-1"
              id="level"
              value={bookObj.parentcategory}
              onChange={(e) =>
                setBookObj({ ...bookObj, parentcategory: e.target.value })
              }
            >
              <option selected>Choose Category...</option>
              {categories !== null &&
                categories.map((category, ind) => {
                  return (
                    <option key={ind} value={category.category}>
                      {category.category}
                    </option>
                  );
                })}
            </select>
            {errState.parentcategoryErr && (
            <p className="text-danger">{errState.parentcategoryErr}</p>
          )}
          </div>
          
          
        </div>

        <div className="form-row d-flex">
          {/* book Description  */}
          <div className="form-group col-md-8">
            <label htmlFor="bd" className="d-block form-label">
              Book Description
            </label>
            <textarea
              id="bd"
              className="form-control"
              placeholder="Enter book description ...."
              rows="3"
              cols=""
              width="100%"
              value={bookObj.bookdescription}
              onChange={(e) =>
                setBookObj({ ...bookObj, bookdescription: e.target.value })
              }
            />
            {errState.bookdescriptionErr && (
              <p className="text-danger">{errState.bookdescriptionErr}</p>
            )}
          </div>

          <div className="my-5 col-md-4 mx-4">
            <input
              type="file"
              name="photo"
              className="form-controle mb-3"
              disabled = {EditBookState}
              onChange={(e) => {
                setBookPhotos(e.target.files[0]);
              }}
            />
          </div>
        </div>

        {!EditBookState && <button
          type="submit"
          className="btn bg-dark text-white d-block mx-auto col-md-4"
        >
          Add Book
        </button>}
        {EditBookState && <button
          className="btn bg-dark text-white d-block mx-auto col-md-4"
          onClick={handleUpdateBook}
        >
          Update Book
        </button>}
      </form>
    </>
  );
}

export default CreateBooks;
