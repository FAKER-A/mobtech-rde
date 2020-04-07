import Cookie from "js-cookie";
window.cookiejs = Cookie;
const isProd = process.env.NODE_ENV === "production";
window.env = process.env;
export function toLogin() {
  let backUrl = window.location.href;
  let host = isProd ? "id.aaa.mob.com" : "ids.fe.beta.mob.com";
  let url = `http://${host}/?entry=${encodeURIComponent(backUrl)}`;
  window.location.href = url;
}
export function checkLogin() {
  let token = Cookie.get("mobdata_token");
  return !!token;
}

export function getToken() {
  let token = Cookie.get("mobdata_token");
  return token;
}

export function getUser() {
  let user = Cookie.get("mobDataaccount");
  return user;
}

export function logout() {
  Cookie.remove("mobdata_token", { domain: "mob.com" });
  window.location.reload();
}

export * from "./hooks";
