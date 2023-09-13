import React from "react";
import "./index.css";
import App from "./App";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import { createRoot } from "react-dom/client";

// Get the root element where the React component will be rendered
const rootElement = document.getElementById("root");

// Create a root for the React component tree
const root = createRoot(rootElement);

// Render the top-level React component into the root
root.render(<App />);
