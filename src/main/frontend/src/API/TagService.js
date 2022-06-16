import axios from "axios";

export default class SectionService {

    static API_URL = 'http://localhost:8080/api/tags/starts/';

    static async getTagList(tagName) {
        const response = await axios.get(this.API_URL + tagName);
        return response.data;
    }
}
