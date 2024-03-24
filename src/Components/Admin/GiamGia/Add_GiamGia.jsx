import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Layout/Sidebar";
import GiamGiaService from "../../../Api/GiamGiaService";
import { toast } from "react-toastify";
const AddGiamGia=()=>{
    const [ma,setMa]=useState('');
    const [donHang,setDonHangToiThieu]=useState('');
    const [soTienGiam,setSoTienGiam]=useState('');
    const [ngayTao,setNgayTao]=useState('');
    const [ngaySua,setNgaySua]=useState('');
    const [ngaySuaDisabled,setNgaySuaDisabled]=useState(true);
    const saveGiamGia=(event)=>{
        event.preventDefault();
        let giamgia={
            ma:ma,
            donHang:donHang,
            soTienGiam:soTienGiam,
            ngayTao:ngayTao,
            ngaySua:ngaySua,
        
        };
        const confix=window.confirm("Bạn chắc chắn muốn thêm")
        if(confix){
            console.log('giamgia=>'+JSON.stringify(giamgia));
            GiamGiaService.creategiamgia(giamgia).then((res)=>{
                alert('Save Successful');
                window.location.href='/giamgia/index';
            }).catch((error)=>{
                if(error && error.response && error.response.data){
                    toast(error.response.data);
                }
            });
        };
    }
    const changeMa=(event)=>{
        setMa(event.target.value);
    }
    const changeDonToiThieu=(event)=>{
        setDonHangToiThieu(event.target.value);
    };
    const changeSoTienGiam=(event)=>{
        setSoTienGiam(event.target.value);
    }
    const changeNgayTao=(event)=>{
        const newngaytao=event.target.value;
        setNgayTao(newngaytao);
        setNgaySuaDisabled(false);
    }
    const changeNgaySua=(event)=>{
        const newNgaySua=event.target.value;
        if(newNgaySua<ngayTao){
            toast.error("Ngày sửa phải sau hoặc bằng ngày bắt đầu");
        }
        setNgaySua(newNgaySua);
    };
    return (
        <>
          <Sidebar />
            <section id="content">
                <main className="container">
                    <div className="table-data">
                        <div className="order">
                            <div className="head">
                                <h3>Thêm Giảm Giá</h3>
                            </div>
                            <form onSubmit={saveGiamGia}>
                                <div className=" row col-md-6 offset-md-3">
                                <div className="md-3">
                                        <label className="form-label">
                                            Mã
                                        </label>
                                        <input className="form-control" type="text" name="ma" value={ma}
                                            onChange={changeMa} />
                                    </div>
                                    <div className="md-3">
                                        <label className="form-label">
                                            Đơn Tối Thiểu
                                        </label>
                                        <input className="form-control" type="text" name="donHang" value={donHang}
                                            onChange={changeDonToiThieu} />
                                    </div>
                                    
                                    <div className="md-3">
                                        <label className="form-label">
                                            Số Tiền Giảm
                                        </label>
                                        <input className="form-control" type="text" name="soTienGiam" value={soTienGiam}
                                            onChange={changeSoTienGiam} />
                                    </div>

                                    <div className="md-3">
                                        <label className="form-label">
                                            Ngày Bắt Đầu
                                        </label>
                                        <input className="form-control" type="date" name="ngayTao" value={ngayTao}
                                            onChange={changeNgayTao} />
                                    </div>

                                    <div className="md-3">
                                        <label className="form-label">
                                            Ngày Kết Thúc
                                        </label>
                                        <input className="form-control" type="date" name="ngaySua" value={ngaySua}
                                            onChange={changeNgaySua}
                                            disabled={ngaySuaDisabled} />
                                            
                                    </div>
                                    
                                    <div className=" row mt-3 form-outline form-white mb-2">
                                        <div className="col-6">
                                            <button
                                                type="submit"
                                                onClick={saveGiamGia}
                                                className="btn btn-secondary form-control"
                                            >
                                                ADD
                                            </button>
                                        </div>
                                        <div className="col-6">
                                            <Link
                                                to="/nhanvien/index"
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
export default AddGiamGia;