import { createSlice } from "@reduxjs/toolkit";

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

      if (!existingItem) {
        state.cartItems.push({ ...item, quantity: 1 }); // ✅ Dodajemo proizvod sa početnom količinom 1
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.cartItems.find((i) => i.id === action.payload);
      if (item) {
        item.quantity += 1; // ✅ Povećavamo količinu
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.cartItems.find((i) => i.id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1; // ✅ Smanjujemo količinu
        } else {
          state.cartItems = state.cartItems.filter(
            (i) => i.id !== action.payload
          ); // ✅ Brišemo ako je 0
        }
      }
    },
    deleteFromChart: (state, action) => {
      state.cartItems = state.cartItems.filter((i) => i.id !== action.payload);
    },
  },
});

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  deleteFromChart,
} = cartSlice.actions;
export default cartSlice.reducer;
