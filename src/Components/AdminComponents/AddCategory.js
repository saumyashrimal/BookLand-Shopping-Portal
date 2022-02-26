import { useEffect, useState } from "react";
import adminActionCreator from "../../Store/adminActionCreator";
import componentStateActionCreator from "../../Store/componentStateActionCreator";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Popup from "../CommonComponents/Controls/Popup";
import AdminDashboard from "./AdminDashboard";

function AddCategory() {
  let [categories, setCategories] = useState(null);
  let [trigger, setTrigger] = useState(false);
  let [newCategory, setNewCategory] = useState("");
  let history = useHistory();
  let StoreObj = useSelector((store) => store);
  const dispatch = useDispatch();

  const { getcategories, addcategory , ResetResponse} = bindActionCreators(
    adminActionCreator,
    dispatch
  );

  useEffect(() => {
    getcategories();
    setCategories(StoreObj.adminState.categories);
    console.log(StoreObj);
  }, [trigger]);

  let handleAddCategory = (e) => {
    addcategory({category:newCategory});
    setTrigger(true);

    setTimeout(() => {
      setTrigger(false);
      ResetResponse();
    }, 1000);
  };

  return (
    <>
      <AdminDashboard>
        <Popup trigger={trigger}>{StoreObj.adminState.response}</Popup>
        {categories && (
          <div className="row">
            <div className="col-md-8 text-center">
              <table class="table table-dark">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Category</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category, ind) => {
                    return (
                      <tr key={ind}>
                        <th>{ind + 1}</th>
                        <th>{category.category}</th>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="col-md-3 border border-dark shadow mt-3  ">
              <form className="form">
                <label htmlFor="ct" className="form-label mt-3">Category</label>
                <input
                  type="text"
                  value={newCategory}
                  placeholder="Enter new category here ...."
                  className="form-control mb-3"
                  onChange={(e) => {
                    setNewCategory(e.target.value);
                  }}
                />
                <button
                  className="bg-dark text-white border border-white rounded"
                  onClick={handleAddCategory}
                >
                  Add category
                </button>
              </form>
            </div>
          </div>
        )}
      </AdminDashboard>
    </>
  );
}

export default AddCategory;
