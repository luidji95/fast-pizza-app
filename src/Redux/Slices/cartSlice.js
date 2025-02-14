import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find((i) => i.id === item.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({
          ...item,
          quantity: 1,
        });
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.cartItems.find((i) => i.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },

    decrementQuantity: (state, action) => {
      const item = state.cartItems.find((i) => i.id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.cartItems = state.cartItems.filter(
            (i) => i.id !== action.payload
          );
        }
      }
    },
    deleteFromChart: (state, action) => {
      state.cartItems = state.cartItems.filter((i) => i.id !== action.payload);
    },
  },
});
// export const selectTotalItems = createSelector(
//   (state) => state.cart.cartItems,
//   (cartItems) => cartItems.reduce((acc, item) => acc + item.quantity, 0)
// );

// // Selektor za ukupnu cenu
// export const selectTotalPrice = createSelector(
//   (state) => state.cart.cartItems,
//   (cartItems) =>
//     cartItems.reduce(
//       (acc, item) => acc + item.quantity * parseFloat(item.price || 0),
//       0
//     )
// );

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  deleteFromChart,
} = cartSlice.actions;
export default cartSlice.reducer;
