"use client";

// import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Topmenu from "./Topmenu";
import Dashboard from "./Dashboard";
import '../globals.css';

const Navbar = () => {
  const pathname = usePathname();

  // Hide Navbar only on the /login page
  if (pathname === "/login") {
    return null;
  }

  return (
    <div>
      <Topmenu />
      <Dashboard />
    </div>
  );
};

export default Navbar;
