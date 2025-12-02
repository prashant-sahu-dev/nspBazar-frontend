import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL;

export const fetchAllShops = async () => {
  return axios.get(`${API}/shops`);
};

export const fetchItemsByShop = async (shopId) => {
  return axios.get(`${API}/${shopId}/items`);
};

export const addItemToShop = async (itemData) => {
  return axios.post(`${API}/${itemData.shopId}/item`, itemData);
}

export const editShopItem = async (itemId, updatedData) => {
  return axios.put(`${API}/item/${itemId}`, updatedData);
}

export const removeShopItem = async (itemId) => {
  return axios.delete(`${API}/item/${itemId}`);
}
