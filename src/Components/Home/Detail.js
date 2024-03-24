import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import ShopService from "../../Api/ShopService";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import MauSacService from "../../Api/MauSacService";
import KichThuocService from "../../Api/KichThuocService";
import GioHangService from "../../Api/GioHangService";
export default function ListDetail() {
    const [item, setItem] = useState(null)
    const { id } = useParams();
    const [mauSac, setMauSac] = useState([]);
    const [selectedMauSac, setSelectedMauSac] = useState(null)
    const [kichThuoc, setKichThuoc] = useState([])
    const [selectedKichThuoc, setSelectedKichThuoc] = useState(null)
    const [idSanPham,setIdSanPham]=useState("");
    const [idKhachHang,setIdKhachHang]=useState("");
    const [soluong,setSoLuong]=useState(1);
    const [ngayTao,setNgayTao]=useState("");
    const [ngaySua,setNgaySua]=useState("");
    const [search,setSearch]=useState("");
    // const timkiem= async()=>{
    //     try {
    //         const response = await ShopService.findByid(item.id);
    //         setSearch(response.data);
    //         console.log(response.data);
          
    //     } catch (error) {
    //         console.error("Error searching:", error);
    //         // Xử lý lỗi nếu cần
    //     }
    // }
   useEffect(()=>{
    const fetchData=async()=>{
    try{
        const response =await ShopService.findByid(id);
        setSearch(response.data);
    }catch(error){
     console.error('Error fetching data:',error);
    }
    };
    fetchData();
   },[id]);
   useEffect(()=>{
    const fetchData=async()=>{
    try{
        const response=await KichThuocService.getById(kichThuoc.id);
        setKichThuoc(response.data);
    }catch(error){
        console.error('Error fetching data:',error);
    }
    };
    fetchData();
   },[kichThuoc.id]);
    const saveGioHang = async (event) => {
        event.preventDefault();
                let giohang = {
                    sanPhamCT: search,
                    idKhachHang: idKhachHang,
                    soluong: soluong,
                    ngayTao: ngayTao,
                    ngaySua: ngaySua
                };
                const confix = window.confirm("Bạn chắc chắn muốn thêm");
                if (confix) {
                    console.log('giohang =>' + JSON.stringify(giohang));
                  console.log(giohang.soluong);
                    GioHangService.create1(giohang).then(res => {
                        alert('Save Successful');
                        console.log(giohang);
                      
                    }).catch(error => {
                        if (error && error.response && error.response.data) {
                            toast(error.response.data);
                        }
                    });
                }
    };
   const changeIdSanPham=(event)=>{
    setIdSanPham(event.target.value);
   }
   const changeSoLuong=(event)=>{
    setSoLuong(event.target.value);
   }
    useEffect(() => {
        MauSacService.getAll().then((response) => {
            setMauSac(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }, [])
    useEffect(() => {
        KichThuocService.getAll().then((response) => {
            setKichThuoc(response.data);
            console.log(response.data);
        }).catch((error) => {
            console.log(error)
        });
    }, [])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ShopService.findByid(id);
                setItem(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [id]);
    return (
        <>
            <Header />
            <main role="main">

                {/* Block content - Đục lỗ trên giao diện bố cục chung, đặt tên là `content` */}
                <div className="container mt-4">
                    <div id="thongbao" className="alert alert-danger d-none face" role="alert">
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    {item && (
                        <div className="card">
                            <div className="container-fliud">

                                <form
                                   
                                    onSubmit={saveGioHang}
                                >
                                    <input type="hidden" name="sp_ma" id="sp_ma" value="5" />
                                    <input type="hidden" name="sp_ten" id="sp_ten" value="Samsung Galaxy Tab 10.1 3G 16G" />
                                    <input type="hidden" name="sp_gia" id="sp_gia" value="10990000.00" />
                                    <input type="hidden" name="hinhdaidien" id="hinhdaidien" value="samsung-galaxy-tab-10.jpg" />
                                    <input type="hidden" name="idSanPham"  value={item.id}/> 
                                       
                                    <div class="wrapper row" >
                                        <div class="preview col-md-6">
                                            <div class="preview-pic tab-content">
                                                <div class="tab-pane" id="pic-1">
                                                    <img src={item.hinhAnh?.anh} style={{ width: '200px', height: '200px' }} />
                                                </div>
                                                <div class="tab-pane" id="pic-2">
                                                    <img src={item.hinhAnh?.anh} style={{ width: '200px', height: '200px' }} />
                                                </div>
                                                <div class="tab-pane active" id="pic-3">
                                                    <img src={item.hinhAnh?.anh} style={{ width: '500px', height: '400px' }} />
                                                </div>
                                            </div>
                                            {/* <ul class="preview-thumbnail nav nav-tabs">
                                    <li class="active">
                                        <a data-target="#pic-1" data-toggle="tab" class="">
                                            <img src={item.hinhAnh?.anh}/>
                                        </a>
                                    </li>
                                    <li class="">
                                        <a data-target="#pic-2" data-toggle="tab" class="">
                                            <img src={item.hinhAnh?.anh}/>
                                        </a>
                                    </li>
                                    <li class="">
                                        <a data-target="#pic-3" data-toggle="tab" class="active">
                                            <img src={item.hinhAnh?.anh}/>
                                        </a>
                                    </li>
                                </ul> */}
                                        </div>
                                        <div class="details col-md-6">
                                            <h3 class="product-title">{item.tenSanPham}</h3>
                                            <div class="rating">
                                                <div class="stars">
                                                    <span class="fa fa-star checked"></span>
                                                    <span class="fa fa-star checked"></span>
                                                    <span class="fa fa-star checked"></span>
                                                    <span class="fa fa-star"></span>
                                                    <span class="fa fa-star"></span>
                                                </div>
                                                <span class="review-no">999 reviews</span>
                                            </div>
                                            <p class="product-description">Kích Thước Viên Gạch: {item.kichThuoc?.chieuDai} X {item.kichThuoc?.chieuRong}</p>
                                            <small class="text-muted">Giá cũ: <s><span>10,990,000.00 vnđ</span></s></small>
                                            <h4 class="price">Giá hiện tại: <span>{item.giaSanPham} vnđ</span></h4>
                                            <p class="vote"><strong>100%</strong> hàng <strong>Chất lượng</strong>, đảm bảo
                                                <strong>Uy
                                                    tín</strong>!</p>
                                            <h5 class="sizes">sizes:
                            
                                                {kichThuoc.map((k) => (
                                                    <label key={k.id}  >
                                                        <input type="radio" value={k.id}/>
                                                        {k.chieuDai} X {k.chieuRong}
                                                    </label>
                                                ))}
                                            </h5>
                                            <h5 class="colors">colors:
                                                <span class="color orange not-available" data-toggle="tooltip"
                                                    title="Hết hàng"></span>
                                                {/* <span class="color green"></span>
                                                <span class="color blue"></span> */}
                                                {mauSac.map((ms) => (
                                                    <label key={ms.id}>
                                                        <input type="radio" value={ms.id} />
                                                        {ms.ten}
                                                    </label>
                                                ))}
                                            </h5>
                                            
                                            <div class="form-group">
                                                <label >Số lượng đặt mua:</label>
                                                <input type="number" class="form-control" id="soluong" name="soluong" value={soluong} onChange={changeSoLuong}/>
                                            </div>
                                            <div class="action">
                                                <button class="add-to-cart btn btn-default" type="submit" onClick={saveGioHang}>Thêm vào giỏ hàng</button>
                                                <a class="like btn btn-default" href="#"><span class="fa fa-heart"></span></a>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="card">
                                <div className="container-fluid">
                                    <h3>Thông tin chi tiết về Sản phẩm</h3>
                                    <div className="row">
                                        <div className="col">Chất liệu: {item.chatLieu?.ten}, Hãng: {item.hang?.ten}</div>
                                    </div>
                                </div></div>

                        </div>


                    )}

                  
                </div>
                {/* End block content */}
            </main>

            <Footer />
        </>
    );
}