import axios from "axios";
import { SignInForm, SignUpForm, User } from "../store/types/auth.types";
import { IBusinessForm } from "../types/business";
import { toast } from "react-toastify";

type Token = {
  accessToken: string;
  refreshToken: string;
};

const API = axios.create({
  baseURL: "https://mapi.zapminds.com/",
  // baseURL: "http://localhost:8080",
  // baseURL: "https://9b37-2406-7400-98-df77-61dd-533e-fa3d-9f42.ngrok-free.app/",
});

function get_token() {
  const tokenSerial = localStorage.getItem("token");
  const tokenJSON: Token | null = tokenSerial ? JSON.parse(tokenSerial) : null;
  const token = tokenJSON?.accessToken;
  return token;
}

API.interceptors.request.use((req) => {
  const token = get_token();
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
    req.headers["ngrok-skip-browser-warning"] = "true";
  }

  return req;
});

// Add a response interceptor
API.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    if (error.response.data.message === "Invalid Access Token") {
      toast.error("Session Expired");
      localStorage.clear();
      window.location.href = "/";
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

//AUTH
export const sign_up = (form: SignUpForm) => API.post("/signup/basic", form);
export const sign_in = (form: SignInForm) => API.post("/login/basic", form);
export const log_out = () => API.delete("/logout");
export const refresh_token = (refreshToken: string) =>
  API.post("/token/refresh", { refreshToken });
export const forgot_password = (email: string) =>
  API.post("/forgot-password", { email });
export const reset_password = (data: {
  password: string;
  resetPasswordToken: string;
}) => API.post(`/forgot-password/reset`, data);
export const change_password = (data: {
  oldPassword: string;
  newPassword: string;
}) => API.patch(`/change-password`, data);

export const update_user_info = (data: Partial<User>) =>
  API.patch(`/update-info`, data);

//Feedback
export const send_feedback = (data: { message: string }) =>
  API.post("user/feedback", data);

//IMAGE UPLOAD
export const get_presigned_url = (data: {
  key: string;
  content_type: string;
}) => API.post("/media/signed-url", data);

//BUSINESS
export const get_linkId_availability = (linkId: string) =>
  API.post("business/id-availability", { linkId });
export const get_all_business = () => API.get("/business/all");
export const get_business = (id: string) => API.get(`/business/details/${id}`);

export const create_business = (form: Partial<IBusinessForm>) =>
  API.post("/business/create", form);

export const update_basic = (form: Partial<IBusinessForm>) =>
  API.patch(`/business/update`, form);
export const update_address = (form: Partial<IBusinessForm>) =>
  API.patch(`/business/update-address`, form);
export const update_links = (form: Partial<IBusinessForm>) =>
  API.patch(`/business/update-links`, form);
export const update_products = (form: Partial<IBusinessForm>) =>
  API.patch(`/business/update-products`, form);
export const update_gallery = (form: Partial<IBusinessForm>) =>
  API.patch(`/business/update-gallery`, form);
export const update_settings = (form: Partial<IBusinessForm>) =>
  API.patch(`/business/update-settings`, form);
export const update_calender = (form: Partial<IBusinessForm>) =>
  API.patch(`/business/update-calender`, form);
//LINKS
export const get_links = () => API.get("/business/links");
export const add_link = (link: { title: string; icon: string }) =>
  API.post("/business/link", link);

export const get_business_enquiries = (businessId: string) =>
  API.get(`/enquiry/get/${businessId}`);
