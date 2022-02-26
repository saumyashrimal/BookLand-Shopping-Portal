import { useState, useEffect } from "react";
import SearchIcon from "@material-ui/icons/Search";
import booksActionCreator from "../../../Store/booksActionCreator";
import componentStateActionCreator from "../../../Store/componentStateActionCreator";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import SearchBarStyles from "./SearchBarStyles.css";

function SearchBar() {
  let history = useHistory();
  //state to handle click outside of the search bar
  let [searchIsOpen, setSearchIsOpen] = useState(false);
  let StoreObj = useSelector((store) => store);
  const dispatch = useDispatch();
  let searchSuggestions = StoreObj.bookState.searchSuggestions;
  const { getAutocompleteListOfBooks, getBooksOnSearch } = bindActionCreators(
    booksActionCreator,
    dispatch
  );
  const { setBookListState } = bindActionCreators(
    componentStateActionCreator,
    dispatch
  );

  let handleSearch = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    if (e.target.value != "") {
      getAutocompleteListOfBooks(e.target.value);
      setSearchIsOpen(true);
    }
    else{
      setSearchIsOpen(false)
    }
  };

  useEffect(() => {
    //   document.addEventListener("mousedown",() => {
    //       setSearchIsOpen(false);
    //   })
  });

  let handleOnSelect = (e, searchtext) => {
    e.preventDefault();
    getBooksOnSearch(searchtext);
    setBookListState(true);
    setSearchIsOpen(false);
    history.push("/booklist");
  };

  return (
    <div className="searchdiv d-flex flex-column">
      <div className="d-flex flex-row">
        <input
          className="form-control d-inline fa"
          type="search"
          placeholder="Search by Book name , Author name or Category ...."
          aria-label="Search"
          onChange={handleSearch}
        />
        <button className="search-btn btn btn-primary my-0">
          <SearchIcon />
        </button>
      </div>
      {searchSuggestions && searchIsOpen && (
        <div>
          <div className="list-group">
            {searchSuggestions.map((searchtext, ind) => {
              return (
                <a
                  key={ind}
                  href="#"
                  className="list-group-item list-group-item-action"
                  onClick={(e) => {
                    handleOnSelect(e, searchtext);
                  }}
                >
                  {searchtext}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
