import { instance } from "./instance";
const ChatLieu_API_URL ='chat-lieu'
class ChatLieuService{
    getAll(){
        return instance.get(ChatLieu_API_URL+'/index');
    }
    deleteById(id){
        return instance.delete(ChatLieu_API_URL+'/delete/'+id);
    }
    createchatlieu(chatlieu){
        return instance.post(ChatLieu_API_URL+'/add',chatlieu);
    }
    update(id,chatlieu){
        return instance.put(ChatLieu_API_URL+'/update/'+id,chatlieu);
    }
}
export default new ChatLieuService();