import React from "react";
import { ThemeProvider } from "./ThemeContext";
import HomeScreen from "./screens/Home";

function App() {
  return (
    <ThemeProvider>
      <HomeScreen />
    </ThemeProvider>
  );
}

export default App;
