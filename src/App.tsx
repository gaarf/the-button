import React from "react";
import { ThemeProviderImpl } from "./plumbing";
import Layout from "./components/Layout";

import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";

const App: React.FC = () => {
  return (
    <ThemeProviderImpl>
      <Layout />
    </ThemeProviderImpl>
  );
};

export default App;
