import { Routes, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Home_Page from "./Components/Home/Home_Page";
import Service from "./Components/Home/Service";
import About from "./Components/Home/About";
import Booking from "./Components/Home/Booking";
import Contact from "./Components/Home/Contact";
import Login from "./Components/Account/Login";
import Register from "./Components/Account/Register";
import Sidebar from "./Components/Admin/Layout/Sidebar";
import Sidebarnv from "./Components/Staff/Layout/Sidebarnv" 
import { APP_ROUTERS } from './constants';
import ListChucVu from "./Components/Admin/ChucVu/ListChucVu";
import ListNhaCC from "./Components/Admin/NhaCC/ListNhaCC";
import ListPhuKien from "./Components/Admin/PhuKien/ListPhuKien";
import Add_PhuKien from "./Components/Admin/PhuKien/Add_phukien";
import UpdatePhuKien from "./Components/Admin/PhuKien/UpdatePhuKien";
import ListNhanVien from "./Components/Admin/NhanVien/ListNhanVien";
import Add_nhanvien from "./Components/Admin/NhanVien/Add_nhanvien";
import UpdateNhanVien from "./Components/Admin/NhanVien/UpdateNhanVien";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ListMauXe from "./Components/Admin/MauXe/ListMauXe";
import AddMauXe from "./Components/Admin/MauXe/Add_MauXe";
import ListChiTietPT from "./Components/Admin/ChiTietPhuTung/ListTietPhuTung";
import AddChiTietPT from "./Components/Admin/ChiTietPhuTung/Add_ChiTietPhuTung";
import ListXemLich from "./Components/Staff/XemLich/ListXemLich";
import AddChucVu from "./Components/Admin/ChucVu/Add_ChucVu";
import ListKichThuoc from "./Components/Admin/KichThuoc/ListKichThuoc";
import AddKichThuoc from "./Components/Admin/KichThuoc/Add_KichThuoc";
import ListChatLieu from "./Components/Admin/ChatLieu/ListChatLieu";
import AddChatLieu from "./Components/Admin/ChatLieu/Add_ChatLieu";
import AddGiamGia from "./Components/Admin/GiamGia/Add_GiamGia";
import ListGiamGia from "./Components/Admin/GiamGia/ListGiamGia";
import AddKhachHang from "./Components/Admin/KhachHang/Add_KhachHang";
import ListKhachHang from "./Components/Admin/KhachHang/ListKhachHang";
import ListHinhAnh from "./Components/Admin/HinhAnh/ListHinhAnh";
import Add_HinhAnh from "./Components/Admin/HinhAnh/Add_HinhAnh"; 
import ListSanPham from "./Components/Admin/SanPham/ListSanPham";
import AddSanPham from "./Components/Admin/SanPham/Add_SanPham";
import ListMauSac from "./Components/Admin/MauSac/ListMauSac";
import AddMauSac from "./Components/Admin/MauSac/Add_MauSac";
import ListHang from "./Components/Admin/Hang/ListHang";
import AddHang from "./Components/Admin/Hang/Add_Hang";
import ListDiaChi from "./Components/Admin/DiaChi/ListDiaChi";
import AddDiaChi from "./Components/Admin/DiaChi/Add_DiaChi";
import ListShop from "./Components/Home/Shop";
import ListDetail from "./Components/Home/Detail";
import ListGioHang from "./Components/Home/GioHang";
import ListThanhToan from "./Components/Home/ThanhToan";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/" excact element={<Home_Page />}></Route>
        <Route path="/home" element={<Home_Page />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/service" element={<Service />}></Route>
        <Route path="/booking" element={<Booking />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/Admin" element={<Sidebar />}></Route>
        <Route path="/Staff" element={<Sidebarnv/>}></Route>   
        <Route path="/Admin" element={<Sidebar />}></Route>
        <Route path={APP_ROUTERS.THANHTOAN.INDEX.VALUE} element={<ListThanhToan/>}></Route>
        <Route path={APP_ROUTERS.GIOHANG.INDEX.VALUE} element={<ListGioHang/>}></Route>
        <Route path={APP_ROUTERS.SHOP.GETBYID.VALUE} element={<ListDetail/>}></Route>
        <Route path={APP_ROUTERS.SHOP.INDEX.VALUE} element={<ListShop/>}></Route>
        <Route path={APP_ROUTERS.SANPHAM.INDEX.VALUE} element={<ListSanPham/>}></Route>
        <Route path={APP_ROUTERS.SANPHAM.ADD.VALUE} element={<AddSanPham/>}></Route>
        <Route path={APP_ROUTERS.DIACHI.INDEX.VALUE} element={<ListDiaChi/>}></Route>
        <Route path={APP_ROUTERS.DIACHI.ADD.VALUE} element={<AddDiaChi/>}></Route>
        <Route path={APP_ROUTERS.HANG.INDEX.VALUE} element={<ListHang/>}></Route>
        <Route path={APP_ROUTERS.HANG.ADD.VALUE} element={<AddHang/>}></Route>
        <Route path={APP_ROUTERS.MAUSAC.INDEX.VALUE} element={<ListMauSac/>}></Route>
        <Route path={APP_ROUTERS.MAUSAC.ADD.VALUE} element={<AddMauSac/>}></Route>
        <Route path={APP_ROUTERS.GIAMGIA.INDEX.VALUE} element={<ListGiamGia/>}></Route>
        <Route path={APP_ROUTERS.GIAMGIA.ADD.VALUE} element={<AddGiamGia/>}></Route>
        <Route path={APP_ROUTERS.HINHANH.INDEX.VALUE} element={<ListHinhAnh/>}></Route>
        <Route path={APP_ROUTERS.HINHANH.ADD.VALUE} element={<Add_HinhAnh/>}></Route>
        <Route path={APP_ROUTERS.KHACHHANG.INDEX.VALUE} element={<ListKhachHang/>}></Route>
        <Route path={APP_ROUTERS.KHACHHANG.ADD.VALUE} element={<AddKhachHang/>}></Route>
        <Route path={APP_ROUTERS.KICHTHUOC.INDEX.VALUE} element={<ListKichThuoc/>}></Route>
        <Route path={APP_ROUTERS.KICHTHUOC.ADD.VALUE} element={<AddKichThuoc/>}></Route>
        <Route path={APP_ROUTERS.CHATLIEU.INDEX.VALUE} element={<ListChatLieu/>}></Route>
        <Route path={APP_ROUTERS.CHATLIEU.ADD.VALUE} element={<AddChatLieu/>}></Route>
        <Route path={APP_ROUTERS.CHUCVU.INDEX.VALUE} element={<ListChucVu />}></Route>
        <Route path={APP_ROUTERS.CHUCVU.ADD.VALUE} element={<AddChucVu />}></Route>
        <Route path={APP_ROUTERS.NHANVIEN.INDEX.VALUE} element={<ListNhanVien />}></Route>
        <Route path={APP_ROUTERS.NHANVIEN.ADD.VALUE} element={<Add_nhanvien />}></Route>
        <Route path={APP_ROUTERS.NHANVIEN.UPDATE.VALUE} element={<UpdateNhanVien />}></Route>
        <Route path={APP_ROUTERS.NHANVIEN.INDEX.VALUE} element={<ListNhaCC />}></Route>
        <Route path={APP_ROUTERS.PHUKIEN.INDEX.VALUE} element={<ListPhuKien />}></Route>
        <Route path={APP_ROUTERS.PHUKIEN.ADD.VALUE} element={<Add_PhuKien />}></Route>
        <Route path={APP_ROUTERS.PHUKIEN.UPDATE.VALUE} element={<UpdatePhuKien />}></Route>
        <Route path={APP_ROUTERS.MAUXE.INDEX.VALUE} element={<ListMauXe />}></Route>
        <Route path={APP_ROUTERS.MAUXE.ADD.VALUE} element={<AddMauXe />}></Route>
        <Route path={APP_ROUTERS.CHITIETPT.INDEX.VALUE} element={<ListChiTietPT />}></Route>
        <Route path={APP_ROUTERS.CHITIETPT.ADD.VALUE} element={<AddChiTietPT />}></Route>
        <Route path={APP_ROUTERS.XEMLICH.INDEX.VALUE} element={<ListXemLich/>}></Route>
      </Routes>
      <ToastContainer/>
    </div>
  );
}
export default App;
