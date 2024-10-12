import axios from "axios";
import { SignInForm, SignUpForm, User } from "../store/types/auth.types";
import { IBusinessForm, Query } from "../types/business";
import { toast } from "react-toastify";

import { Offer } from "@/types/business";
import { api_url } from "@/constants/config";

type Token = {
  accessToken: string;
  refreshToken: string;
};

const API = axios.create({
  // baseURL: "https://mapi.zapminds.com/",
  baseURL: api_url,
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
    console.log({ response });
    return response;
  },
  function (error) {
    if (error.response.data.statusCode === "10003") {
      toast.error("Session Expired");
      localStorage.clear();
      window.location.href = "/";
    }
    console.log({ error });
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

/* -------------------------------------------------------------------------- */
/*                                 AUTH ROUTES                                */
/* -------------------------------------------------------------------------- */
export const sign_up = (form: SignUpForm) => API.post("/auth/register", form);
export const sign_in = (form: SignInForm) => API.post("/auth/login", form);
export const log_out = () => API.delete("/auth");
export const refresh_token = (refreshToken: string) => API.post("/auth/refresh-token", { refreshToken });

export const forgot_password = (email: string) => API.post("/auth/password/forgot", { email });
export const reset_password = (data: { password: string; resetPasswordToken: string }) => API.post(`/auth/password/reset`, data);

/* -------------------------------------------------------------------------- */
/*                               USER ENDPOINTS                               */
/* -------------------------------------------------------------------------- */
export const change_password = (data: { oldPassword: string; newPassword: string }) => API.patch(`/user/password`, data);
export const update_user_info = (data: Partial<User>) => API.patch(`/user/profile`, data);
export const send_feedback = (data: { message: string }) => API.post("user/feedback", data);
export const get_referrals = () => API.get("user/referrals");
/* -------------------------------------------------------------------------- */
/*                                  BUSINESS                                  */
/* -------------------------------------------------------------------------- */
export const get_linkId_availability = (linkId: string) => API.post("business/id-availability", { linkId });

export const get_presigned_url = (data: { key: string; content_type: string }) => API.post("/media/signed-url", data);
export const get_all_business = () => API.get("/business/all");
export const get_business = () => API.get(`/business/details/`);

export const create_business = (form: Partial<IBusinessForm>) => API.post("/business/create", form);

export const update_basic = (form: Partial<IBusinessForm>) => API.patch(`/business/update`, form);
export const update_address = (form: Partial<IBusinessForm>) => API.patch(`/business/update-address`, form);
export const update_links = (form: Partial<IBusinessForm>) => API.patch(`/business/update-links`, form);
export const update_products = (form: Partial<IBusinessForm>) => API.patch(`/business/update-products`, form);
export const update_gallery = (form: Partial<IBusinessForm>) => API.patch(`/business/update-gallery`, form);
export const update_settings = (form: Partial<IBusinessForm>) => API.patch(`/business/update-settings`, form);
export const update_calender = (form: Partial<IBusinessForm>) => API.patch(`/business/update-calender`, form);

export const get_business_enquiries = () => API.get(`/business/enquiry`);
export const update_enquiry_status = (enquiryId: string, isSolved: boolean) => API.patch(`/business/enquiry/status/${enquiryId}`, { isSolved });
//LINKS
export const get_links = () => API.get("/business/links");
export const add_link = (link: { title: string; icon: string }) => API.post("/business/links", link);

export const get_visits = (query: Query) => API.get(`/business/visits/${query.business}/?startDate=${query.startDate}&endDate=${query.endDate}`);

/* -------------------------------------------------------------------------- */
/*                                   OFFERS                                   */
/* -------------------------------------------------------------------------- */

export const get_offers = () => API.get(`/business/offer/`);
export const create_offer = (offer: Partial<Offer>) => API.post(`/business/offer`, offer);
export const update_offer = (offer: Partial<Offer>) => API.patch(`/business/offer/${offer._id}`, offer);
export const delete_offer = (offerId: string) => API.delete(`/business/offer/${offerId}`);

/* -------------------------------------------------------------------------- */
/*                                   Domain                                   */
/* -------------------------------------------------------------------------- */

export const add_domain = (domain: string) => API.post(`/business/domains`, { domain });
export const get_domain_status = () => API.get(`/business/domains`);
export const delete_domain = () => API.delete(`/business/domains `);

/* -------------------------------------------------------------------------- */
/*                                    ADMIN                                   */
/* -------------------------------------------------------------------------- */

export const get_all_users = () => API.get("/admin/users");
export const update_user_plan = (user: Partial<User>) => API.patch(`/admin/users/${user._id}/plan`, user);
