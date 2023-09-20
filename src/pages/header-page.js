import AppHeader from "../components/app-header/app-header";
import { Outlet } from "react-router-dom";

export const HeaderPage = () => {
  return (
    <>
    <AppHeader/>
    <Outlet/>
    </>
  )
}