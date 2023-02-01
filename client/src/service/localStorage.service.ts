const TOKEN_KEY = "jwt-token";
const EXPIRES_KEY = "jwt-expires";
const USER_ID_KEY = "user-local-id";
// const BASKET = "basketItems";

interface IToken {
  accessToken: string;
  user: {
    email: string;
    isActivated: boolean;
    role: string;
    _id: string;
  };
}

export function setTokens({ accessToken, user }: IToken) {
  localStorage.setItem(TOKEN_KEY, accessToken);
  localStorage.setItem(USER_ID_KEY, user._id);
}
export function getAccessToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getUserID() {
  return localStorage.getItem(USER_ID_KEY);
}
export function removeAuthData() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_ID_KEY);
  localStorage.removeItem(EXPIRES_KEY);
}
// export function setBasketItems(payload) {
//   localStorage.setItem(BASKET, JSON.stringify(payload));
// }
// export function getBasketItems() {
//   return JSON.parse(localStorage.getItem(BASKET));
// }
// export function removeBasketItems() {
//   return localStorage.removeItem(BASKET);
// }

const localStorageService = {
  setTokens,
  getAccessToken,
  getUserID,
  removeAuthData,
  // setBasketItems,
  // getBasketItems,
  // removeBasketItems,
};

export default localStorageService;
