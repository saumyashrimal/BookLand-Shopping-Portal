import { useEffect } from "react";
import "./HomeContentStyles.css";
import homeActionCreator from "../../Store/homeActionCreator";
import booksActionCreator from "../../Store/booksActionCreator";
import componentStateActionCreator from "../../Store/componentStateActionCreator";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";
import HomeCards from "./HomeCards";
import Footer from "../CommonComponents/Layout/Footer";

function HomeContent() {
  let StoreObj = useSelector((store) => store);
  let homeContentState = StoreObj.homeContentState;

  const dispatch = useDispatch();

  const { getMostpopularBooks, getMixedCollections, getNewReleases } =
    bindActionCreators(homeActionCreator, dispatch);

  useEffect(() => {
    getMostpopularBooks();
    getMixedCollections();
    getNewReleases();
  }, []);

  

  let MostPopularbooks = homeContentState.mostPopularbooks;
  let newReleases = homeContentState.newReleases;
  let mixedCollections = homeContentState.mixedCollections;

  return (
    <>
      <div className="HomePage">
        <div className="Homecontentwithbg text-center">
          <div className="text-white centered">
            <h1>Meet your next favourite book at BookLand</h1>
          </div>
        </div>
        <div className="bg-dark text-white border border-white rounded text-center ">
          <h3>Most Popular Books</h3>
        </div>

        <div className="d-flex row mt-3">
          {MostPopularbooks &&
            MostPopularbooks.map((bookObj) => {
              return <HomeCards bookObj={bookObj} />;
            })}
        </div>

        {/* new releases */}

        <div className="bg-dark text-white border border-white rounded text-center mt-2">
          <h3>New Releases</h3>
        </div>
        <div className="d-flex row mt-3">
          {newReleases &&
            newReleases.map((bookObj) => {
              return <HomeCards bookObj={bookObj} />;
            })}
        </div>

        {/* mixed collections */}
        <div className="bg-dark text-white border border-white rounded text-center mt-2">
          <h3>Mixed Collections</h3>
        </div>
        <div className="d-flex row mt-3">
          {mixedCollections &&
            mixedCollections.map((bookObj) => {
              return <HomeCards bookObj={bookObj} />;
            })}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default HomeContent;
