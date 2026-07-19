import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    // add to cart
    addToCart: (state, action) => {
      const payload = action.payload || {};
      const id = payload.id;
      const price = payload.price;
      const quantity =
        typeof payload.quantity === "number" ? payload.quantity : 1;
      // if the product already exists in the cart
      const existingProductIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      // increment the quantity of the product
      if (existingProductIndex >= 0) {
        state.items[existingProductIndex].quantity += quantity;
      } else {
        // add product to the cart
        state.items.push({ ...action.payload, quantity });
        // state.total + action.payload.quantity
      }
      //calculate the total price
      state.total += action.payload.price * quantity;
    },

    // decrement the product

    decrement: (state, action) => {
      const existingProductIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingProductIndex >= 0) {
        const product = state.items[existingProductIndex];

        if (product.quantity > 1) {
          // Decrement quantity and reduce total
          product.quantity -= 1;
          state.total -= product.price;
        } else {
          // Remove item and subtract full amount once
          state.items.splice(existingProductIndex, 1);
          state.total -= product.price;
        }

        // Never let total go below 0
        state.total = Math.round(Math.max(state.total, 0) * 100) / 100;
      }
    },

    // remove from cart

    removeFromCart: (state, action) => {
      const existingProductIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingProductIndex >= 0) {
        const product = state.items[existingProductIndex];
        const productTotal = product.price * product.quantity;

        // Subtract and ensure total never goes below 0
        const newTotal = state.total - productTotal;
        state.total = parseFloat(Math.max(newTotal, 0).toFixed(2));

        // Remove the item from the cart
        state.items.splice(existingProductIndex, 1);
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
});

export const { addToCart, decrement, removeFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
