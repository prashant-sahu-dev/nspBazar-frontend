import axios from "axios";

const API = "http://localhost:8080/api/grocery";

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
