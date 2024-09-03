
"use client";

import { useSelector } from 'react-redux';
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';

const Header = () => {

  const email = useSelector((state) => state.auth.email);

  const router = useRouter()

  const logoutFunc = ()=>{
    Cookies.remove('authToken');
    router.refresh()
    toast.success("Logout Success!")
  }

  return (
    <div className="py-5 border-b bg-slate-100">
      <div className="container flex justify-between items-center">
        {email && email} <Button onClick={()=> logoutFunc()} variant={"outline"}>Logout</Button>
      </div>
    </div>
  );
};

export default Header;
