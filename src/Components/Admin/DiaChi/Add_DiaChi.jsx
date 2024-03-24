import React,{useEffect,useState} from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Layout/Sidebar";
import DiaChiService from "../../../Api/DiaChiService";
import { toast } from "react-toastify";
import SelectAddress from "../NhanVien/SelectAddress";
import { apiGetPublicDistrict, apiGetPublicProvinces } from "../../../Api/NhanVienService";
const AddDiaChi=()=>{
   const [thanhPho,setThanhPho]=useState('');
   const [phuong,setPhuong]=useState('');
   const [xa,setXa]=useState('');
   const [provinces, setProvinces] = useState([])
  const [province, setProvince] = useState()
  const [district, setDistrict] = useState()
  const [districts, setDistricts] = useState([])
  const [show,setShow]=useState(false)
  const[getid,setid]=useState("")
  const [showConfrimUpdate,setConfrimUpdate]=useState(false);
  const [showModalUpdate,setshowModalUpdate]=useState(false);
  const [diaChi,setDiaChi]=useState([])
  
   const saveDiaChi=(event)=>{
    event.preventDefault();
    let diachi={
        thanhPho:`${district ? `${districts?.find(item => item.district_id === district)?.district_name},` : ''}`,
        phuong:`${province ? provinces?.find(item => item.province_id === province)?.province_name : ''}`,
        xa:xa
    };
    const confix=window.confirm("Bạn chắc chắn muốn thêm")
    if(confix){
        DiaChiService.creatediachi(diachi).then((res)=>{
            alert('Save Successful');
            window.location.href='/diachi/index';
        }).catch((error)=>{
            if(error && error.response && error.response.data){
                toast(error.response.data);
            }
        });
    };
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
  
    !province && setDistricts([])
  }, [province])
   const changethanhpho=(event)=>{
    setThanhPho(event.target.value);
   };
   const changephuong=(event)=>{
    setPhuong(event.target.value);
   };
   const changexa=(event)=>{
    setXa(event.target.value);
   };
   return(
    <>
    <Sidebar/>
    <section id="content">
    <main className="container">
                <div className="table-data">
                    <div className="order">
                        <div className="head">
                            <h3>Thêm Địa Chỉ</h3>
                        </div>
                        <form onSubmit={saveDiaChi}>
                            <div className="row col-md-6 offset-md-3">
                            <div className="md-3">
                    <SelectAddress type='province' value={province} setValue={setProvince} options={provinces} label='Tỉnh/Thành phố'></SelectAddress>
                    <SelectAddress type='district' value={district} setValue={setDistrict} options={districts} label='Quận/Huyện'></SelectAddress>
                  </div>
                              

                                <div className="md-3">
                                    <label className="form-label">
                                       Xã
                                    </label>
                                    <input type="text" className="form-control" name="xa" value={xa} onChange={changexa} />
                                </div>
                                <div className="row mt-3 form-outline form-white mb-2">
                                    <div className="col-6">
                                        <button type="submit" onClick={saveDiaChi} className="btn btn-secondary form-control">
                                            ADD
                                        </button>
                                    </div>
                                    <div className="col-6">
                                        <Link to="/diachi/index" className="btn btn-danger form-control">Cancel</Link>
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
export default AddDiaChi;