// Modules.
import React from "react";
import styled from "styled-components";

// Components.
import Grid from "components/Grid";

// Context.
import { StoredCardsProvider } from "hooks/useStoredCards";

// Static.
import logo from "./logo.svg";

// Style.
import "./App.scss";

// Styled.
const PageContainer = styled.div`
  padding: 0 5vw;
`;

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="App-title">
          <h1>Better Notion</h1>
          <h2>Prototype</h2>
        </div>
      </div>
      <StoredCardsProvider userId={"1234"}>
        <PageContainer>
          <Grid />
        </PageContainer>
      </StoredCardsProvider>
    </div>
  );
};

export default App;
