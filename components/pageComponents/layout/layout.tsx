"use client";

import React, { ReactNode } from "react";

import { store } from "@/store/store";
import { Provider } from "react-redux";
import Header from "./components/header/header";

import "@/styles/index.scss";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <html lang="ru">
      <Provider store={store}>
        <body>
          <Header />
          {children}
        </body>
      </Provider>
    </html>
  );
}
