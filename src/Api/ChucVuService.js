
import { instance } from './instance';
const ChucVu_API_URL = 'mau-sac';
class ChucVuService {
    getAll() {
        return instance.get(ChucVu_API_URL + '/index');
    }
    deleteById(maChucVu) {
        return instance.delete(ChucVu_API_URL + '/delete/' + maChucVu);
    }
    getById(maChucVu) {
        return instance.get(ChucVu_API_URL + '/getById/' + maChucVu);
    }
    createchucvu(chucvu) {
        return instance.post(ChucVu_API_URL + '/add', chucvu);
    }
    UpdateCV(maChucVu,chucvu){
        return instance.put(ChucVu_API_URL + '/update/' + maChucVu,chucvu);
    }
}
export default new ChucVuService();