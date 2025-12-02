import { configureStore } from "@reduxjs/toolkit";
import itemSlice from "./itemSlice";
import fetchStatusSlice, { fetchStatusActions } from "./fetchStatusSlice";
import cartSlice from "./cartSlice";
import descriptionSlice from "./descriptionSlice";
import myItemsSlice from "./myItemsSlice";
import wishlistSlice from "./wishlistSlice";
import isLoginSlice from "./isLoginSlice";
import shopSlice from "./shopSlice";

const myntraStore = configureStore({
  reducer: {
    items: itemSlice.reducer,
    fetchStatus: fetchStatusSlice.reducer,
    cart: cartSlice.reducer,
    shops: shopSlice.reducer,
    description: descriptionSlice.reducer,
    myItems: myItemsSlice.reducer,
    wishlist: wishlistSlice.reducer,
    isLogin: isLoginSlice.reducer,
  },
});

export default myntraStore;
