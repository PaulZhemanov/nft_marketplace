import React from "react";
import { observer } from "mobx-react-lite";
import SizedBox from "@components/SizedBox";
import { useStores } from "@stores/useStores";
import Text from "@components/Text";
import styled from "@emotion/styled";
import { Row } from "@components/Flex";
import pic from "@src/assets/images/connectWalletPic.png";
import Layout from "@components/Layout";
import LoginScreenHeader from "@screens/LoginScreen/LoginScreenHeader";
import { Anchor } from "@components/Anchor";
import ConnectWalletInterface from "@screens/LoginScreen/ConnectWalletInterface";

interface IProps {}

const Root = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background: #ffffff;
	z-index: 10;
	padding: 16px;
	width: 100%;
	box-sizing: border-box;
	@media (min-width: 480px) {
		padding: 16px 0;
	}
	@media (min-width: 1280px) {
		padding: 40px 0;
	}
`;

const Pic = styled.div`
	background: url(${pic}) center no-repeat #eeeeee;
	background-size: contain;
	min-width: 640px;
	height: 100vh;
	display: none;
	margin-top: -80px;
	z-index: 1;
	@media (min-width: 1280px) {
		display: flex;
	}
`;

const layoutStyle: React.CSSProperties = {
	position: "fixed",
	top: 0,
	left: 0,
	bottom: 0,
	right: 0,
	// zIndex: 10,
	background: "#fff",
};

const LoginScreen: React.FC<IProps> = () => {
	const { accountStore } = useStores();
	if (!accountStore.loginModalOpened) return null;
	return (
		<Layout style={layoutStyle} header={<LoginScreenHeader />} footer={<></>}>
			<Row alignItems="center">
				<Pic />
				<Root>
					<ConnectWalletInterface />
					<SizedBox height={8} />
					<Text weight={500} size="medium" textAlign="center">
						<span> New to Fuel blockchain?</span> <br />
						<Anchor style={{ color: "#269995" }} href="https://wallet.fuel.network/docs/install/">
							Learn more about wallets
						</Anchor>
					</Text>
					<SizedBox height={116} />
				</Root>
			</Row>
		</Layout>
	);
};
export default observer(LoginScreen);
