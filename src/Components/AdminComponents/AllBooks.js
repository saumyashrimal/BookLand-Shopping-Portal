import { useState, useEffect } from "react";
import adminActionCreator from "../../Store/adminActionCreator";
import componentStateActionCreator from "../../Store/componentStateActionCreator";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Popup from "../CommonComponents/Controls/Popup";
import AdminDashboard from "./AdminDashboard";
import ReviewsAndRatings from "./ReviewsAndRatings";

function AllBooks() {
  let [reviewTrigger, setReviewTrigger] = useState(false);
  let [currentBook,setCurrentBook] = useState("");

  let [trigger, setTrigger] = useState(false);
  let [bookList, setBookList] = useState("");
  let history = useHistory();
  let StoreObj = useSelector((store) => store);
  const dispatch = useDispatch();

  const { getAllBooks, deleteBook, ResetResponse, getbookReviews , ResetReviews } =
    bindActionCreators(adminActionCreator, dispatch);

  useEffect(() => {
    getAllBooks();
    setBookList(StoreObj.adminState.books);
  }, [trigger]);

  let handleDeleteBook = (e, bookmodel) => {
    e.preventDefault();
    deleteBook(bookmodel);
    setTrigger(true);

    setTimeout(() => {
      setTrigger(false);
      ResetResponse();
    }, 1000);
  };

  let handleOpenReviews = (e, book) => {
    e.preventDefault();
    ResetReviews()
    setCurrentBook(book);
    console.log("inside the all books after reset ", StoreObj);
    getbookReviews(book);
    console.log("inside the all books getting book reviews", StoreObj);
    setReviewTrigger(true);
    
  };

  return (
    <>
      <AdminDashboard>
        <ReviewsAndRatings
          trigger={reviewTrigger}
          setReviewTrigger={setReviewTrigger}
            book={currentBook}
        />
        <Popup trigger={trigger}>{StoreObj.adminState.response}</Popup>
        {bookList && (
          <div>
            <div className="text-center">
              <h1 className="bg-dark text-white p-1 ">
                Total Books : {bookList.length}
              </h1>
            </div>

            <div className="orders-table">
              <table class="table container">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">Sno.</th>
                    <th scope="col">Book Model</th>
                    <th scope="col">BookName</th>
                    <th scope="col">Author</th>
                    <th scope="col">available Qty</th>
                    <th scope="col">Price</th>
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
                        <td>{bookObj.bookauthor}</td>
                        <td>{bookObj.availableqty}</td>
                        <td>{bookObj.bookprice}</td>
                        <td>
                          <button
                            className="btn btn-dark border border-white text-white"
                            onClick={(e) =>
                              handleDeleteBook(e, bookObj.booksmodel)
                            }
                          >
                            Delete Book
                          </button>
                          <button
                            className="btn btn-light border border-dark text-dark"
                            onClick={(e) =>
                              handleOpenReviews(e, bookObj.booksmodel)
                            }
                          >
                            Open Reviews
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
      </AdminDashboard>
    </>
  );
}

export default AllBooks;
