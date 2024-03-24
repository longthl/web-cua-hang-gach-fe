import { instance } from "./instance";
const Shop_API_URL='shop';
class ShopService{
    getAll(){
        return instance.get(Shop_API_URL+'/index');
    }
    findByTen(ten){
        return instance.get(Shop_API_URL+'/timkiem/'+ten);
    }
    findByGia(gia){
        return instance.get(Shop_API_URL+'/timkiemgia/'+gia);
    }
    findByHang(hang){
        return instance.get(Shop_API_URL+'/timkiemhang/'+hang);
    }
    findByid(id){
        return instance.get(Shop_API_URL+'/timkiemid/'+id);
    }
}
export default new ShopService();