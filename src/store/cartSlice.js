import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],   // [{ id, name, price, quantity, storeId, ... }]
  storeId: null, // currently locked store or null
};

const cartSlice = createSlice({
  name: "cart",
  initialState ,

  reducers: {
    addToCart: (state, action) => {
      // action.payload = full product object
      const item = action.payload;
      const incomingStore = item.storeId;

      // 1️⃣ If cart empty → set storeId
      if (state.items.length === 0) {
        state.storeId = incomingStore;
      }

      // 2️⃣ If trying to add item from different store → reject
      if (state.storeId !== incomingStore) {
        throw new Error("DIFFERENT_STORE");
      }

      const exist = state.items.find((p) => p._id === item._id);

      if (exist) {
        exist.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter((p) => p._id !== action.payload);

      // 4️⃣ If cart becomes empty → reset store
      if (state.items.length === 0) {
        state.storeId = null;
      }
    },

    increaseQty: (state, action) => {
      const item = state.items.find((p) => p._id === action.payload);
      if (item) item.quantity++;
    },

    decreaseQty: (state, action) => {
      const item = state.items.find((p) => p._id === action.payload);
      if (item && item.quantity > 1) item.quantity--;
      else {
        state.items = state.items.filter((p) => p._id !== action.payload);
        // 4️⃣ If cart becomes empty → reset store
        if (state.items.length === 0) {
          state.storeId = null;
        }
      }
    },

    clearCart: (state) => {
      state.storeId = null;
      state.items = [] ;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
