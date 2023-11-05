import React, { useState } from "react";
import styled from "@emotion/styled";
import logo from "@src/assets/images/bigLogo.svg";
import Input from "@components/Input";
import Button from "@components/Button";
import { useFuel } from "@src/hooks/useFuel";
import { useIsConnected } from "@src/hooks/useIsConnected";
import { Fuel } from "@fuel-wallet/sdk";

const Root = styled.div`
	display: flex;
	box-sizing: border-box;
	padding: 0 16px;
	height: 80px;
	z-index: 2;
	align-items: center;
	max-width: calc(1160px + 32px);
	width: 100%;
	justify-content: space-between;
	color: white;
	@media (min-width: 1280px) {
		padding: 16px 24px;
		border-bottom: 1px solid transparent;
		background: transparent;
	}
`;

const Logo = styled.img`
	height: 48px;
	transition: transform 0.3s ease;

	&:hover {
		transform: scale(1.02);
	}
`;

const Row = styled.div`
	display: flex;
	align-items: center;
	gap: 20px;
`;

interface IProps {}

const Header: React.FC<IProps> = () => {
	const [isConnected] = useIsConnected();
	// const [fuel, error, fuelLoading] = useFuel();
	const [fuel, notDetected] = useFuel();
	return (
		<Root>
			<a href="https://meedus.space">
				<Logo src={logo} />
			</a>
			<Input icon="search" style={{ height: 40, maxWidth: 320 }} placeholder="Search by name..." />
			{isConnected ? (
				<Row>
					<Button
						// onClick={() => fuel.connect()}
						// disabled={fuel == null || fuelLoading}
						style={{ maxWidth: 170 }}
						size="medium"
					>
						View profile
					</Button>
					<Button
						onClick={() => fuel.disconnect()}
						// disabled={fuel == null || fuelLoading}
						style={{ maxWidth: 170 }}
						size="medium"
					>
						Disconnect
					</Button>
				</Row>
			) : (
				<Button
					onClick={() => fuel.connect()}
					// disabled={fuel == null || fuelLoading}
					style={{ maxWidth: 170 }}
					size="medium"
				>
					Connect wallet
				</Button>
			)}
		</Root>
	);
};

export default Header;
