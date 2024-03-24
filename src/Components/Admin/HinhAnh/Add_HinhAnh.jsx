import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Layout/Sidebar";
import HinhAnhService from "../../../Api/HinhAnhService";
import { toast } from "react-toastify";
import { instance } from "../../../Api/instance";

const Add_HinhAnh = () => {
  const [anh, setAnh] = useState("");
  const [video, setVideo] = useState("");
  const preset_key = "du-an1";
  const cloud_name = "dommoqita";
  const folder_name = "anh-nhanvien";

  const handleFile = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset_key);
    formData.append("folder", folder_name);
    instance
      .post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData)
      .then((res) => setAnh(res.data.secure_url))
      .catch((err) => console.log(err));
  };

  const handleVideo = (event) => {
    // const file = event.target.files[0];
    // const videoURL = URL.createObjectURL(file);
    // const videoElement = document.createElement("video");
    // videoElement.src = videoURL;
    // videoElement.onloadeddata = () => {
    //   const duration = videoElement.duration;
    //   const time = duration / 2;
    //   videoElement.currentTime = time;
    //   const canvas = document.createElement("canvas");
    //   const context = canvas.getContext("2d");
    //   canvas.width = videoElement.videoWidth;
    //   canvas.height = videoElement.videoHeight;
    //   context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
    //   const imageBase64 = canvas.toDataURL("image/png");
    //   setVideo(imageBase64);
    //   URL.revokeObjectURL(videoURL);
    const file=event.target.files[0];
    const videoURL=URL.createObjectURL(file);
    console.log(videoURL);
    setVideo(videoURL);
    // };
  };

  const saveHinhAnh = (event) => {
    event.preventDefault();
    let hinhanh = {
      anh: anh,
      video: video,
    };
    const confix = window.confirm("Bạn có chắc chắn thêm");
    if (confix) {
      console.log("hinhanh=>" + JSON.stringify(hinhanh));
      console.log(hinhanh.video);
      HinhAnhService.createhinhanh(hinhanh)
        .then((res) => {
          alert("Save Successful");
          console.log(hinhanh.anh);
          window.location.href = "/hinhanh/index";
        })
        .catch((error) => {
          if (error && error.response && error.response.data) {
            toast(error.response.data);
          }
        });
    }
  };

  const changeVideo = (event) => {
    setVideo(event.target.value);
  };

  return (
    <>
      <Sidebar />

      <section id="content">
        <main className="container">
          <div className="table-data">
            <div className="order">
              <div className="head">
                <h3>Thêm Hình Ảnh</h3>
              </div>
              <form onSubmit={saveHinhAnh}>
                <div className=" row col-md-6 offset-md-3">
                  <div className="md-3">
                    <label className="form-label">Ảnh</label>
                    <input
                      className="form-control"
                      type="file"
                      name="anh"
                      onChange={handleFile}
                    />
                    <br />
                    <img src={anh} className="w-40 h-40" />
                  </div>
                  <div className="md-3">
                    <label className="form-label">Video</label>
                    <input
                      type="file"
                      name="video"
                      onChange={handleVideo}
                    />
                  </div>
                  <div className=" row mt-3 form-outline form-white mb-2">
                    <div className="col-6">
                      <button
                        type="submit"
                        onClick={saveHinhAnh}
                        className="btn btn-secondary form-control"
                      >
                        ADD
                      </button>
                    </div>
                    <div className="col-6">
                      <Link
                        to="/hinhanh/index"
                        className="btn btn-danger form-control"
                      >
                        Cancel
                      </Link>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default Add_HinhAnh;
