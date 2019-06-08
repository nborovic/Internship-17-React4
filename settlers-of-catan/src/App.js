import React from "react";
import Game from "./components/Game";

import store from "./redux/index";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Game />
      </div>
    </Provider>
  );
}

export default App;
