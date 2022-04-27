import axios from "axios";

const API_URL = "https://glacial-castle-98127.herokuapp.com/http://localhost:8080/api/auth/";

class AuthService {
 login(username, password) {
    return axios.post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
          console.log("localStroge関数発動")
        }

        return response.data;
        
      });
      
      
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password,youtubeid) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
      youtubeid
    });
  }

  getCurrentUser() {
      console.log("AuthService.getCurrentUser();")
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default new AuthService();