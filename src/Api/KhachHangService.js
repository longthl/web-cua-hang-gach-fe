import { instance } from "./instance";
const KhachHang_API_URL='khach-hang';
class KhachHangService{
    getAll(){
        return instance.get(KhachHang_API_URL+'/index');
    }
    getById(id){
        return instance.get(KhachHang_API_URL+'/getById/'+id);
    }
    deleteById(id){
        return instance.delete(KhachHang_API_URL+'/delete/'+id);
    }
    createkhachhang(khachhang){
        return instance.post(KhachHang_API_URL+'/add',khachhang);
    }
    update(id,khachhang){
        return instance.put(KhachHang_API_URL+'/update/'+id,khachhang);
    }
}
export default new KhachHangService();