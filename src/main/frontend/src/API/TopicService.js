import axios from "axios";

export default class TopicService {
  static API_URL = "/api/topics/";
  static token = localStorage.getItem("jwt");

  static async getById(topicID) {
    const response = await axios.get(this.API_URL + topicID);
    return response.data;
  }

  static async getTopicsBySectionId(sectionId, page, limit) {
    const response = await axios.get(this.API_URL + "section/" + sectionId + "/" + page + "?limit=" + limit);
    return response.data;
  }

  static async getTopicsByUserId(userId, page, limit) {
    const response = await axios.get(this.API_URL + "user/" + userId + "/" + page + "?limit=" + limit);
    return response.data;
  }

  static async createTopic(topic) {
    const response = await axios.post(this.API_URL, topic, {
      headers: {
        Authorization: this.token,
      },
    });

    return response.data;
  }

  static async updateTopic(topicID, topic) {
    const response = await axios.put(this.API_URL + topicID, topic, {
      headers: {
        Authorization: this.token,
      },
    });
    return response.data;
  }

  static async deleteTopic(topicID) {
    await axios.delete(this.API_URL + topicID, {
      headers: {
        Authorization: this.token,
      },
    });
  }

  static async likeTopic(topicID) {
    await axios.put(this.API_URL + topicID + "/like", "", {
      headers: {
        Authorization: this.token,
      },
    });
  }

  static async dislikeTopic(topicID) {
    await axios.put(this.API_URL + topicID + "/dislike", "", {
      headers: {
        Authorization: this.token,
      },
    });
  }
}
