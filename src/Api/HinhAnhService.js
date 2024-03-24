import { instance } from "./instance";
const HinhAnh_API_URL='hinh-anh';
class HinhAnhService{
    getAll(){
        return instance.get(HinhAnh_API_URL+'/index');
    }
    getById(id){
        return instance.get(HinhAnh_API_URL+'/getById/'+id);
    }
    deleteById(id){
        return instance.delete(HinhAnh_API_URL+'/delete/'+id);
    }
    createhinhanh(hinhanh){
        return instance.post(HinhAnh_API_URL+'/add',hinhanh);
    }
    update(id,hinhanh){
        return instance.put(HinhAnh_API_URL+'/update/'+id,hinhanh);
    }
}
export default new HinhAnhService();