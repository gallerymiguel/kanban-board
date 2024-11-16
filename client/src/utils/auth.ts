import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  // TODO: return the decoded token
  //Retrieve the JWT token from localStorage and decode it
  getProfile() {
    const token = this.getToken();
    if (token) {
      return jwtDecode<JwtPayload>(token);
    }
    return null; // Or throw an error based on your needs
  }

  // TODO: return a value that indicates if the user is logged in
  // Check if the user is logged in by retrieving the token from localStorage
  loggedIn() {
    const token = this.getToken();
    return token;
  }
  // TODO: return a value that indicates if the token is expired
  isTokenExpired(token: string) {
    const decodedToken = jwtDecode<JwtPayload>(token);
    if (!decodedToken.exp) {
      return false; // Assume the token doesn't expire if no exp field exists
    }
    const expirationDate = new Date(0);
    expirationDate.setUTCSeconds(decodedToken.exp);
    return expirationDate.valueOf() < Date.now();
  }
  

  // TODO: return the token
  // Retrieve the JWT token from localStorage
  getToken(): string {
    const loggedUser = localStorage.getItem('id_token') || '';
    return loggedUser;
  }

  // TODO: set the token to localStorage and redirect to the home page
  // Store the JWT token in localStorage and redirect to the home page
  login(idToken: string) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  // TODO: remove the token from localStorage and redirect to the login page
  // Remove the JWT token from localStorage and redirect to the home page
  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/');
  }
}

export default new AuthService();
