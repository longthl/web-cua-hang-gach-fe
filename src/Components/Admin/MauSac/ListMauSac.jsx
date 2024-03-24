import React, {useEffect,useState} from "react";
import {Link} from 'react-router-dom';
import Sidebar from "../Layout/Sidebar";
import MauSacService from "../../../Api/MauSacService";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";
import { toast } from "react-toastify";
export default function ListMauSac(){
    const [mausac,setMauSac]=useState([])
    const [ten,setTen]=useState('');
    const [soLuong,setSoLuong]=useState('');
    const [showConfrimUpdate,setConfrimUpdate]=useState(false);
    const [showModalUpdate,setshowModalUpdate]=useState(false);
    const [getid,setid]=useState("");
    const [show,setShow]=useState(false);

    const handleClose =()=>{
      setShow(false);
      setshowModalUpdate(false);
      setConfrimUpdate(false);
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
      setshowModalUpdate(false);
      setConfrimUpdate(true);
    }
    const fetchData=async()=>{
      try{
        const response=await MauSacService.getAll();
        const data=response.data;
        setMauSac(data);
      }catch(error){
        console.log(error);
      }
    };
   useEffect(()=>{
    fetchData();
   },[]);
    useEffect(()=>{
        MauSacService.getAll().then((response)=>{
            setMauSac(response.data);
        }).catch(error =>{
            console.log(error);
        })
    },[])
    const DeleteDV =(e)=>{
        console.log(e);
        MauSacService.deleteById(e)
        .then((res)=>{
            // window.location.href="/mausac/index";
            setShow(false);
            toast.success('Delete successfully');
            fetchData();
        }).catch((error)=>{
            console.log(error);
        });
    };
    const updatemausac=(e)=>{
      e.preventDefault();
      let mausac={
        ten,
        soLuong,
      };
      MauSacService.update(getid,mausac).then(res=>{
        setConfrimUpdate(fetchData);
        toast.success("Update thành công");
        fetchData();
      }).catch((error)=>{
        toast.error("Update thất bại");
      });
    };
    const changeten=(e)=>{
      setTen(e.targer.value);
    };
    const changesoluong=(e)=>{
      setSoLuong(e.targer.value);
    };
    return(
        <>
          <Sidebar />
          <section id="content">
            {/* MAIN */}
            <main>
              <div className="table-data container">
                <div className="order">
                  <div className="head">
                    <h3>Màu Sắc</h3>
                    <i className="bx bx-search" />
                    <i className="bx bx-filter" />
                    <div>
                      <Link to="/mausac/add" className="btn btn-primary">
                        Add
                      </Link>
                    </div>
                  </div>
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>STT</th>
                        <th>Id</th>
                        <th>Tên</th>
                        <th>Số Lượng</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        mausac.map(
                          (mausac, index) =>
                            <tr>
                              <th scope="row" key={index}>
                                <td>{index + 1}</td>
                              </th>
                              <td>{mausac.ten}</td>
                                    <td>{mausac.soLuong}</td>
                              <td><button
                                onClick={() => handleShow(mausac.id)}
                                className="btn btn-sm btn-danger"
                              >
                                Delete
                              </button>
                                <span className="padd"></span>
                                <button className="btn btn-success" onClick={() => handleShowUpdate(mausac.id)} >
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
            <>
                    <Modal show={showModalUpdate} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Cập nhập</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <main className="container">


                                <div className="head">
                                    <h3>Update Màu Sắc</h3>
                                </div>
                                <form onSubmit={updatemausac}>
                                    <div className="row">
                                        <div className="row mt-3">
                                            <div className="col-6">
                                                <label>Tên</label>
                                                <input
                                                    type="text"
                                                    className="form-control" name='ten'
                                                    value={ten}
                                                    onChange={changeten}
                                                />
                                            </div>
                                            <div className="col-6">
                                                <label>Số Lượng</label>
                                                <input
                                                    type="text"
                                                    className="form-control" name='soLuong'
                                                    value={soLuong}
                                                    onChange={changesoluong}
                                                />
                                            </div></div>
                                       

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

                </>
                <>
                    <Modal show={showConfrimUpdate} onHide={handleClose} backdrop="static" keyboard={false}>
                        <Modal.Header closeButton>
                            <Modal.Title>Cập nhật dịch vụ</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Bạn có chắc chắn muốn cập nhật</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Không
                            </Button>
                            <Button variant="primary" onClick={updatemausac}>Co</Button>
                        </Modal.Footer>
                    </Modal>
                </>
                <>
                    <Modal
                        show={show}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Xóa Màu Sắc</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Bạn có chắc chắn muốn xóa ?</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Không
                            </Button>
                            <Button variant="primary" onClick={(e) => DeleteDV(e)}>
                                Có
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
          </section>
        </>
    )
}
