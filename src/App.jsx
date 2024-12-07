import { Outlet } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="font-poppins text-sm bg-base-300 min-h-screen">
      <div className="sticky top-0 z-50 pt-4">
        {/* Common header */}
        <Header />
      </div>
      <div className="min-h-[calc(100vh-404px)]">
        {/* load Content here */}
        <Outlet />
      </div>
      <div className="py-4 bg-base-content">
        {/* Copyright footer */}
        <Footer />
      </div>
    </div>
  );
}

export default App;
