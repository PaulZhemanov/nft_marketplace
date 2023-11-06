import React, { useState } from "react";
import styled from "@emotion/styled";
import logo from "@src/assets/images/bigLogo.svg";
import Input from "@components/Input";
import Button from "@components/Button";

import { useStores } from "@stores/useStores";
import { observer } from "mobx-react-lite";

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
	const { accountStore } = useStores();

	return (
		<Root>
			<a href="https://meedus.space">
				<Logo src={logo} />
			</a>
			<Input icon="search" style={{ height: 40, maxWidth: 320 }} placeholder="Search by name..." />
			<Button onClick={() => accountStore.setLoginModalOpened(true)} style={{ maxWidth: 170 }} size="medium">
				Connect wallet
			</Button>
			)
		</Root>
	);
};

export default observer(Header);
