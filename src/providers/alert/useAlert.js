import { useContext } from "react";
import AlertContext from "./AlertProvider";

export const useAlert = () => useContext(AlertContext);
