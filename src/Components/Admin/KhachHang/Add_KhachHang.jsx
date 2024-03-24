import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Layout/Sidebar";
import KhachHangService from "../../../Api/KhachHangService";
import { toast } from "react-toastify";
const AddKhachHang=()=>{
    const [hoTen,setHoTen]=useState('');
    const [tenDangNhap,setTenDangNhap]=useState('');
    const [matKhau,setMatKhau]=useState('');
    const [sdt,setSDT]=useState('');
    const [gioiTinh,setGioiTinh]=useState('');
    const [ngayTao,setNgayTao]=useState('');
    const [ngaySua,setNgaySua]=useState('');

    const saveKhachHang=(event)=>{
        event.preventDefault();
        let khachhang={
            hoTen:hoTen,
            tenDangNhap:tenDangNhap,
            matKhau:matKhau,
            sdt:sdt,
            gioiTinh:gioiTinh,
            ngayTao:ngayTao,
            ngaySua:ngaySua
        };
        const confix=window.confirm("Bạn chắc chắn muốn thêm")
        if(confix){
            console.log('khachhang=>'+JSON.stringify(khachhang));
            KhachHangService.createkhachhang(khachhang).then((res)=>{
                alert('Save Successful');
                window.location.href='/khachhang/index';
            }).catch((error)=>{
                if(error && error.response && error.response.data){
                    toast(error.response.data);
                }
            });
        };
    }
    const changeHoTen=(event)=>{
        setHoTen(event.target.value);
    }
    const changeTenDangNhap=(event)=>{
        setTenDangNhap(event.target.value);
    }
    const changeMatKhau=(event)=>{
        setMatKhau(event.target.value);
    }
    const changeSDT=(event)=>{
        setSDT(event.target.value);
    }
    const changeGioiTinh=(event)=>{
        setGioiTinh(event.target.value);
    }
    return(
        <>
        <Sidebar />
          <section id="content">
              <main className="container">
                  <div className="table-data">
                      <div className="order">
                          <div className="head">
                              <h3>Thêm Khách Hàng</h3>
                          </div>
                          <form onSubmit={saveKhachHang}>
                              <div className=" row col-md-6 offset-md-3">
                              <div className="md-3">
                                      <label className="form-label">
                                          Họ Tên
                                      </label>
                                      <input className="form-control" type="text" name="hoTen" value={hoTen}
                                          onChange={changeHoTen} />
                                  </div>
                                  <div className="md-3">
                                      <label className="form-label">
                                          Tên Đăng Nhập
                                      </label>
                                      <input className="form-control" type="text" name="tenDangNhap" value={tenDangNhap}
                                          onChange={changeTenDangNhap} />
                                  </div>
                                  
                                  <div className="md-3">
                                      <label className="form-label">
                                          Mật Khẩu
                                      </label>
                                      <input className="form-control" type="password" name="matKhau" value={matKhau}
                                          onChange={changeMatKhau} />
                                  </div>

                                  <div className="md-3">
                                      <label className="form-label">
                                          SĐT
                                      </label>
                                      <input className="form-control" type="text" name="sdt" value={sdt}
                                          onChange={changeSDT} />
                                  </div>
                                  <div className="md-3">
                                      <label className="form-label">
                                          Giới Tính
                                      </label>
                                      <input className="form-control" type="text" name="gioiTinh" value={gioiTinh}
                                          onChange={changeGioiTinh} />
                                  </div>

                      
                                  <div className=" row mt-3 form-outline form-white mb-2">
                                      <div className="col-6">
                                          <button
                                              type="submit"
                                              onClick={saveKhachHang}
                                              className="btn btn-secondary form-control"
                                          >
                                              ADD
                                          </button>
                                      </div>
                                      <div className="col-6">
                                          <Link
                                              to="/khachhang/index"
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
}
export default AddKhachHang;