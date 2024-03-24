import{instance} from "./instance";
const KichThuoc_API_URL ='kich-thuoc'
class KichThuocService{
    getAll(){
        return instance.get(KichThuoc_API_URL +'/index');
    }
    deleteById(id){
        return instance.delete(KichThuoc_API_URL+'/delete/'+id);
    }
    creatkichthuoc(kichthuoc){
        return instance.post(KichThuoc_API_URL+'/add',kichthuoc);
    }
    update(id,kichthuoc){
        return instance.put(KichThuoc_API_URL+'/update/'+id,kichthuoc);
    }
    getById(id){
        return instance.get(KichThuoc_API_URL+'/getById'+id);
    }
}
export default new KichThuocService();