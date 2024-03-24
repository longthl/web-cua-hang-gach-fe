import { instance } from "./instance";
const ThanhToan_API_URL='thanh-toan';
class ThanhToanService{
    getAll(){
        return instance.get(ThanhToan_API_URL+'/index');
    }
    getById(id){
        return instance.get(ThanhToan_API_URL+'/timkiem/'+id);
    }
    create(donhang){
        return instance.get(ThanhToan_API_URL+'/add',donhang);
    }
}
export default new ThanhToanService();