import React from 'react';
import MarketplaceScreen from "@screens/MarketplaceScreen/MarketplaceScreen";
import styled from "@emotion/styled";

const Root = styled.div`
  display: flex;
  justify-content: center;
`

function App() {
  return (
      <Root>
        <MarketplaceScreen/>
      </Root>
  );
}

export default App;
