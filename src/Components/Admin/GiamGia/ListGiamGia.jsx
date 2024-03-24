import React,{useEffect,useState} from "react";
import { Link } from "react-router-dom";
import GiamGiaService from "../../../Api/GiamGiaService";
import Sidebar from "../Layout/Sidebar";
const ListGiamGia=()=>{
    const [giamgia,setGiamGia]=useState([])
    useEffect(()=>{
        GiamGiaService.getAll().then((response)=>{
            setGiamGia(response.data);
        }).catch(error=>{
            console.log(error);
        })
    },[])
    const DeleteDV=(e)=>{
        GiamGiaService.deleteById(e).then((res)=>{
            window.location.href="/giamgia/index";
        }).catch((error)=>{
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
                    <h3>Giảm Giá</h3>
                    <i className="bx bx-search" />
                    <i className="bx bx-filter" />
                    <div>
                      <Link to="/giamgia/add" className="btn btn-primary">
                        Add
                      </Link>
                    </div>
                  </div>
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>STT</th>
                        <th>Ma</th>
                        <th>Đơn Hàng Tối Thiểu</th>
                        <th>Số Tiền Giảm</th>
                        <th>Ngày Sửa</th>
                        <th>Ngày Tạo</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        giamgia.map(
                          (giamgia, index) =>
                            <tr>
                              <th scope="row" key={index}>
                                <td>{index + 1}</td>
                              </th>
                              <td>{giamgia.ma}</td>
                              <td>{giamgia.donHang}</td>
                              <td>{giamgia.soTienGiam}</td>
                              <td>{giamgia.ngaySua}</td>
                              <td>{giamgia.ngayTao}</td>
                              <td><button
                                onClick={(e) => DeleteDV(giamgia.id)}
                                className="btn btn-sm btn-danger"
                              >
                                Delete
                              </button>
                                <span className="padd"></span>
                                <Link className="btn btn-success" to={'/giamgia/update/' + giamgia.id}>
                                  Detail
                                </Link>
                              </td>
                            </tr>
                        )
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
export default ListGiamGia