import axios from "axios";
const f = {
    get:function(url,success){
        axios.get(url,{xhrFields: { withCredentials: true }}).then(success)
    },
}
export default f;