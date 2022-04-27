export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
  
    if (user && user.token) {
      console.log("api/test/user")
      // return { Authorization: 'Bearer ' + user.accessToken }; // for Spring Boot back-end
      return { Authorization: 'Bearer '+ user.token };       // for Node.js Express back-end
      
    } else {
      return {};
    }
  }