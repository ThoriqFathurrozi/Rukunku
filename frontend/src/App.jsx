import { Link } from "react-router";
import { Button } from "./components/ui/button";

function App() {
  return (
    <>
      <div className="App flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-blue-500">Welcome to the Rukunku App</h1>
        <p>This is a simple React application. for simplefy RT</p>
        <Link to="/login">
          <Button>Login</Button>
        </Link>
      </div>
    </>
  );
}

export default App;
