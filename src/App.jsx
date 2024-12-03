import Header from "./components/Header/Header";
import SiteLogicProvider from "./components/SiteLogicProvider";
import { UserProvider } from "./context/UserContext.jsx";
import Footer from "./components/Footer/Footer";
import { StickyNavbar } from "./components/Header/Navbar.jsx";

function App() {
  return (
    <div id="page-container">
      <UserProvider>
        <StickyNavbar />
        <SiteLogicProvider />
        <Footer />
      </UserProvider>
    </div>
  );
}

export default App;
