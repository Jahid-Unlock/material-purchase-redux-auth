// src/components/Header.js
"use client";

import React from "react";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";

const Header = () => {
  const userData = useSelector((state) => state.auth.userData); 

  console.log(userData); 

  return (
    <div className="py-5 border-b bg-slate-100">
      <div className="container flex justify-between items-center">
        {userData ? (
          <>
            {userData.email} <Button>Logout</Button>
          </>
        ) : (
          <p>Please log in</p>
        )}
      </div>
    </div>
  );
};

export default Header;
