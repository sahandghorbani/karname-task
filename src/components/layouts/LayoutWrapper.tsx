"use client";
import { FC, ReactNode } from "react";
import { Provider } from "react-redux";
import store from "@/store/store/store";

export const LayoutWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Provider store={store}>
      <>{children}</>
    </Provider>
  );
};
