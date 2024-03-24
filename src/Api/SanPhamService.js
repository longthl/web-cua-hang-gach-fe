import { instance } from "./instance";
const SanPham_API_URL='san-pham';
class SanPhamService{
    getAll(){
        return instance.get(SanPham_API_URL+'/index');
    }
    deleteById(id){
        return instance.delete(SanPham_API_URL+'/delete/'+id);
    }
    getById(id){
        return instance.getById(SanPham_API_URL+'/getById/'+id);
    }
    createsanpham(sanpham){
        return instance.post(SanPham_API_URL+'/add',sanpham);
    }
    update(id,sanpham){
        return instance.put(SanPham_API_URL+'/update/'+id,sanpham);
    }
}
export default new SanPhamService();