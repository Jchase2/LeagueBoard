import "./App.css";
import SidebarWithHeader from "../components/Heading/Heading";
import Champion from "../domain/Dashboard/Champion/Champion";

export const index = () => {
  return <>
  <SidebarWithHeader />
  <Champion />
  </>
};
