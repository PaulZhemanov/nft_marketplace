import React from "react";
import MarketplaceScreen from "@screens/MarketplaceScreen/MarketplaceScreen";
import LoginScreen from "@screens/LoginScreen/LoginScreen";
import { ROUTES } from "@src/constants";
import { Routes, Route, Navigate } from "react-router-dom";
import styled from "@emotion/styled";

interface IProps {}

const Root = styled.div``;

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
