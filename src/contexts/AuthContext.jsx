import { createContext, useContext } from "react";

// Create AuthContext
export const AuthContext = createContext();

// Custom Hook for consuming AuthContext
export const useAuth = () => useContext(AuthContext);

