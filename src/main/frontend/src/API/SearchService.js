import axios from "axios";

export default class SearchService {

    static API_URL = '/api/search?';

    static async searchTopics(params) {
        const response = await axios.get(this.API_URL + params);
        return response.data;
    }
}