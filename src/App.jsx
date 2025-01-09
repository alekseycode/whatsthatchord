import Keyboard from "./components/Keyboard";

function App() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-blue-600 text-4xl m-10">Whats that chord?</h1>
      <div className="flex justify-center">
        <Keyboard />
      </div>
    </div>
  );
}

export default App;
