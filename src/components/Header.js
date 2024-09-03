// src/components/Header.js
"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";

const Header = () => {
  const userData = useSelector((state) => state.auth.userData);

  const [email, setEmail] = useState("");

  useEffect(() => {
    const authData = localStorage.getItem("auth");

    if (authData) {
      try {
        const parsedAuthData = JSON.parse(authData);
        if (parsedAuthData?.email) {
          setEmail(parsedAuthData.email);
        }
      } catch (error) {
        console.error("Error parsing local storage data:", error);
      }
    }
  }, []);

  return (
    <div className="py-5 border-b bg-slate-100">
      <div className="container flex justify-between items-center">
        {email ? email : "..."} <Button variant={"outline"}>Logout</Button>
      </div>
    </div>
  );
};

export default Header;
