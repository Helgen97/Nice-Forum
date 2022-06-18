import axios from "axios";

export default class SectionService {

    static API_URL = '/api/tags/starts/';

    static async getTagList(tagName) {
        const response = await axios.get(this.API_URL + tagName);
        return response.data;
    }
}
