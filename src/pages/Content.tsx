import React from "react";
import { Route, Routes } from "react-router-dom";
import Categories from "./Categories";
import Customers from "./Customers";
import Emloyees from "./Emloyees";
import Products from "./Products";
import Suppliers from "./Suppliers";
import Orders from "./Orders";

function Content() {
  return (
    <div className="w-full">
      <Routes>
        <Route path="/" element={<Products />}></Route>
        <Route path="/categories" element={<Categories />}></Route>
        <Route path="/employee" element={<Emloyees />}></Route>
        <Route path="/suppliers" element={<Suppliers />}></Route>
        <Route path="/customers" element={<Customers />}></Route>
        <Route path="/orders" element={<Orders />}></Route>
      </Routes>
    </div>
  );
}

export default Content;
