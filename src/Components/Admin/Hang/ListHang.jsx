import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HangService from "../../../Api/HangService";
import Sidebar from "../Layout/Sidebar";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function ListHang() {
  const [ten, setTen] = useState('');
  const [showConfrimUpdate, setConfrimUpdate] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [getid, setid] = useState("");
  const [show, setShow] = useState(false);
  const [hang, setHang] = useState([]);
  const [selectedHang, setSelectedHang] = useState(null);

  const handleClose = () => {
    setShow(false);
    setConfrimUpdate(false);
    setShowModalUpdate(false);
    setSelectedHang(null);
    setid("");
  };
 const handleShow=(id)=>{
    setid(id);
    setShow(true);
 };
  const handleShowUpdate = (id) => {
    setid(id);
    setShowModalUpdate(true);
  };

  const handleShowConfrimUpdate = () => {
    setConfrimUpdate(true);
    setShowModalUpdate(false);
  };
const fetchData=async ()=>{
    try{
        const response=await HangService.getAll();
        const data= response.data;
        setHang(data);
    }catch(error){
        console.log(error);
    }
};
useEffect(()=>{
    fetchData();
},[]);
  const deleteHang = () => {
    console.log(getid);
    HangService.deleteById(getid)
      .then((res) => {
        toast.success("Delete thành công");
        // window.location.href="/hang/index";
        fetchData();
        handleClose();
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const updateHangData = () => {
    const updatedHang = {
      ten,
    };

    HangService.update(getid, updatedHang)
      .then((res) => {
        setConfrimUpdate(false);
        toast.success("Update thành công");
        setHang((prevHang) =>
          prevHang.map((item) =>
            item.id === getid ? { ...item, ten } : item
          )
        );
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  useEffect(() => {
    HangService.getAll()
      .then((response) => {
        setHang(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Sidebar />
      <section id="content">
        <main>
          <div className="table-data container">
            <div className="order">
              <div className="head">
                <h3>Hàng</h3>
                <div>
                  <Link to="/hang/add" className="btn btn-primary">
                    Add
                  </Link>
                </div>
              </div>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Tên </th>
                    <th>Ngày Sửa</th>
                    <th>Ngày Tạo</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {hang.map((hang, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{hang.ten}</td>
                      <td>{hang.ngaySua}</td>
                      <td>{hang.ngayTao}</td>
                      <td>
                        <button
                          onClick={() => handleShow(hang.id)}
                          className="btn btn-sm btn-danger"
                        >
                          Delete
                        </button>
                        <span className="padd"></span>
                        <button
                          className="btn btn-success"
                          onClick={() => handleShowUpdate(hang.id)}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
                <h3>Update Nhân Viên</h3>
              </div>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="row mt-3">
                  <div className="col-6">
                    <label>Tên</label>
                    <input
                      type="text"
                      className="form-control"
                      name="ten"
                      value={ten}
                      onChange={(e) => setTen(e.target.value)}
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
            <Modal.Title>Cập nhật dịch vụ</Modal.Title>
          </Modal.Header>
          <Modal.Body>Bạn có chắc chắn muốn cập nhật</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Không
            </Button>
            <Button variant="primary" onClick={updateHangData}>
              Có
            </Button>
          </Modal.Footer>
        </Modal>
        <>
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
          <Modal.Title>
            Xóa Hãng
          </Modal.Title>
          </Modal.Header>
          <Modal.Body>Bạn có chắc chắn muốn xóa?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Không
            </Button>
            <Button variant="secondary" onClick={deleteHang}>
                Có
            </Button>
          </Modal.Footer>
        </Modal>
        </>
      </section>
    </>
  );
}