import { instance } from "./instance";
const GioHang_API_URL='gio-hang';
class GioHangService{
    getAll(){
        return instance.get(GioHang_API_URL+'/index');
    }
    getById(id){
        return instance.get(GioHang_API_URL+'/detail/'+id);
    }
    create(id,giohang){
        return instance.post(GioHang_API_URL+'/them/'+id,giohang);
    }
    create1(gioHang){
        return instance.post(GioHang_API_URL+'/add',gioHang);
    }
    deleteById(id){
        return instance.delete(GioHang_API_URL+'/delete/'+id);
    }
}
export default new GioHangService();