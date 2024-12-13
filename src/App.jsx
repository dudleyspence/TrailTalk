import AppRoutes from "./AppRoutes";
import LoginModal from "./components/Auth/LoginModel";
import Footer from "./components/Footer/Footer";
import { DynamicNavbar } from "./components/Header/Navbar";
import { HelpModel } from "./components/Utils/HelpModel";

function App() {
  return (
    <div className="min-h-screen">
      <DynamicNavbar />
      <div className="min-h-[calc(100vh-90px)] flex flex-col flex-grow justify-between">
        <LoginModal />
        <HelpModel />
        <div className="px-[6vw] md:px-[10vw] flex justify-center">
          <AppRoutes />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
