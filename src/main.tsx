import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Provider } from 'react-redux';
import "./index.css";

import App from './App';
import { store } from "./app/store";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/*" element={<App />}>
          </Route>
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>,
)
