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
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});
export const selectTotalItems = createSelector(
  (state) => state.cart.cartItems,
  (cartItems) => cartItems.reduce((acc, item) => acc + item.quantity, 0)
);

export const selectTotalPrice = createSelector(
  (state) => state.cart.cartItems,
  (cartItems) =>
    cartItems.reduce(
      (acc, item) => acc + item.quantity * (parseFloat(item.unitPrice) || 0),
      0
    )
);

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  deleteFromChart,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;

// Videti kako napraviti POST request
// Iz forme pokupiti inpute i poslati ih u obliku koji server ocekuje (ako oni ocekuju da se adresa polje zove adres kod mene se u statu ne moze zvati sreet)
// Nakon uspesno responsa navigovati na posebnu stranicu sa tim order id-em i ostaviti prazno za sada
