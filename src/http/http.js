import axios from "axios";
const f = {
    get:(url,success) => {
        return axios.get(url,{xhrFields: { withCredentials: true }}).then(success)
    },
    getSongUrl:(uid,success) => {
        return f.get("./apis/song/url?id="+uid.join(','),success);
    },
    getPhone:(phone,pwd,success) => {
        return f.get("./apis/login/cellphone?phone="+phone+"&password="+pwd,success);
    },
    getEmail:(email,pwd,success) => {
        return f.get("./apis/login?email="+email+"&password="+pwd,success);
    },
}
export default f;