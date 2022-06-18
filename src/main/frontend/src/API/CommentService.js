import axios from "axios";

export default class CommentService {
  static API_URL = "/api/comments/";
  static token = localStorage.getItem("jwt");

  static async createComment(comment) {
    const response = await axios.post(this.API_URL, comment, {
      headers: {
        Authorization: this.token,
      },
    });
    return response.data;
  }

  static async updateComment(comment, commentId) {
    const response = await axios.put(this.API_URL + commentId, comment, {
      headers: {
        Authorization: this.token,
      },
    });
    return response.data;
  }

  static async getTopicComments(topicId, page, limit) {
    const response = await axios.get(
      this.API_URL + topicId + "/" + page + "?limit=" + limit
    );
    return response.data;
  }

  static async getCommentsByUserId(userId, page, limit) {
    const response = await axios.get(
      this.API_URL + "user/" + userId + "/" + page + "?limit=" + limit
    );
    return response.data;
  }

  static async likeComment(commentId) {
    await axios.put(this.API_URL + commentId + "/like", "", {
      headers: {
        Authorization: this.token,
      },
    });
  }

  static async dislikeComment(commentId) {
    await axios.put(this.API_URL + commentId + "/dislike", "", {
      headers: {
        Authorization: this.token,
      },
    });
  }

  static async deleteComment(commentId) {
    await axios.delete(this.API_URL + commentId, {
      headers: {
        Authorization: this.token,
      },
    });
  }
}
