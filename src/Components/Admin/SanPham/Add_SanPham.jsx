import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../Layout/Sidebar';
import SanPhamService from '../../../Api/SanPhamService';
import { toast } from 'react-toastify';
import MauSacService from '../../../Api/MauSacService';
import HinhAnhService from '../../../Api/HinhAnhService';
import KichThuocService from '../../../Api/KichThuocService';
import ChatLieuService from '../../../Api/ChatLieuService';
import HangService from '../../../Api/HangService';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const AddSanPham = () => {
    const [tenSanPham, setTenSanPham] = useState('');
    const [mauSac, setMauSac] = useState([]);
    const [hinhAnh, setHinhAnh] = useState([]);
    const [kichThuoc, setKichThuoc] = useState([]);
    const [hang, setHang] = useState([]);
    const [chatLieu, setChatLieu] = useState([]);
    const [giaSanPham, setGiaSanPham] = useState('');
    const [soLuong, setSoLuong] = useState('');
    const [moTa,setMoTa]=useState('');
    const [selectedMauSac, setSelectedMauSac] = useState(null);
    const [selectedHinhAnh, setSelectedHinhAnh] = useState(null);
    const [selectedKichThuoc, setSelectedKichThuoc] = useState(null);
    const [selectedHang, setSelectedHang] = useState(null);
    const [selectedChatLieu, setSelectedChatLieu] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [showHinhAnh, setShowHinhAnh] = useState(false);
    const [showConfrimHinhAnh, setshowConfrimHinhAnh] = useState(false);
    const [show, setShow] = useState(false);
    const [getid, setid] = useState('');

    const handleImageSelect = (image) => {
        if (selectedImage === image) {
            // If the clicked image is already selected, deselect it
            setSelectedImage(null);
            setSelectedHinhAnh(null); // Clear the selected image ID
        } else {
            // Otherwise, select the clicked image
            setSelectedImage(image);
            setSelectedHinhAnh(image.id); // Set the selected image ID
        }
        setShow(false); // Close the modal after selecting or deselecting an image
    };
    
    const handleClose = () => {
        setShow(false);
    };

    const handleShow = (id) => {
        setid(id);
        setShow(true);
    };

    const saveSanPham = (event) => {
        event.preventDefault();
        let newsanpham = {
            tenSanPham: tenSanPham,
            moTa:moTa,
            mauSac: { id: selectedMauSac },
            hinhAnh: { id: selectedHinhAnh },
            kichThuoc: { id: selectedKichThuoc },
            hang: { id: selectedHang },
            chatLieu: { id: selectedChatLieu },
            giaSanPham: giaSanPham,
            soLuong: soLuong,
        };

        const confirmResult = window.confirm('Bạn có chắc chắn thêm');
        if (confirmResult) {
            console.log(newsanpham)
            SanPhamService.createsanpham(newsanpham)
                .then((res) => {
                    console.log(newsanpham.chatLieu.ten);
                    alert('Save Successful');
                    window.location.href = '/sanpham/index';
                })
                .catch((error) => {
                    if (error && error.response && error.response.data) {
                        toast(error.response.data);
                    }
                });
        }
    };

    useEffect(() => {
        MauSacService.getAll()
            .then((response) => {
                setMauSac(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        HinhAnhService.getAll()
            .then((response) => {
                setHinhAnh(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        KichThuocService.getAll()
            .then((response) => {
                setKichThuoc(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        ChatLieuService.getAll()
            .then((response) => {
                setChatLieu(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        HangService.getAll()
            .then((response) => {
                setHang(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    const changeTenSanPham=(event)=>{
        setTenSanPham(event.target.value);
    }

    const changeHang = (event) => {
        setSelectedHang(event.target.value);
    };

    const changeMauSac = (event) => {
        setSelectedMauSac(event.target.value);
    };

    const changeKichThuoc = (event) => {
        setSelectedKichThuoc(event.target.value);
    };

    const changeHinhAnh = (event) => {
        setSelectedHinhAnh(event.target.value);
    };

    const changeChaLieu = (event) => {
        setSelectedChatLieu(event.target.value);
    };

    const changeGiaSanPham = (event) => {
        setGiaSanPham(event.target.value);
    };

    const changeSoLuong = (event) => {
        setSoLuong(event.target.value);
    };

    const changeMoTa = (event) => {
        setMoTa(event.target.value);
    };


    return (
        <>
            <Sidebar />
            <section id="content">
                <main className="container">
                    <div className="table-data">
                        <div className="order">
                            <div className="head">
                                <h3>Thêm Sản Phẩm</h3>
                            </div>
                            <form onSubmit={saveSanPham}>
                                <div className="row col-md-6 offset-md-3">
                                <div className="md-3">
                                        <label className="form-label">Tên Sản Phẩm</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="tenSanPham"
                                            value={tenSanPham}
                                            onChange={changeTenSanPham}
                                        />
                                    </div>
                                    <div className="md-3">
                                        <label>Màu Sắc</label>
                                        <select
                                            className="form-select"
                                            aria-label="Default select example"
                                            name="mauSac"
                                            value={selectedMauSac || ''}
                                            onChange={changeMauSac}
                                        >
                                            <option value="">Select Màu Sắc</option>
                                            {mauSac.map((ms) => (
                                                <option key={ms.id} value={ms.id}>
                                                    {ms.ten}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="md-3">
                                        <label className="form-label">Hình Ảnh</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="hinhAnh"
                                            value={hinhAnh}
                                            onChange={changeHinhAnh}
                                        />
                                    </div>
                                    <a className="btn btn-success" onClick={() => handleShow('your_image_id')}>
                                        +
                                    </a>
                                    <div className="md-3">
                                        <label>Hạng</label>
                                        <select
                                            className="form-select"
                                            aria-label="Default select example"
                                            name="hang"
                                            value={selectedHang || ''}
                                            onChange={changeHang}
                                        >
                                            <option value="">Select Hạng</option>
                                            {hang.map((ha) => (
                                                <option key={ha.id} value={ha.id}>
                                                    {ha.ten}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="md-3">
                                        <label>Kích Thước</label>
                                        <select
                                            className="form-select"
                                            aria-label="Default select example"
                                            name="kichThuoc"
                                            value={selectedKichThuoc || ''}
                                            onChange={changeKichThuoc}
                                        >
                                            <option value="">Select Kích Thước</option>
                                            {kichThuoc.map((kt) => (
                                                <option key={kt.id} value={kt.id}>
                                                    {kt.chieuDai}X{kt.chieuRong}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="md-3">
                                        <label>Chat Lieu</label>
                                        <select
                                            className="form-select"
                                            aria-label="Default select example"
                                            name="chatLieu"
                                            value={selectedChatLieu || ''}
                                            onChange={changeChaLieu}
                                        >
                                            <option value="">Select Chất Liệu</option>
                                            {chatLieu.map((cl) => (
                                                <option key={cl.id} value={cl.id}>
                                                    {cl.ten}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="md-3">
                                        <label className="form-label">Mô Tả</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="moTa"
                                            value={moTa}
                                            onChange={changeMoTa}
                                        />
                                    </div>

                                    <div className="md-3">
                                        <label className="form-label">Mô Tả</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="giaSanPham"
                                            value={giaSanPham}
                                            onChange={changeGiaSanPham}
                                        />
                                    </div>
                                    <div className="md-3">
                                        <label className="form-label">Số Lượng</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="soLuong"
                                            value={soLuong}
                                            onChange={changeSoLuong}
                                        />
                                    </div>

                                    <div className="row mt-3 form-outline form-white mb-2">
                                        <div className="col-6">
                                            <button
                                                type="submit"
                                                onClick={saveSanPham}
                                                className="btn btn-secondary form-control"
                                            >
                                                ADD
                                            </button>
                                        </div>
                                        <div className="col-6">
                                            <Link to="/sanpham/index" className="btn btn-danger form-control">
                                                Cancel
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Danh Sách</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Ảnh</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(hinhAnh) && hinhAnh.length > 0 ? (
                                    hinhAnh.map((image, index) => (
                                        <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>
                                                <img
                                                    src={image.anh}
                                                    style={{ width: '50px', height: '50px' }}
                                                    alt={`Image ${index}`}
                                                    onClick={() => handleImageSelect(image)}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="radio"
                                                    checked={selectedImage === image}
                                                    onChange={() => handleImageSelect(image)}
                                                />
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3">No images available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            thoát
                        </Button>
                    </Modal.Footer>
                </Modal>
            </section>
        </>
    );
};

export default AddSanPham;