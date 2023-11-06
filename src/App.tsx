import React from "react";
import MarketplaceScreen from "@screens/MarketplaceScreen/MarketplaceScreen";
import styled from "@emotion/styled";
import LoginScreen from "@screens/LoginScreen";
import { ROUTES } from "@src/constants";
import { Routes, Route, Navigate } from "react-router-dom";

const Root = styled.div`
	//display: flex;
	//justify-content: center;
`;

interface IProps {}

const App: React.FC<IProps> = () => {
	return (
		<Root>
			<Routes>
				<Route path={ROUTES.ROOT} element={<MarketplaceScreen />} />
				<Route path="*" element={<Navigate to={ROUTES.ROOT} />} />
			</Routes>
			<LoginScreen />
		</Root>
	);
};

export default App;
