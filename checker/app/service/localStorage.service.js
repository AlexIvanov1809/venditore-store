const TOKEN_KEY = "jwt-token";
const REFRESH_KEY = "jwt-refresh-token";
const EXPIRES_KEY = "jwt-expires";
const USERID_KEY = "user-local-id";
const BASKET = "basketItems";

export function setTokens({
  refreshToken,
  accessToken,
  userId,
  expiresIn = 3600
}) {
  const expiresDate = new Date().getTime() + expiresIn * 1000;
  localStorage.setItem(TOKEN_KEY, accessToken);
  localStorage.setItem(USERID_KEY, userId);
  localStorage.setItem(REFRESH_KEY, refreshToken);
  localStorage.setItem(EXPIRES_KEY, expiresDate);
}
export function getAccessToken() {
  return localStorage.getItem(TOKEN_KEY);
}
export function getRefreshToken() {
  return localStorage.getItem(REFRESH_KEY);
}
export function getExpiresDate() {
  return localStorage.getItem(EXPIRES_KEY);
}
export function getUserID() {
  return localStorage.getItem(USERID_KEY);
}
export function removeAuthData() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USERID_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(EXPIRES_KEY);
}
export function setBasketItems(payload) {
  localStorage.setItem(BASKET, JSON.stringify(payload));
}
export function getBasketItems() {
  return JSON.parse(localStorage.getItem(BASKET));
}
export function removeBasketItems() {
  return localStorage.removeItem(BASKET);
}

const localStorageSevice = {
  setTokens,
  getAccessToken,
  getRefreshToken,
  getExpiresDate,
  getUserID,
  removeAuthData,
  setBasketItems,
  getBasketItems,
  removeBasketItems
};

export default localStorageSevice;
