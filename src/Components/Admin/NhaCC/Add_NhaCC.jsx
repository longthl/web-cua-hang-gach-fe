import React, { Component, useEffect, useState } from 'react';

import { Link } from 'react-router-dom'
import PhuKienService from '../../../Api/PhuKienService';
import NhaCungCapService from '../../../Api/NhaCungCapService';
import Sidebar from '../Layout/Sidebar';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";
import { toast } from 'react-toastify';
import { apiGetPublicDistrict, apiGetPublicProvinces } from '../../../Api/NhanVienService';
import SelectAddress from '../NhanVien/SelectAddress';


const modal_styles={
    position:'fixed',
    top:'50%',
    left:'50%',
    transform:'translate(-50%,-50%)',
    backgroundColor:'#FFF',
    padding:'50%',
    zIndex:1000
}
const onvrlay_style={
    position:'fixed',
    top:0,
    left:0,
    right:0,
    bottom:0,
    backgroundColor:'rgba(0,0,0,.7)',
    zIndex:1000
}
const Add_NhaCC =()=> {
    const [ten,setTen]=useState('');
    const [thanhPho,setThanhPho]=useState('');
    const [quocGia,setQuocGia]=useState('');
    const [diaChi,setDiaChi]=useState('');
    const [ngayTao, setNgayTao] = useState('');
    const [ngaySua, setNgaySua] = useState('');
    const [provinces,setProvinces]=useState([])
  const [province,setProvince]=useState()
  const [district,setDistrict]=useState()
  const [districts,setDistricts]=useState([])
  const [reset, setReset] = useState(false)
    const [show,setShow]=useState(false);
    const handleClose=()=>{
        setShow(false);
    };
    const handleShow=()=>{
        console.log();
        setShow(true);
    }
   const saveNhaCC = (event) => {
        event.preventDefault();
        
        let nhacc = {
            ten: ten,
            thanhPho: `${district ? `${districts?.find(item => item.district_id === district)?.district_name},` : ''}`,
            quocGia: quocGia,
            diaChi: `${province ? provinces?.find(item => item.province_id === province)?.province_name : ''}`,

            ngayTao: ngayTao,
            ngaySua: ngaySua
           
        }
     
        console.log('nhacc =>' + JSON.stringify(nhacc));
        NhaCungCapService.createnhacc(nhacc).then(res => {
            setShow(false);
            toast.success('Save Successful');
            // window.location.href = "/phukien/create";
        }).catch(error =>{
            if(error && error.response && error.response.data){
                toast(error.response.data);
            }
        });
    }
     useEffect(() => {
    const fetchPublicProvince = async () => {
      const response = await apiGetPublicProvinces();
      if (response.status === 200) {
        setProvinces(response?.data.results)
      }
    }
    fetchPublicProvince();
  }, [])
  useEffect(() => {
    setDistrict(null)
    const fetchPublicDistrict = async () => {
      const response = await apiGetPublicDistrict(province)
      if (response.status === 200) {
        setDistricts(response.data?.results)
      }
    }
    province && fetchPublicDistrict()
    !province ? setReset(true) : setReset(false)
    !province && setDistricts([])
  }, [province])
   
   const changeTen = (event) => {
        setTen(event.target.value );
    }
   
   const changeThanhPho= (event) => {
        setThanhPho( event.target.value );
    }

   const changeQuocGia = (event) => {
        setQuocGia( event.target.value );
    }

   const changeDiaChi = (event) => {
        setDiaChi(event.target.value );
    }

   const changeNgayTao = (event) => {
        setNgayTao( event.target.value );
    }

   const changeNgaySua = (event) => {
        setNgaySua( event.target.value );
    }
    
       
        return (
            <>
              <Sidebar />
            <div style={onvrlay_style}>
           
                <section id="content">
                    <main className="container">
                        <div className="table-data">
                            <div className="order">
                                <div className="head">
                                    <h3>Thêm Nhà CC</h3>
                                </div>
                                <form>
                                    <div className=" row col-md-6 offset-md-3">
                                        {/* <div className="md-3">
                                            <label>Nhà Cung Cấp</label>
                                            <select
                                                className="form-select"
                                                aria-label="Default select example"
                                                name="nhaCungCap"
                                                value={this.state.selectedNhaCungCap || ''} // Chỉnh sửa ở đây
                                                onChange={this.changeNhaCungCap}
                                            >
                                                <option value="">Select NhàCC</option> Chỉnh sửa ở đây
                                                {this.state.nhaCungCap.map((ncc) => (
                                                    <option key={ncc.id} value={ncc.id}>
                                                        {ncc.ten}
                                                    </option>
                                                ))}
                                            </select>
                                        </div> */}
                                        {/* <div className="md-3">
                                            <label className="form-label">
                                                Ngày Tạo                                     </label>
                                            <input type="date" value={this.state.ngayTao} name="ngayTao"
                                                onChange={this.changeNgayTao} className='form-control' />
                                        </div> */}
                                      
                                        
                                      
                                        <div className="md-3">
                                            <label className="form-label">
                                                Tên 
                                            </label>
                                            <input className="form-control" type="text" name="ten" value={ten}
                                                onChange={changeTen} />
                                        </div>
                                        <div className="md-3">
                                            <SelectAddress type='province' value={province} setValue={setProvince} options={provinces} label='Tỉnh/Thành phố'></SelectAddress>
                                        </div>
                                        <div className="md-3">
                                            <label className="form-label">
                                                quốc gia
                                            </label>
                                            <input className="form-control" type="text" name="quocGia" value={quocGia}
                                                onChange={changeQuocGia} />
                                        </div>
                                        <div className="md-3">
                                            <SelectAddress type='district' value={district} setValue={setDistrict} options={districts} label='Quận/Huyện'></SelectAddress>
                                        </div>
                                        {/* <div className="md-3">
                                            <label className="form-label">
                                                Ngày Sửa
                                            </label>
                                            <input type="date" value={this.state.ngaySua} name="ngaySua"
                                                onChange={this.changeNgaySua} className='form-control' />
                                        </div> */}
                                        
                                        <div className=" row mt-3 form-outline form-white mb-2">
                                            <div className="col-6">
                                                <a
                                                    type="submit"
                                                    onClick={handleShow}
                                                    className="btn btn-secondary form-control"
                                                >
                                                    ADD
                                                </a>
                                            </div>
                                            <div className="col-6">
                                                <Link
                                                    to="/phukien/index"
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
                    <>
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Thêm Nhà CC</Modal.Title>
            </Modal.Header>
            <Modal.Body>Bạn có chắc chắn muốn thêm ?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Không
              </Button>
              <Button variant="primary" onClick={saveNhaCC}>
                Có
              </Button>
            </Modal.Footer>
          </Modal>
        </>
                </section>
                </div>
                
            </>
        );
    
}
export default Add_NhaCC;
