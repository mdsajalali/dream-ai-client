"use client";
import React, { ReactNode } from "react";
import { FavProvider } from "./FavoriteContext";

const WrapperProvider = ({ children }: { children: ReactNode }) => {
  return <FavProvider>{children}</FavProvider>;
};

export default WrapperProvider;
