import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import { toast } from "react-toastify";
import GioHangService from "../../Api/GioHangService";
import ThanhToanService from "../../Api/ThanhToanService";



export default function ListGioHang() {
    const [gioHang, setGioHang] = useState([]);
    const [selectedProductIds, setSelectedProductIds] = useState([]);
    const  navigate=useNavigate();
  
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await GioHangService.getAll();
            const data = response.data;
            setGioHang(data);
        } catch (error) {
            console.log(error);
        }
    };
   const handleCheckboxChange=(id)=>{
    const isSelected=selectedProductIds.includes(id);
    if(!isSelected){
        setSelectedProductIds([...selectedProductIds,id])
    }else{
        setSelectedProductIds(selectedProductIds.filter(productId=>productId));
    }
   };
   const handleThanhToan=()=>{
    console.log("Các sản phẩm được chọn:",selectedProductIds);
    const url=`/thanhtoan/detail/${selectedProductIds}`;
    navigate(url);
   };
    const DeleteDV = (id) => {
        GioHangService.deleteById(id)
            .then((res) => {
                toast.success("Delete thành công");
                fetchData();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <Header />
            <main role="main">
                <div className="container mt-4">
                    <h1 className="text-center">Giỏ hàng</h1>
                    <div className="row">
                        <div className="col col-md-12">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Ảnh đại diện</th>
                                        <th>Tên sản phẩm</th>
                                        <th>Số lượng</th>
                                        <th>Đơn giá</th>
                                        <th>Thành tiền</th>
                                        <th>Chọn</th>
                                        <th>Hành động</th>
                                    </tr>
                                </thead>
                                <tbody id="datarow">
                                    {gioHang.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <img
                                                    src={item.sanPhamCT.hinhAnh.anh}
                                                    className="hinhdaidien"
                                                    style={{ width: "50px", height: "auto" }}
                                                />
                                            </td>
                                            <td>{item.sanPhamCT.tenSanPham}</td>
                                            <td className="text-right">{item.soluong}</td>
                                            <td className="text-right">{item.sanPhamCT.giaSanPham}</td>
                                            <td className="text-right">{item.soluong * item.sanPhamCT.giaSanPham}</td>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    name="selectedProduct"
                                                    onChange={() => handleCheckboxChange(item.id)}
                                                  
                                                />
                                            </td>
                                            <td>
                                                <button
                                                    className="btn btn-danger btn-delete-sanpham"
                                                    onClick={() => DeleteDV(item.id)}
                                                >
                                                    <i className="fa fa-trash" aria-hidden="true"></i> Xóa
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <button className="btn btn-primary btn-md" onClick={handleThanhToan}>
                                <i className="fa fa-shopping-cart" aria-hidden="true"></i> Thanh toán
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
