import React,{useEffect,useState} from "react";
import { Link } from "react-router-dom";
import DiaChiService from "../../../Api/DiaChiService";
import Sidebar from "../Layout/Sidebar";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
export default function ListDiaChi(){
    const [diachi,setDiaChi]=useState([])
    const [thanhPho,setThanhPho]=useState('');
    const [phuong,setPhuong]=useState('');
    const [xa,setXa]=useState('');
    const [showConfrimUpdate,setConfrimUpdate]=useState(false);
    const [showModalUpdate,setshowModalUpdate]=useState(false);
    const [getid,setid]=useState("");
    const [show,setShow]=useState(false);
    const [selectedDiaChi,setSelectedDiaChi]=useState(null);
    const handleClose=()=>{
        setShow(false);
        setConfrimUpdate(false);
        setshowModalUpdate(false);
        setSelectedDiaChi(null);
    };
    const handleShow=(id)=>{
        setid(id);
        setShow(true);
    };
    const handleShowUpdate=(id)=>{
        setid(id);
        setshowModalUpdate(true);
    };
    const handleShowConfrimUpdate=()=>{
        setConfrimUpdate(true);
        setshowModalUpdate(false);
    };
    const fetchData=async()=>{
        try{
            const response=await DiaChiService.getAll();
            const data=response.data;
            setDiaChi(data);
        }catch(error){
            console.log(error);
        }
    };
    useEffect(()=>{
        fetchData();
    },[]);
    useEffect(()=>{
        DiaChiService.getAll().then((response)=>{
            setDiaChi(response.data);
        }).catch(error=>{
            console.log(error);
        })
    },[])
    const DeleteDV=()=>{
        DiaChiService.deleteById(getid).then((res)=>{
            toast.success("Delete thành công");
            fetchData();
            handleClose();
        }).catch((error)=>{
            console.log(error);
        });
    };
    const updateDiaChi=()=>{
        const updateDiaChi={
            thanhPho,
            phuong,
            xa
        };
        DiaChiService.update(getid,updateDiaChi).then((res)=>{
            setConfrimUpdate(false);
            toast.success("Update thành công");
            fetchData();
        }).catch((error)=>{
            toast.error("Update thất bại");
        });
    }
    const changethanhpho=(e)=>{
        setThanhPho(e.target.value);
    }
    const changephuong=(e)=>{
        setPhuong(e.target.value);
    }
    const changexa=(e)=>{
        setXa(e.target.value);
    }
    return(
        <>
        <Sidebar/>
        <section id="content">
         <main>
            <div className="table-data container">
                <div className="order">
                    <div className="head">
                        <h3>Địa Chỉ</h3>
                        <i className="bx bx-search"/>
                        <i className="bx bx-filter"/>
                        <div>
                            <Link to="/diachi/add" className="btn btn-primary">
                                Add
                            </Link>
                        </div>
                    </div>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Thành Phố</th>
                                <th>Phường</th>
                                <th>Xã</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                diachi.map(
                                    (diachi,index)=>
                                    <tr>
                                        <th scope="row" key={index}>
                                            <td>{index+1}</td>
                                        </th>
                                        <td>{diachi.thanhPho}</td>
                                        <td>{diachi.phuong}</td>
                                        <td>{diachi.xa}</td>
                                        <td>
                                        <button
                            onClick={() => handleShow(diachi.id)}
                            className="btn btn-sm btn-danger"
                          >
                            Delete
                          </button>  
                          <span className="padd"></span>
                            <button
                          className="btn btn-success"
                          onClick={() => handleShowUpdate(diachi.id)}
                        >
                          Edit
                        </button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <div className="px-5 py-2 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                <div className="inline-flex mt-2 mt-0">
                  <button
                    className="btn btn-sm btn-outline-secondary"
                  // onClick={prevPage}
                  >
                    Prev
                  </button>

                  <button
                    className="btn btn-sm btn-outline-secondary"
                  // onClick={nextPage}
                  >
                    Next
                  </button>
                </div>
              </div>
                </div>
            </div>
         </main>
         <Modal show={showModalUpdate} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Cập Nhật</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <main className="container">
              <div className="head">
                <h3>Update Chất Liệu</h3>
              </div>
              <form onSubmit={updateDiaChi}>
                <div className="row mt-3">
                  <div className="col-6">
                    <label>Thành Phố</label>
                    <input
                      type="text"
                      className="form-control"
                      name="thanhPho"
                      value={thanhPho}
                      onChange={changethanhpho}
                    />
                  </div>
                  <div className="col-6">
                    <label>Phường</label>
                    <input
                      type="text"
                      className="form-control"
                      name="phuong"
                      value={phuong}
                      onChange={changephuong}
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-6">
                    <label>Xã</label>
                    <input
                      type="text"
                      className="form-control"
                      name="xa"
                      value={xa}
                      onChange={changexa}
                    />
                  </div>
                </div>
              </form>
            </main>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleShowConfrimUpdate}>
              Update
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={showConfrimUpdate}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Cập nhật Chất Liệu</Modal.Title>
          </Modal.Header>
          <Modal.Body>Bạn có chắc chắn muốn cập nhật</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Không
            </Button>
            <Button variant="primary" onClick={updateDiaChi}>
              Có
            </Button>
          </Modal.Footer>
        </Modal>
        <>
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
          <Modal.Title>
            Xóa Địa Chỉ
          </Modal.Title>
          </Modal.Header>
          <Modal.Body>Bạn có chắc chắn muốn xóa?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Không
            </Button>
            <Button variant="secondary" onClick={DeleteDV}>
                Có
            </Button>
          </Modal.Footer>
        </Modal>
        </>
        </section>
        </>
    )
}