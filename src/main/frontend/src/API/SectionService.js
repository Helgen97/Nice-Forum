import axios from "axios";

export default class SectionService {

    static API_URL = 'http://localhost:8080/api/sections/';
    static token = localStorage.getItem("jwt")

    static async getAll() {
        const response = await axios.get(this.API_URL);
        return response.data;
    }

    static async getOne(id) {
        const response = await axios.get(this.API_URL + id);
        return response.data;
    }

    static async createSection(section) {
        const response = await axios.post(this.API_URL, section, {
            headers:{
                'Authorization': this.token,
            }
        });
        return response.data;
    }
}