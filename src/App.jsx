import Keyboard from "./components/Keyboard";

function App() {
  return (
    <>
      <h1 className="flex justify-center text-blue-600 text-4xl m-10">
        Whats that chord?
      </h1>
      <div className="flex justify-center">
        <Keyboard />
      </div>
    </>
  );
}

export default App;
