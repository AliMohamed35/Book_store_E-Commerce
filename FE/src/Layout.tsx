// src/components/Layout.tsx
import { Outlet } from "react-router-dom";
import Header from "./components/header";

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet /> {/* This renders the matched child route */}
      </main>
    </>
  );
};

export default Layout;
