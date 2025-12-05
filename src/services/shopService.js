import axios from "axios";

const API = `${import.meta.env.VITE_API_BASE_URL}/grocery`;

export const fetchAllShops = async () => {
  return axios.get(`${API}/shops`);
};

export const fetchItemsByShop = async (shopId) => {
  return axios.get(`${API}/${shopId}/items`);
};


export const addItemToShop = (formData) => {
  return axios.post(`${API}/${formData.get("shopId")}/item`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const editShopItem = async (itemId, updatedData, isMultipart) => {
  if(isMultipart){
  return axios.put(`${API}/item/${itemId}`, updatedData, {
    headers:{
      "Content-Type" : "multipart/form-data",
    }
  });
}
  else{
    return axios.put(`${API}/item/${itemId}`, updatedData);
  }
}

export const removeShopItem = async (itemId) => {
  return axios.delete(`${API}/item/${itemId}`);
}
