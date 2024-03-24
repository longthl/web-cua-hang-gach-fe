import React, { useEffect, useState } from "react";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import ShopService from "../../Api/ShopService";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function ListShop() {
    const [shop, setShop] = useState([]);
    const [searchten, setSearchTen] = useState("");
    const [searchgia, setSearchGia] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [searchhang, setSearchHang] = useState("");
   const [id,setId]=useState("");
    useEffect(() => {
        ShopService.getAll()
            .then((response) => {
                setShop(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleSearch = () => {
        if (searchten.trim() === "") {
            setSearchResults([]);
            return;
        }

        ShopService.findByTen(searchten)
            .then((response) => {
                setSearchResults(response.data);
            })
            .catch(() => {
                toast.error("Vui lòng nhập tên");
            });
    };
   const handleSearchId=()=>{
    ShopService.findByid(id).then((response)=>{
        console.log(id);
        setSearchResults(response.data);
    }).catch(()=>{
        toast.error("Khong dung");
    });
   };

    const handleSearchHang = () => {
        if (searchhang.trim() === "") {
            setSearchResults([]);
            return;
        }
        console.log(searchhang)
        ShopService.findByHang(searchhang)
            .then((response) => {
                console.log(response.data);
                setSearchResults(response.data);
            })
            .catch(() => {
                toast.error("Vui lòng chọn");
            });
    };

    const handleSearchGia = () => {
        if (searchgia.trim() === "") {
            setSearchResults([]);
            return;
        }

        ShopService.findByGia(searchgia)
            .then((response) => {
                setSearchResults(response.data);
            })
            .catch(() => {
                toast.error("Vui lòng nhập tên");
            });
    };
    
   
    return (
        <>
            <Header />
            <div className="container-xxl py-5" style={{backgroundColor: "rgba(255,182,193,0.5)",backgroundSize:"cover",backgroundPosition:"center center"}}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="input-group mb-4">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search by name"
                                    value={searchten}
                                    onChange={(e) => setSearchTen(e.target.value)}
                                />
                                <button className="btn btn-outline-secondary" type="button" onClick={handleSearch}>
                                    <i className="fas fa-search"></i>
                                </button>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="input-group mb-4">
                                <select
                                    className="form-control"
                                    value={searchgia}
                                    onChange={(e) => setSearchGia(e.target.value)}
                                    onClick={handleSearchGia}
                                >
                                    <option value="">Giá</option>
                                    {Array.from({ length: 100 }, (_, index) => (
                                        <option key={index + 1} value={(index + 1) * 1000}>
                                            {new Intl.NumberFormat("vi-VN", {
                                                style: "currency",
                                                currency: "VND",
                                            }).format((index + 1) * 10000)}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            {/* Radio buttons for brand filtering */}
                            <div className="mb-4">
                                <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="brand"
                                        id="cmc"
                                        value="CMC"
                                        onChange={(e) => {
                                            setSearchHang(e.target.value);
                                            handleSearchHang();
                                        }}
                                    />
                                    <label className="form-check-label" htmlFor="cmc">
                                        CMC
                                    </label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="brand"
                                        id="datViet"
                                        value="Đất Việt"
                                        onChange={(e) => {
                                            setSearchHang(e.target.value);
                                            handleSearchHang();
                                        }}
                                    />
                                    <label className="form-check-label" htmlFor="datViet">
                                        Đất Việt
                                    </label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="brand"
                                        id="haLong"
                                        value="Hạ Long"
                                        onChange={(e) => {
                                            setSearchHang(e.target.value);
                                            handleSearchHang();
                                        }}
                                    />
                                    <label className="form-check-label" htmlFor="haLong">
                                        Hạ Long
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                            <h6 className="text-primary text-uppercase"></h6>
                            <h1 className="mb-5">Danh Sách Sản Phẩm</h1>
                        </div>
                        <div className="row g-4">
                            {(searchResults.length > 0 ? searchResults : shop).map((item, index) => (
                                <div
                                    key={index}
                                    className="col-lg-3 col-md-6 wow fadeInUp"
                                    data-wow-delay="0.1s"
                                >
                                    <div className="team-item">
                                        <div className="position-relative overflow-hidden">
                                            <img
                                                className="img-fluid start-0 top-0 w-100 h-100"
                                                src={item.hinhAnh?.anh}
                                                alt=""
                                            />
                                            <div className="team-overlay position-absolute start-0 top-0 w-100 h-100">
                                                <Link className="btn btn-square mx-1" to={`/shop/detail/${item.id}`}>
                                                    <i className="fab fa-facebook-f" />
                                                </Link>
                                                <a className="btn btn-square mx-1" href="">
                                                    <i className="fab fa-twitter" />
                                                </a>
                                                <a className="btn btn-square mx-1" href="">
                                                    <i className="fab fa-instagram" />
                                                </a>
                                            </div>
                                        </div>
                                        <div className="bg-light text-center p-4">
                                            <h5 className="fw-bold mb-0">{item.tenSanPham}</h5>
                                            <div style={{ margin: "10px 0", fontSize: "14px" }}>
                                                <span style={{ fontWeight: "bold" }}>Màu Sắc:</span> {item.mauSac?.ten}
                                            </div>
                                            <div style={{ marginBottom: "5px", fontSize: "14px" }}>
                                                <span style={{ fontWeight: "bold" }}>Hãng:</span> {item.hang?.ten}
                                            </div>
                                            <div style={{ fontSize: "14px" }}>
                                                <span style={{ fontWeight: "bold" }}>Giá:</span> {item.giaSanPham}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
