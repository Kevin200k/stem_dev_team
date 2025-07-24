const USER_KEY = 'user';

const AuthManager = {
  login: (userData) => {
    localStorage.setItem(USER_KEY, JSON.stringify(userData));
  },

  logout: () => {
    localStorage.removeItem(USER_KEY);
  },

  getCurrentUser: () => {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  },

  isLoggedIn: () => {
    return !!localStorage.getItem(USER_KEY);
  }
};

export default AuthManager;
