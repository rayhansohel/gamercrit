import BrandLogo from "./assets/gamercrit_logo.png";
function App() {
  return (
    <div className="font-poppins flex flex-col h-screen w-full justify-center items-center">
        <h1>Hello Gamers! Welcome to</h1>
        <img src={BrandLogo} alt="Brand Logo" className="w-40 h-auto mt-4" />
        <h1 className="text-2xl uppercase">Gamer Crit</h1>
    </div>
  );
}

export default App;
;
