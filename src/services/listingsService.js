import axios from "../utils/axios";

export const getAllListings = async () => {
  return axios.get("/listings");
};

export const getListingById = async (id) => {
  return axios.get(`/listings/${id}`);
};

export const createListing = async (data) => {
  return axios.post("/listings", data);
};

export const updateListingById = async (id, data) => {
  return axios.patch(`/listings/${id}`, data);
};

export const deleteListingById = async (id) => {
  return axios.delete(`/listings/${id}`);
};
