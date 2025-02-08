"use client";

import { jwtDecode, JwtPayload } from "jwt-decode";
import { useEffect, useState } from "react";

const JwtDecode = () => {
  const [decodedToken, setDecodedToken] = useState<JwtPayload | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      if (token) {
        try {
          const decoded: JwtPayload = jwtDecode<JwtPayload>(token);
          setDecodedToken(decoded);
        } catch (error) {
          console.error("Invalid token", error);
        }
      }
    }
  }, []);

  return decodedToken;
};

export default JwtDecode;
