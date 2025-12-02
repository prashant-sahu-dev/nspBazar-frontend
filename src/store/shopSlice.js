import { createSlice } from "@reduxjs/toolkit";
import { addItemToShop } from "../services/shopService";
import { Edit } from "lucide-react";

const shopSlice = createSlice({
  name: "shops",
  initialState: {
    shops: [],
    items: {}, // { shopId: [items] }
    // loading: false,
    error: null,
  },

  reducers: {
    setShops: (state, action) => {
      state.shops = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },

    setItemsForShop: (state, action) => {
      const { shopId, items } = action.payload;
      state.items[shopId] = items;
      console.log("Item added to shop slice:", state.items);
    },
    addItemToShop: (state, action) => {
      const { shopId, item } = action.payload;
      if (!state.items[shopId]) {
        state.items[shopId] = [];
      }
      state.items[shopId].push(item);
      
    },
    removeItemFromShop: (state, action) => {
      const { shopId, itemId } = action.payload;
      const items = state.items[shopId];
      console.log("Removing item:", itemId, "from shop:", shopId);
      console.log("array before deletion:", JSON.parse(JSON.stringify(state.items)));
      if (items) {
        state.items[shopId] = items.filter((item) => item._id !== itemId);
      }
      console.log("array after deletion:", JSON.parse(JSON.stringify(state.items)));
    },
    editItemInShop: (state, action) => {
      const { shopId, itemId, updatedItem } = action.payload;
      console.log("Editing item:", itemId, "in shop:", shopId, "with data:", updatedItem);
      const items = state.items[shopId];
   
      if (items) {
        const index = items.findIndex((item) => item._id === itemId);
        if (index !== -1) {
          items[index] =  updatedItem ;
        }
      }
      console.log("Updated items:", state.items[shopId]);
    },
  },
});

export const shopActions = shopSlice.actions;
export default shopSlice;
