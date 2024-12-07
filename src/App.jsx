import AppRoutes from "./AppRoutes";
import LoginModal from "./components/Auth/LoginModel";
import Footer from "./components/Footer/Footer";
import { DynamicNavbar } from "./components/header/Navbar";

function App() {
  return (
    <div className="min-h-screen">
      <DynamicNavbar />
      <LoginModal />
      <div className="px-[6vw] md:px-[10vw] flex justify-center">
        <AppRoutes />
      </div>
      <Footer />
    </div>
  );
}

export default App;
