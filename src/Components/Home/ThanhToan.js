import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import GioHangService from "../../Api/GioHangService";
import ThanhToanService from "../../Api/ThanhToanService";


export default function ListThanhToan() {
    const [item,setItem]=useState(null)
    const {id}=useParams();
    const [search,setSearch]=useState("");
    const [selectedProducts,setSelectedProducts]=useState([]);
    const {productIds}=useParams();
    useEffect(()=>{
        const fetchData=async()=>{
            try{
                const response=await ThanhToanService.getById(id);
                setItem(response.data);
                setSelectedProducts(response.data.selectedProducts);
                console.log(response.data.selectedProducts);
            }catch(error){
                console.error('Error fetching data:',error);
            }
        };
        fetchData();
    },[id]);
    const totalAmount=item&&item.length>0?item.reduce((total,product)=>{
        return total+product.sanPhamCT.giaSanPham*product.soluong;
    },0):0;
    return (
        <>
            <Header />

  
            <main role="main">
       
        <div class="container mt-4">
            <form class="needs-validation" name="frmthanhtoan" method="post"
                action="#">
                <input type="hidden" name="kh_tendangnhap" value="dnpcuong"/>

                <div class="py-5 text-center">
                    <i class="fa fa-credit-card fa-4x" aria-hidden="true"></i>
                    <h2>Thanh toán</h2>
                    <p class="lead">Vui lòng kiểm tra thông tin Khách hàng, thông tin Giỏ hàng trước khi Đặt hàng.</p>
                </div>
              
                <div class="row">
                    <div class="col-md-4 order-md-2 mb-4">
                        <h4 class="d-flex justify-content-between align-items-center mb-3">
                            <span class="text-muted">Giỏ hàng</span>
                            <span class="badge badge-secondary badge-pill">2</span>
                        </h4>  {item && item.length > 0 && item.map((product,index)=>( 
                        <ul class="list-group mb-3" key={index}>
                           

                            <li class="list-group-item d-flex justify-content-between lh-condensed">
                                <div>
                                    <h6 class="my-0">{product.sanPhamCT?.tenSanPham}</h6>
                                    <small class="text-muted">{product.sanPhamCT?.giaSanPham} X {product.soluong}</small>
                                </div>
                                <span class="text-muted">{product.sanPhamCT?.giaSanPham*product.soluong}</span>
                            </li>
                            <input type="hidden" name="sanphamgiohang[2][sp_ma]" value="4"/>
                            <input type="hidden" name="sanphamgiohang[2][gia]" value="14990000.00"/>
                            <input type="hidden" name="sanphamgiohang[2][soluong]" value="8"/>

                           
                        </ul>
                        ))}
 <li class="list-group-item d-flex justify-content-between">
                                <span>Tổng thành tiền</span>
                                <strong>{totalAmount}</strong>
                            </li>
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="Mã khuyến mãi"/>
                            <div class="input-group-append">
                                <button type="submit" class="btn btn-secondary">Xác nhận</button>
                            </div>
                        </div>

                    </div>
                    <div class="col-md-8 order-md-1">
                        <h4 class="mb-3">Thông tin khách hàng</h4>

                        <div class="row">
                            <div class="col-md-12">
                                <label for="kh_ten">Họ tên</label>
                                <input type="text" class="form-control" name="kh_ten" id="kh_ten"
                                    value="Dương Nguyễn Phú Cường" readonly=""/>
                            </div>
                            <div class="col-md-12">
                                <label for="kh_gioitinh">Giới tính</label>
                                <input type="text" class="form-control" name="kh_gioitinh" id="kh_gioitinh" value="Nam"
                                    readonly=""/>
                            </div>
                            <div class="col-md-12">
                                <label for="kh_diachi">Địa chỉ</label>
                                <input type="text" class="form-control" name="kh_diachi" id="kh_diachi"
                                    value="130 Xô Viết Nghệ Tỉnh" readonly=""/>
                            </div>
                            <div class="col-md-12">
                                <label for="kh_dienthoai">Điện thoại</label>
                                <input type="text" class="form-control" name="kh_dienthoai" id="kh_dienthoai"
                                    value="0915659223" readonly=""/>
                            </div>
                            <div class="col-md-12">
                                <label for="kh_email">Email</label>
                                <input type="text" class="form-control" name="kh_email" id="kh_email"
                                    value="phucuong@ctu.edu.vn" readonly=""/>
                            </div>
                            <div class="col-md-12">
                                <label for="kh_ngaysinh">Ngày sinh</label>
                                <input type="text" class="form-control" name="kh_ngaysinh" id="kh_ngaysinh"
                                    value="11/6/1989" readonly=""/>
                            </div>
                            <div class="col-md-12">
                                <label for="kh_cmnd">CMND</label>
                                <input type="text" class="form-control" name="kh_cmnd" id="kh_cmnd" value="362209685"
                                    readonly=""/>
                            </div>
                        </div>

                        <h4 class="mb-3">Hình thức thanh toán</h4>

                        <div class="d-block my-3">
                            <div class="custom-control custom-radio">
                                <input id="httt-1" name="httt_ma" type="radio" class="custom-control-input" required=""
                                    value="1"/>
                                <label class="custom-control-label" for="httt-1">Tiền mặt</label>
                            </div>
                            <div class="custom-control custom-radio">
                                <input id="httt-2" name="httt_ma" type="radio" class="custom-control-input" required=""
                                    value="2"/>
                                <label class="custom-control-label" for="httt-2">Chuyển khoản</label>
                            </div>
                            <div class="custom-control custom-radio">
                                <input id="httt-3" name="httt_ma" type="radio" class="custom-control-input" required=""
                                    value="3"/>
                                <label class="custom-control-label" for="httt-3">Ship COD</label>
                            </div>
                        </div>
                        <hr class="mb-4"/>
                        <button class="btn btn-primary btn-lg btn-block" type="submit" name="btnDatHang">Đặt
                            hàng</button>
                    </div>
                </div>
            </form>

        </div>
     
    </main>

                
           
            <Footer />   
                       </>
    );
}