import React,{useEffect,useState} from "react";
import { Link } from "react-router-dom";
import KhachHangService from "../../../Api/KhachHangService";
import Sidebar from "../Layout/Sidebar";
const ListKhachHang=()=>{
    const [khachhang,setKhachHang]=useState([])
    useEffect(()=>{
        KhachHangService.getAll().then((response)=>{
           setKhachHang(response.data);
        }).catch(error=>{
            console.log(error);
        })
    },[])
    const DeleteDV=(e)=>{
        KhachHangService.deleteById(e).then((res)=>{
            window.location.href="/khachhang/index";
        }).catch((error)=>{
            console.log(error);
        });
    };
    return(
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
                    <Link to="/khachhang/add" className="btn btn-primary">
                      Add
                    </Link>
                  </div>
                </div>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Họ Tên</th>
                      <th>Tên Đăng Nhập</th>
                      <th>Mật Khẩu</th>
                      <th>SĐT</th>
                      <th>Giới Tính</th>
                  
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      khachhang.map(
                        (khachhang, index) =>
                          <tr>
                            <th scope="row" key={index}>
                              <td>{index + 1}</td>
                            </th>
                            <td>{khachhang.hoTen}</td>
                            <td>{khachhang.tenDangNhap}</td>
                            <td>{khachhang.matKhau}</td>
                            <td>{khachhang.sdt}</td>
                            <td>{khachhang.gioiTinh}</td>
                           
                            <td><button
                              onClick={(e) => DeleteDV(khachhang.id)}
                              className="btn btn-sm btn-danger"
                            >
                              Delete
                            </button>
                              <span className="padd"></span>
                              <Link className="btn btn-success" to={'/khachhang/update/' + khachhang.id}>
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
    )
}
export default ListKhachHang