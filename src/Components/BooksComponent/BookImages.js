import React from "react";
import BookImagesStyles from "./BookImagesStyles.css";

function BookImages(props) {

    let imgurl = null;

    let onFileSelect = (e) => {
        e.preventDefault();
        let file_reader = new FileReader();
        let file = e.target.files[0]
        file_reader.onload = () => {
            props.setImageArray(file);
        }

        imgurl = file_reader.readAsDataURL(file);
        console.log(file_reader);
        
    }

    


  return (
    <div className="ImgInputPopup">
      <div className="Imgmodal">
        <button
          className="ImgModal-Close bg-dark text-white float-end border-none"
          onClick={() => props.setShowImgPopup(false)}
        >
          X
        </button>
        <h3>Upload Images</h3>
        <div className="mainImg col-md-4 ">
          <img src={imgurl.result || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5BsENcBDz2r37OC7GqNrwc7PILcrXOPgcAeZ5pVLGPQv8cwuB-gLxCA_EtydAl6vcRQI&usqp=CAU"} className="border border-dark p-2 d-block" alt="" width="100rem" />
          <input type="file" name="photo" className="form-control mb-3 d-none" id="mainphoto" onChange={(e) => onFileSelect(e)}/>
          <label htmlFor="mainphoto" className="bg-dark text-white p-1 px-3" style={{cursor:"pointer"}}>Click here </label>
        </div>
      </div>
    </div>
  );
}

export default BookImages;
