import axios from "axios";

export default class LoginService {

    static loginURL = "/login";

    static async login (user) {
        const responce = await axios.post(this.loginURL, user)
        return responce;
    }

    static async getCurrentUser() {
        const token = localStorage.getItem("jwt");
        const responce = await axios.get("/api/user", {
            headers: {
                'Authorization': token
            }
        })
        return responce.data;
    }

}