import AppRoutes from "./AppRoutes";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="h-screen">
      {/* <StickyNavbar /> */}
      <div className="px-[6vw] md:px-[10vw] flex justify-center">
        <AppRoutes />
      </div>
      <Footer />
    </div>
  );
}

export default App;
