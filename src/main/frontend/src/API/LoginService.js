import axios from "axios";

export default class LoginService {

    static loginURL = "http://localhost:8080/login";

    static async login (user) {
        const responce = await axios.post(this.loginURL, user)
        return responce;
    }

    static async getCurrentUser() {
        const token = localStorage.getItem("jwt");
        const responce = await axios.get("http://localhost:8080/api/user", {
            headers: {
                'Authorization': token
            }
        })
        return responce.data;
    }

}