import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Layout/Sidebar";
import KichThuocService from "../../../Api/KichThuocService";
import { toast } from "react-toastify";

const AddKichThuoc =()=>{
    const [chieuDai,setChieuDai]=useState('');
    const [chieuRong,setChieuRong]=useState('');
    const [soLuong,setSoLuong]=useState('');
    const [trangThai,setTrangThai]=useState('');
    const saveKichThuoc=(event)=>{
        event.preventDefault();
        let kichthuoc={
            chieuDai:chieuDai,
            chieuRong:chieuRong,
            soLuong:soLuong,
            trangThai:trangThai
        };
        const confix=window.confirm("Bạn chắc chắn muốn thêm")
        if(confix){
            console.log('kichthuoc =>'+JSON.stringify(kichthuoc));
            KichThuocService.creatkichthuoc(kichthuoc)
            .then((res)=>{
                alert("Save Successful");
                window.location.href='/kichthuoc/index';
            })
            .catch((error)=>{
                if(error && error.response && error.response.data){
                    toast(error.response.data);
                }
            });
        };
    }
    const changeDai=(event)=>{
        setChieuDai(event.target.value);
    };
    const changeRong=(event)=>{
        setChieuRong(event.target.value);
    }
    const changeSoLuong=(event)=>{
        setSoLuong(event.target.value);
    }
   
    return(
        <>
        <Sidebar/>
        <section id="content">
            <main className="container">
                <div className="table-data">
                    <div className="order">
                        <div className="head">
                            <h3>Thêm Kích Thước</h3>
                        </div>
                        <form onSubmit={saveKichThuoc}>
                            <div className="row col-md-6 offset-md-3">
                                <div className="md-3">
                                    <label className="form-label">
                                        Chiều Dài
                                    </label>
                                    <input type="text" className="form-control" name="chieuDai" value={chieuDai} onChange={changeDai} />
                                </div>
                                <div className="md-3">
                                    <label className="form-label">
                                        Chiều Rộng
                                    </label>
                                    <input type="text" className="form-control" name="chieuRong" value={chieuRong} onChange={changeRong} />
                                </div>
                                <div className="md-3">
                                    <label className="form-label">
                                       Số lượng
                                    </label>
                                    <input type="text" className="form-control" name="soLuong" value={soLuong} onChange={changeSoLuong} />
                                </div>
                                <div className="row mt-3 form-outline form-white mb-2">
                                    <div className="col-6">
                                        <button type="submit" onClick={saveKichThuoc} className="btn btn-secondary form-control">
                                            ADD
                                        </button>
                                    </div>
                                    <div className="col-6">
                                        <Link to="/kichthuoc/index" className="btn btn-danger form-control">Cancel</Link>
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
export default AddKichThuoc;