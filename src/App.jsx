import AppRoutes from "./AppRoutes";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div>
      {/* <StickyNavbar /> */}
      <div className="px-[10vw] flex justify-center">
        <AppRoutes />
      </div>
      <Footer />
    </div>
  );
}

export default App;
