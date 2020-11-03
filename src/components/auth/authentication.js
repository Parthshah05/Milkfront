export const authenticate = (data, next) => {
  if (typeof window !== undefined) {
    localStorage.setItem("userLogin", JSON.stringify(data));
    next();
  }
};
export const isAuthenticated = () => {
  if (typeof window == undefined) {
    return false;
  }
  if (localStorage.getItem("userLogin")) {
    return JSON.parse(localStorage.getItem("userLogin"));
  } else {
    return false;
  }
};
//   export const signout = (next) => {
//     if (typeof window !== undefined) {
//       localStorage.removeItem("TOKEN");
//       next();
//     }
//   };
