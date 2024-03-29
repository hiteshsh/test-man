import React from "react";
//import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "./App";
import { AuthProvider } from "./context/AuthProvider";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App tab="home" />);

//ReactDOM.render(<App />, document.getElementById('root'));
