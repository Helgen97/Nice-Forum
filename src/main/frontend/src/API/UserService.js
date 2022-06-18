import axios from "axios";

export default class UserService {
  static API_URL = "http://localhost:8080/api/users/";
  static token = localStorage.getItem("jwt");

  static async getAllUsers(page, limit) {
    const response = await axios.get(
      this.API_URL + "?page=" + page + "&limit=" + limit,
      {
        headers: {
          Authorization: this.token,
        },
      }
    );
    return response.data;
  }

  static async getUserByID(userID) {
    const response = await axios.get(this.API_URL + userID);
    return response.data;
  }

  static async createUser(user) {
    const response = await axios.post(this.API_URL, user);
    return response.data;
  }

  static async updateUser(id, user) {
    const response = await axios.put(this.API_URL + id, user, {
      headers: {
        Authorization: this.token,
      },
    });
    return response.data;
  }

  static async updateUserRole(userId, role) {
    const response = await axios.put(
      this.API_URL + "role/" + userId + "?role=" + role,
      "",
      {
        headers: {
          Authorization: this.token,
        },
      }
    );
    return response.data;
  }

  static async deleteUser(userId) {
    await axios.delete(this.API_URL + userId);
  }

  static async emailAvailable(email) {
    const response = await axios.post(
      "http://localhost:8080/api/check/email?email=" + email
    );
    return response.data;
  }

  static async loginAvailable(login) {
    const response = await axios.post(
      "http://localhost:8080/api/check/nickname?nickname=" + login
    );
    return response.data;
  }

  static async changePassword(oldPassword, newPassword) {
    const response = await axios.post(
      "http://localhost:8080/change/password?oldPassword=" +
        oldPassword +
        "&newPassword=" +
        newPassword,
      "",
      {
        headers: {
          Authorization: this.token,
        },
      }
    );
    return response.data;
  }

  static async changeAvatarUrl(avatarUrl) {
    const responce = await axios.post(
      "http://localhost:8080/change/avatar?url=" + avatarUrl,
      "",
      {
        headers: {
          Authorization: this.token,
        },
      }
    );
    return responce.data;
  }
}
