import { Routes, Route } from "react-router-dom";
import ArrayRoutes from "./Constants/ArrayRoutes.js";

// hooks react redux
import { Provider } from "react-redux";
import generateStore from "./Redux/Store";

// components
import Header from "./Components/Header.js";

// style
import "./App.css";

function App() {
  const store = generateStore();
  return (
    <div className="App">
      <Provider store={store}>
        <Header />
        <Routes>
          {ArrayRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.children} />
          ))}
        </Routes>
      </Provider>
    </div>
  );
}

export default App;
