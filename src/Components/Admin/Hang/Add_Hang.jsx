import React,{useEffect,useState} from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Layout/Sidebar";
import HangService from "../../../Api/HangService";
import { toast } from "react-toastify";
const AddHang=()=>{
    const[ten,setTen]=useState('');
    const[soLuong,setSoLuong]=useState('');
    const[ngayTao,setNgayTao]=useState('');
    const[ngaySua,setNgaySua]=useState('');
    const[trangThai,setTrangThai]=useState('');
    const saveHang=(event)=>{
        event.preventDefault();
        let hang={
            ten:ten,
            ngayTao:ngayTao,
            ngaySua:ngaySua,
            trangThai:trangThai
        };
        const confix=window.confirm("Bạn Chắc chắn muốn thêm")
        if(confix){
            console.log('hang=>'+JSON.stringify(hang));
            HangService.createhang(hang).then((res)=>{
                alert('Save Successful');
                window.location.href='/hang/index';
            }).catch((error)=>{
                if(error && error.response && error.response.data){
                    toast(error.response.data);
                }
            });
        };
    }
    const changeTen=(event)=>{
        setTen(event.target.value);
    };
    
    return(
        <>
        <Sidebar/>
        <section id="content">
            <main className="container">
                <div className="table-data">
                    <div className="order">
                        <div className="head">
                            <h3>Thêm Chất Liệu</h3>
                        </div>
                        <form onSubmit={saveHang}>
                            <div className="row col-md-6 offset-md-3">
                                <div className="md-3">
                                    <label className="form-label">
                                       Tên
                                    </label>
                                    <input type="text" className="form-control" name="ten" value={ten} onChange={changeTen} />
                                </div>
                            
                            
                                <div className="row mt-3 form-outline form-white mb-2">
                                    <div className="col-6">
                                        <button type="submit" onClick={saveHang} className="btn btn-secondary form-control">
                                            ADD
                                        </button>
                                    </div>
                                    <div className="col-6">
                                        <Link to="/hang/index" className="btn btn-danger form-control">Cancel</Link>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </section>

        </>
    )
}
export default AddHang;