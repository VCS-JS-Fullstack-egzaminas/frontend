import axios from "../utils/axios";

export const getAllReservations = async () => {
  return axios.get("/reservations");
};

export const getReservationById = async (id) => {
  return axios.get(`/reservations/${id}`);
};

export const createReservation = async (data) => {
  return axios.post("/reservations", data);
};

export const updateReservationById = async (id, data) => {
  return axios.patch(`/reservations/${id}`, data);
};

export const deleteReservationById = async (id) => {
  return axios.get(`/reservations/${id}`);
};
