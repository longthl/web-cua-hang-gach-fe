import React,{useEffect,useState} from "react";
import { Link } from "react-router-dom";
import SanPhamService from "../../../Api/SanPhamService";
import Sidebar from "../Layout/Sidebar";
const ListSanPham =()=>{
    const [sanpham,setSanPham]=useState([])
    useEffect(()=>{
        SanPhamService.getAll().then((response)=>{
            setSanPham(response.data);
        }).catch(error=>{
            console.log(error);
        })
    },[])
    const DeleteDV=(e)=>{
        SanPhamService.deleteById(e).then((res)=>{
            window.location.href="/sanpham/index";
        }).catch((error)=>{
            console.log(error);
        });
    };
    return(
        <>
        <Sidebar/>
        <section id="content">
        {/* MAIN */}
        <main>
          <div className="table-data container">
            <div className="order">
              <div className="head">
                <h3>Sản Phẩm</h3>
                <i className="bx bx-search" />
                <i className="bx bx-filter" />
                <div>
                  <Link to="/sanpham/add" className="btn btn-primary">
                    Add
                  </Link>
                </div>
              </div>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Tên Sản Phẩm</th>
                    <th>Màu Sắc</th>
                    <th>Hình Ảnh</th>
                    <th>Kích Thước</th>
                    <th>Hang</th>
                    <th>Chất Liệu</th>
                    <th>Giá Sản Phẩm</th>
                    <th>Số Lượng</th>
                    <th>Ngày Sửa</th>
                    <th>Ngày Tạo</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    sanpham.map(
                      (sanpham, index) =>
                        <tr>
                          <th scope="row" key={index}>
                            <td>{index + 1}</td>
                          </th>
                          <td>{sanpham.tenSanPham}</td>
                          <td>{sanpham.mauSac?.ten}</td>
                          <td><img src={sanpham.hinhAnh?.anh} /></td>
                          <td>{sanpham.kichThuoc?.chieuDai}X{sanpham.kichThuoc?.chieuRong}</td>
                          <td>{sanpham.hang?.ten}</td>
                          <td>{sanpham.chatLieu?.ten}</td>
                          <td>{sanpham.giaSanPham}</td>
                          <td>{sanpham.soLuong}</td>
                          <td>{sanpham.ngaySua}</td>
                          <td>{sanpham.ngayTao}</td>
                          <td><button
                            onClick={(e) => DeleteDV(sanpham.id)}
                            className="btn btn-sm btn-danger"
                          >
                            Delete
                          </button>
                            <span className="padd"></span>
                            <Link className="btn btn-success" to={'/sanpham/update/' + sanpham.id}>
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
export default ListSanPham