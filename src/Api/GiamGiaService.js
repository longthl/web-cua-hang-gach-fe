import { instance } from "./instance";
const GiamGia_API_URL ='giam-gia'
class GiamGiaService{
    getAll(){
        return instance.get(GiamGia_API_URL+'/index');
    }
    getById(id){
        return instance.get(GiamGia_API_URL+'/getById/'+id);
    }
    deleteById(id){
        return instance.delete(GiamGia_API_URL+'/delete/'+id);
    }
    creategiamgia(giamgia){
        return instance.post(GiamGia_API_URL+'/add',giamgia);
    }
    update(id,giamgia){
        return instance.put(GiamGia_API_URL+'/update/'+id,giamgia);
    }
}
export default new GiamGiaService();