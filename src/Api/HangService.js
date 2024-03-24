import { instance } from "./instance";
const Hang_API_URL='hang';
class HangService{
    getAll(){
        return instance.get(Hang_API_URL+'/index');
    }
    getById(id){
        return instance.get(Hang_API_URL+'/getById/'+id);
    }
    deleteById(id){
        return instance.delete(Hang_API_URL+'/delete/'+id);
    }
    createhang(hang){
        return instance.post(Hang_API_URL+'/add',hang);
    }
    update(id,hang){
        return instance.put(Hang_API_URL+'/update/'+id,hang);
    }
}
export default new HangService();