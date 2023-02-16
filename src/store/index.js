import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import rootReducer from "./root-reducer";

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
  devTools: process.env.NODE_ENV !== "production",
});

// if (process.env.NODE_ENV === "development" && module.hot) {
//   module.hot.accept("./rootReducer", () => {
//     const newRootReducer = require("./rootReducer").default;
//     store.replaceReducer(newRootReducer);
//   });
// }
export default store;
