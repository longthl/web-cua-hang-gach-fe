import React,{useEffect,useState} from "react";
import {Link} from 'react-router-dom';
import ChatLieuService from "../../../Api/ChatLieuService";
import Sidebar from "../Layout/Sidebar";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
export default function ListChatLieu(){
    const [chatlieu,setChatLieu]=useState([])
    const [ten,setTen]=useState('');
    const [showConfrimUpdate,setConfrimUpdate]=useState(false);
    const [showModalUpdate,setshowModalUpdate]=useState(false);
    const [getid,setid]=useState("");
    const [show,setShow]=useState(false);
    const [selectedChatLieu,setSelectedChatLieu]=useState(null);
    const handleClose=()=>{
      setShow(false);
      setConfrimUpdate(false);
      setshowModalUpdate(false);
      setSelectedChatLieu(null);
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
        const response=await ChatLieuService.getAll();
        const data=response.data;
        setChatLieu(data);
      }catch(error){
        console.log(error);
      }
    };
    useEffect(()=>{
      fetchData();
    },[]);

    useEffect(()=>{
        ChatLieuService.getAll().then((response)=>{
            setChatLieu(response.data);
        }).catch(error=>{
            console.log(error);
        })
    },[])
    const DeleteDV=()=>{
    ChatLieuService.deleteById(getid).then((res)=>{
      toast.success("Delete thành công");
      fetchData();
      handleClose();
        // window.location.href="/chatlieu/index";
    }).catch((error)=>{
        console.log(error);
    });
    };
    const updateChatLieu=()=>{
      const updateChatLieu={
        ten,
      };
      ChatLieuService.update(getid,updateChatLieu).then((res)=>{
        setConfrimUpdate(false);
        toast.success("Update thành công");
        fetchData();
      }).catch((error)=>{
        toast.error(error);
      });
    }
    const changeten=(e)=>{
      setTen(e.target.value);
    };

    return(
        <>
        <Sidebar/>
        <section id="content">
        {/* MAIN */}
        <main>
          <div className="table-data container">
            <div className="order">
              <div className="head">
                <h3>Chất Liệu</h3>
                <i className="bx bx-search" />
                <i className="bx bx-filter" />
                <div>
                  <Link to="/chatlieu/add" className="btn btn-primary">
                    Add
                  </Link>
                </div>
              </div>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Tên Chất liệu</th>
                    <th>Ngày Sửa</th>
                    <th>Ngày Tạo</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    chatlieu.map(
                      (chatlieu, index) =>
                        <tr>
                          <th scope="row" key={index}>
                            <td>{index + 1}</td>
                          </th>
                          <td>{chatlieu.ten}</td>
                          <td>{chatlieu.soLuong}</td>
                          <td>{chatlieu.ngaySua}</td>
                          <td>{chatlieu.ngayTao}</td>
                          <td><button
                            onClick={() => handleShow(chatlieu.id)}
                            className="btn btn-sm btn-danger"
                          >
                            Delete
                          </button>
                            <span className="padd"></span>
                            <button
                          className="btn btn-success"
                          onClick={() => handleShowUpdate(chatlieu.id)}
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
              <form onSubmit={updateChatLieu}>
                <div className="row mt-3">
                  <div className="col-6">
                    <label>Tên</label>
                    <input
                      type="text"
                      className="form-control"
                      name="ten"
                      value={ten}
                      onChange={changeten}
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
            <Button variant="primary" onClick={updateChatLieu}>
              Có
            </Button>
          </Modal.Footer>
        </Modal>
        <>
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
          <Modal.Title>
            Xóa Chất Liệu
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
    );
}
