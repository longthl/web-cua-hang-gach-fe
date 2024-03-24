import { instance } from "./instance";
const DiaChi_API_URL='/dia-chi'
class DiaChiService{
    getAll(){
        return instance.get(DiaChi_API_URL+'/index');
    }
    getById(id){
        return instance.get(DiaChi_API_URL+'/getById/'+id);
    }
    deleteById(id){
        return instance.delete(DiaChi_API_URL+'/delete/'+id);
    }
    creatediachi(diachi){
        return instance.post(DiaChi_API_URL+'/add',diachi);
    }
    update(id,diachi){
        return instance.put(DiaChi_API_URL+'/update/'+id,diachi);
    }
}
export default new DiaChiService();