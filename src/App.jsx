import { Outlet } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./components/Footer";


function App() {
  return (
    <div className="font-poppins bg-base-300 min-h-screen">
      <div className="sticky top-0 z-50 pt-4">
        {/* Common header */}
        <Header />
      </div>
      <div className="flex gap-4 items-center justify-center min-h-[calc(100vh-160px)]">
        {/* load Content here */}
        <Outlet />
        </div>
          <div className="pb-4">
            {/* Copyright footer */}
            <Footer />
          </div>
      </div>
  );
}

export default App;
