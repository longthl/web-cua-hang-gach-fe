import React,{useState} from "react";
import {Link} from 'react-router-dom';
import Sidebar from '../Layout/Sidebar';
import MauSacService from "../../../Api/MauSacService";
import { toast } from "react-toastify";

const Add_MauSac=()=>{
    const [ten,setTen]=useState('');
    const [soLuong,setSoLuong]=useState('');
    const [ngayTao,SetNgayTao]=useState('');
    const [ngaySua,SetNgaySua]=useState('');

    const saveMauSac =(event)=>{
        event.preventDefault();
        let mausac={
            ten:ten,
            soLuong:soLuong,
            ngayTao:ngayTao,
            ngaySua:ngaySua
        }
        const confix=window.confirm("Bạn Chắc chắn muốn thêm")
        if(confix){
            console.log('mausac =>'+JSON.stringify(mausac));

            MauSacService.createmausac(mausac).then(res =>{
                alert('Save Successful');
                window.location.href="/mausac/index";
            }).catch(error =>{
                if(error && error.response && error.response.data){
                    toast(error.response.data);
                }
            });

        }
    }
    const changeTen =(event)=>{
        setTen(event.target.value);
    }
    const changeSoLuong=(event)=>{
        setSoLuong(event.target.value);
    }
    return (
        <>
        <Sidebar />
      <div>
     
          <section id="content">
              <main className="container">
                  <div className="table-data">
                      <div className="order">
                          <div className="head">
                              <h3>Thêm Màu Sắc</h3>
                          </div>
                          <form onSubmit={saveMauSac}>
                              <div className=" row col-md-6 offset-md-3">
                            
                                    
                                  <div className="md-3">
                                      <label className="form-label">
                                          Tên 
                                      </label>
                                      <input className="form-control" type="text" name="ten" value={ten}
                                          onChange={changeTen} />
                                  </div>
                                 
                                  <div className="md-3">
                                      <label className="form-label">
                                         Số Lượng
                                      </label>
                                      <input className="form-control" type="text" name="soLuong" value={soLuong}
                                          onChange={changeSoLuong} />
                                  </div>
                                  <div className=" row mt-3 form-outline form-white mb-2">
                                      <div className="col-6">
                                          <button
                                              type="submit"
                                              onClick={saveMauSac}
                                              className="btn btn-secondary form-control"
                                          >
                                              ADD
                                          </button>
                                      </div>
                                      <div className="col-6">
                                          <Link
                                              to="/mausac/index"
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
          </div>
          
      </>
    )
}
export default Add_MauSac;