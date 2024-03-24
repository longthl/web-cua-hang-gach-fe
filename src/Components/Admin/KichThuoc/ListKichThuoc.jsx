import React, {useEffect,useState} from "react";
import { Link } from "react-router-dom";
import KichThuocService from "../../../Api/KichThuocService";
import Sidebar from "../Layout/Sidebar";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import KhachHangService from "../../../Api/KhachHangService";
export default function ListKichThuoc(){
    const [kichthuoc,setKichThuoc] = useState([])
    const [chieuDai,setChieuDai]=useState('');
    const [chieuRong,setChieuRong]=useState('');
    const [soLuong,setSoLuong]=useState('');
    const [showConfrimUpdate,setConfrimUpdate]=useState(false);
    const [showModalUpdate,setshowModalUpdate]=useState(false);
    const [getid,setid]=useState("");
    const [show,setShow]=useState(false);
    const [selectedKichThuoc,setSelectedKichThuoc]=useState(null);
    const handleClose=()=>{
        setShow(false);
        setConfrimUpdate(false);
        setSelectedKichThuoc(null);
        setshowModalUpdate(false);
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
            const response=await KichThuocService.getAll();
            const data=response.data;
            setKichThuoc(data);
        }catch(error){
            console.log(error);
        }
    };
    useEffect(()=>{
        fetchData();
    },[]);
    useEffect(()=>{
        KichThuocService.getAll().then((response)=>{
            setKichThuoc(response.data);
        }).catch(error=>{
            console.log(error);
        })
    },[])
    const DeleteDV =() =>{
        KichThuocService.deleteById(getid)
        .then((res)=>{
            toast.success("Delete thành công");
            // window.location.href="/kichthuoc/index";
            fetchData();
            handleClose();
        })
        .catch((error)=>{
            console.log(error);
        });
    };
  
    const updateKichThuoc=(e)=>{
         e.preventDefault();
        let updateKichThuoc={
         chieuDai,
         chieuRong,
         soLuong

        };
        KichThuocService.update(getid,kichthuoc).then(res=>{
            setConfrimUpdate(false);
            toast.success("Update thành công");
            fetchData();
        }).catch((error)=>{
            toast.error("Update thất bại");
        });
    };
    const changechieudai=(e)=>{
        setChieuDai(e.targer.value);
    };
    const changechieurong=(e)=>{
        setChieuRong(e.targer.value);
    };
    const changesoluong=(e)=>{
        setSoLuong(e.targer.value);
    }
    return(
        <>
        <Sidebar/>
        <section id="content">
            <main>
                <div className="table-data container">
                    <div className="order">
                        <div className="head">
                            <h3>Kích Thước</h3>
                            <i className="bx bx-search"/>
                            <i className="bx bx-filter"/>
                            <div>
                                <Link to="/kichthuoc/add" className="btn btn-primary">
                                    Add
                                </Link>
                            </div>
                        </div>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Chiều dài</th>
                                    <th>Chiều Rộng</th>
                                    <th>Số Lượng</th>
                                    <th>Ngay Tao</th>
                                    <th>Trạng Thái</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    kichthuoc.map(
                                        (kichthuoc,index)=>
                                        <tr>
                                            <th scope="row" key={index}>
                                                <td>{index+1}</td>
                                            </th>
                                            <td>{kichthuoc.chieuDai}</td>
                                            <td>{kichthuoc.chieuRong}</td>
                                            <td>{kichthuoc.soLuong}</td>
                                            <td>{kichthuoc.ngayTao}</td>
        
                                            <td><button onClick={()=> handleShow(kichthuoc.id)}
                                            className="btn btn-sm btn-danger">Delete</button>
                                                <span className="padd"></span>
                                                <button className="btn btn-success" onClick={() => handleShowUpdate(kichthuoc.id)} >
                                                    <box-icon name='edit-alt' ><i class='bx bx-edit-alt' >

                                                    </i></box-icon>
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
                <h3>Update Kích thước</h3>
              </div>
              <form onSubmit={updateKichThuoc}>
                <div className="row mt-3">
                  <div className="col-6">
                    <label>Chiều Dài</label>
                    <input
                      type="text"
                      className="form-control"
                      name="chieuDai"
                      value={chieuDai}
                      onChange={changechieudai}
                    />
                  </div>
                  <div className="col-6">
                    <label>Chiều Rộng</label>
                    <input
                      type="text"
                      className="form-control"
                      name="chieuRong"
                      value={chieuRong}
                      onChange={changechieurong}
                    />
                  </div>
                </div>
                <div className="row mt-3">
                <div className="col-6">
                    <label>Số Lượng</label>
                    <input
                      type="text"
                      className="form-control"
                      name="soLuong"
                      value={soLuong}
                      onChange={changesoluong}
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
            <Modal.Title>Cập nhật Kích Thước</Modal.Title>
          </Modal.Header>
          <Modal.Body>Bạn có chắc chắn muốn cập nhật</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Không
            </Button>
            <Button variant="primary" onClick={updateKichThuoc}>
              Có
            </Button>
          </Modal.Footer>
        </Modal>
        <>
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
          <Modal.Title>
            Xóa Kích Thước
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
