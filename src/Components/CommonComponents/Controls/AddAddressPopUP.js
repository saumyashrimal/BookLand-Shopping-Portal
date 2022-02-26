import { useState, useEffect } from "react";
import axios from "../../../helpers/axios"
import "./AddAddressPopUPStyles.css";
import Popup from "./Popup";
import componentStateActionCreator from "../../../Store/componentStateActionCreator";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";

function AddAddressPopUP(props) {
  let StoreObj = useSelector((store) => store);
  const dispatch = useDispatch();
  const { setaddressList } = bindActionCreators(
    componentStateActionCreator,
    dispatch
  );

  let [displayPermanentInp, setdisplayPermanentInp] = useState(false);
  let [displayOtherInp, setdisplayOtherInp] = useState(false);
  let [address, setAddress] = useState("");
  let [responseTrigger, setResponseTrigger] = useState(false);
  let [responseState, setResponseState] = useState("");
  //get the Address array of user to get the previously filled address
  let PermanentAddress = "";
  let otherAddressList = "";
  let addressList = null;
  let otherAddIndex = 0;
  let email = null;
  console.log(StoreObj);

  //set the address list state
  let setAddressListState = () => {
    console.log("set address list ");
    if (StoreObj.componentState.LoginState) {
      axios
        .get("/user/getuseraddresslist", { params: { email: email } })
        .then((res) => {
          console.log(res);
          setaddressList(res.data.message.address);
        });
    }
  };

  if (StoreObj.componentState.LoginState) {
    addressList = StoreObj.componentState.addressList;
    //state to maintain index of new other addres
    otherAddIndex = addressList.length;
    email = JSON.parse(localStorage.getItem("user")).email;
    if (addressList.length !== 0) {
      PermanentAddress = addressList[0].address;
      otherAddressList = addressList.slice(1);
    }
  }

  let handleAddAddress = async (e) => {
    e.preventDefault();

    let addressObj = { email: email, index: 0, address: address };
    //axios post method to save the address in the document
    await axios.post("/user/addAddress", addressObj).then((res) => {
      setResponseState(res.data.message);
      setaddressList([{ index: 0, address }]);
      setResponseTrigger(true);
    });

    setTimeout(() => {
      setResponseTrigger(false);
      setResponseState("");
      setdisplayOtherInp(false);
      props.setAddressTrigger(false);
      setAddressListState();
    }, 1000);
  };

  let handleAddNewPermanentInp = async (e) => {
    e.preventDefault();

    let addressObj = { email: email, index: 0, address: address };
    //axios post method to save the address in the document
    await axios.put("/user/changeAddress", addressObj).then((res) => {
      setResponseState(res.data.message);
      setaddressList([{ index: 0, address }]);
      setResponseTrigger(true);
      setAddressListState();
    });

    setTimeout(() => {
      setResponseTrigger(false);
      setResponseState("");
      setdisplayPermanentInp(false);
      props.setAddressTrigger(false);
    }, 1000);
  };

  let handleAddOtherAddress = async (e) => {
    e.preventDefault();

    let addressObj = { email: email, index: otherAddIndex, address: address };
    //axios post method to save the address in the document
    await axios.post("/user/addAddress", addressObj).then((res) => {
      setResponseState(res.data.message);
      setResponseTrigger(true);
    });

    setTimeout(() => {
      setResponseTrigger(false);
      setResponseState("");
      setdisplayOtherInp(false);
      props.setAddressTrigger(false);
      setAddressListState();
    }, 1000);
  };

  let handleAddressdelete = (e ,addressObj ) => {

    e.preventDefault();
    
    let newDeletAddresObj = {email , address:addressObj.address , index:addressObj.index};
    console.log(newDeletAddresObj);
    //axios req to delete the address obj 
    axios.post("/user/removeAddress",newDeletAddresObj)
    .then(res => {
        console.log(res.data.message)
        setResponseState(res.data.message);
        setResponseTrigger(true);
    })

    setTimeout(() => {
        setResponseTrigger(false);
        setResponseState("");
        setdisplayOtherInp(false);
        props.setAddressTrigger(false);
        setAddressListState();
      }, 1000);
  };

  return (
    <>
      <Popup trigger={responseTrigger}>{responseState}</Popup>
      {props.trigger && (
        <div className="modal-bg modal">
          {/* if permanent address is also not available */}
          {PermanentAddress === "" && (
            <div className="modal-content modal-dialog">
              <div>
                <button
                  className="modal-content-Close d-inine bg-dark text-white float-end border-none"
                  onClick={() => props.setAddressTrigger(false)}
                >
                  X
                </button>
              </div>
              <input
                type="text"
                className="w-100"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                placeholder="Enter your permanent Address here "
              />
              <button
                className="addPermanentAddress rounded  bg-dark border border-light text-white w-100"
                onClick={handleAddAddress}
              >
                Add your permanent Address
              </button>
            </div>
          )}
          {PermanentAddress !== "" && (
            <div className="modal-content modal-dialog">
              <div>
                <button
                  className="modal-content-Close d-inline bg-dark text-white float-end border-none"
                  onClick={() => props.setAddressTrigger(false)}
                >
                  X
                </button>
              </div>

              {!displayPermanentInp && (
                <p>
                  <h5>Permanent Address : </h5> {PermanentAddress}
                </p>
              )}

              {displayPermanentInp && (
                <div className="my-1 row">
                  <input
                    type="text"
                    className="w-100 mb-3"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                    placeholder="Enter your new permanent Address here "
                  />
                  <button
                    className="bg-dark text-white border border-light rounded mx-2"
                    onClick={handleAddNewPermanentInp}
                  >
                    Add
                  </button>
                </div>
              )}

              <button
                className="bg-dark border border-light text-white w-100 my-1"
                onClick={(e) => {
                  setdisplayPermanentInp(true);
                }}
              >
                Change your permanent Address
              </button>

              {/* div for other addresses */}
              {otherAddressList.map((addressObj, ind) => {
                return (
                  <div className="bg-light row d-flex flex-row border border-dark rounded container mx-auto">
                    <div className="col-md-2">
                      <p>{ind + 1})</p>
                    </div>
                    <div  className="col-md-6"> {addressObj.address}</div>
                    <div className="col-md-1">
                      <button
                        className="bg-danger mt-1 me-0"
                        onClick={(e) => {
                          handleAddressdelete(e , addressObj);
                        }}
                      >
                        X
                      </button>
                    </div>
                  </div>
                );
              })}
              {displayOtherInp && (
                <div className="my-1 row">
                  <input
                    type="text"
                    className="w-100 d-inline"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                    placeholder="Enter your new permanent Address here "
                  />
                  <button
                    className="bg-dark text-white border border-light rounded mx-2"
                    onClick={handleAddOtherAddress}
                  >
                    Add
                  </button>
                </div>
              )}
              <button
                className="bg-dark border border-light text-white w-100 my-1"
                onClick={() => setdisplayOtherInp(true)}
              >
                Add another Address
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default AddAddressPopUP;
