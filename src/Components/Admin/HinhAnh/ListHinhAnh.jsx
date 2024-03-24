import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HinhAnhService from "../../../Api/HinhAnhService";
import Sidebar from "../Layout/Sidebar";
const ListHinhAnh = () => {
  const [hinhanh, setHinhAnh] = useState([])
  useEffect(() => {
    HinhAnhService.getAll().then((response) => {
      console.log(response.video);
      setHinhAnh(response.data);
    }).catch(error => {
      console.log(error);
    })
  }, [])
  const DeleteDV = (e) => {
    console.log(e);
    HinhAnhService.deleteById(e).then((res) => {
      window.location.href = "/hinhanh/index";
    }).catch((error) => {
      console.log(error);
    });
  };
  return (
    <>
      <Sidebar />
      <section id="content">
        {/* MAIN */}
        <main>
          <div className="table-data container">
            <div className="order">
              <div className="head">
                <h3>Chức Vụ</h3>
                <i className="bx bx-search" />
                <i className="bx bx-filter" />
                <div>
                  <Link to="/hinhanh/add" className="btn btn-primary">
                    Add
                  </Link>
                </div>
              </div>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Ảnh</th>
                    <th>Video</th>
                    <th>Ngày Sửa</th>
                    <th>Ngày Tạo</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    hinhanh.map((hinhanh, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td><img src={hinhanh.anh} alt={`Image ${index + 1}`} /></td>
                        <td>
                          {hinhanh.video && (
                            <video width="320" height="240" controls>
                              <source src={hinhanh.video} type="video/mp4" />
                            </video>
                          )}
                        </td>
                        <td>{hinhanh.ngaySua}</td>
                        <td>{hinhanh.ngayTao}</td>
                        <td>
                          <button
                            onClick={(e) => DeleteDV(hinhanh.id)}
                            className="btn btn-sm btn-danger"
                          >
                            Delete
                          </button>
                          <span className="padd"></span>
                          <Link className="btn btn-success" to={'/hinhanh/update/' + hinhanh.id}>
                            Detail
                          </Link>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
              <div className="px-5 py-2 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                <div className="inline-flex mt-2 mt-0">
                  <button
                    className="btn btn-sm btn-outline-secondary"
                  // onClick={prevPage}
                  >
                    Prev
                  </button>

                  <button
                    className="btn btn-sm btn-outline-secondary"
                  // onClick={nextPage}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
        {/* MAIN */}
      </section>
    </>
  );
}
export default ListHinhAnh