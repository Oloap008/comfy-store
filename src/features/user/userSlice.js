import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const themes = {
  winter: "winter",
  dracula: "dracula",
};

const initialState = {
  user: getUserFromLocalStorage(),
  theme: getThemeFromLocalStorage(),
};

function getUserFromLocalStorage() {
  return JSON.parse(localStorage.getItem("user")) || null;
}

function getThemeFromLocalStorage() {
  const windowPreference = window.matchMedia("(prefers-color-scheme: light)")
    .matches
    ? themes.winter
    : themes.dracula;

  const theme = localStorage.getItem("theme") || windowPreference;

  document.documentElement.setAttribute("data-theme", theme);

  return theme;
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser(state, action) {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    logoutUser(state) {
      state.user = null;
      localStorage.removeItem("user");
      toast.success("Successfully logged out");
    },
    toggleTheme(state) {
      const { dracula, winter } = themes;

      state.theme = state.theme === dracula ? winter : dracula;
      document.documentElement.setAttribute("data-theme", state.theme);
      localStorage.setItem("theme", state.theme);
    },
  },
});

export const { loginUser, logoutUser, toggleTheme } = userSlice.actions;

export default userSlice.reducer;
