import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = JSON.parse(localStorage.getItem("cart")) || {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  shipping: 500,
  tax: 0,
  orderTotal: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const { itemID, amount, price } = action.payload;
      const item = state.cartItems.find((item) => item.itemID === itemID);

      if (item) {
        item.amount += amount;
      } else {
        state.cartItems.push(action.payload);
      }

      state.numItemsInCart += amount;
      state.cartTotal += amount * price;

      cartSlice.caseReducers.calculateTotals(state);

      toast.success("Item added to cart");
    },
    clearCart() {
      localStorage.setItem("cart", JSON.stringify(initialState));
      return initialState;
    },
    removeItem(state, action) {
      const { cartID } = action.payload;
      const item = state.cartItems.find((item) => item.cartID === cartID);

      state.cartItems = state.cartItems.filter(
        (item) => item.cartID !== cartID
      );

      state.numItemsInCart -= item.amount;
      state.cartTotal -= item.amount * item.price;

      cartSlice.caseReducers.calculateTotals(state);

      toast.success("Item removed from cart");
    },
    editItem(state, action) {
      const { cartID, amount } = action.payload;

      const item = state.cartItems.find((item) => item.cartID === cartID);

      state.numItemsInCart += amount - item.amount;
      state.cartTotal += item.price * (amount - item.amount);
      item.amount = amount;

      cartSlice.caseReducers.calculateTotals(state);

      toast.success("Cart updated");
    },
    calculateTotals(state) {
      state.tax = 0.1 * state.cartTotal;
      state.orderTotal = state.cartTotal + state.shipping + state.tax;
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addItem, clearCart, removeItem, editItem } = cartSlice.actions;

export default cartSlice.reducer;
