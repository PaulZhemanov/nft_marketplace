import styled from "@emotion/styled";
import Button from "@components/Button";
import { observer } from "mobx-react-lite";
import React from "react";
import Header from "@components/Header";
import Item from "@screens/MarketplaceScreen/Item";
import Footer from "@components/Footer";
import { ReactComponent as Telegram } from "@src/assets/icons/telegramOutline.svg";
import { data } from "@src/services/ItemServices";

interface IProps {}

const Root = styled.div`
	display: flex;
	//flex: 1;
	justify-content: center;
	flex-direction: column;
	align-items: start;
	box-sizing: border-box;
	padding: 0 16px;
	height: 100%;
	width: 100%;
	min-height: calc(100vh - 150px);
	max-width: calc(1160px + 32px);
	@media (min-width: 1280px) {
		padding: 0 24px;
	}
`;

const BadgesGrid = styled.div`
	width: 100%;
	display: inline-grid;
	gap: 24px;
	grid-template-columns: 1fr;
	@media (min-width: 768px) {
		grid-template-columns: 1fr 1fr;
	}
	@media (min-width: 1024px) {
		grid-template-columns: 1fr 1fr 1fr 1fr;
	}
`;

const Title = styled.div`
	font-weight: 700;
	font-size: 40px;
	line-height: 48px;
	text-align: start;
	letter-spacing: -0.01em;
	color: #000000;
	max-width: 690px;
	margin-bottom: 40px;

	@media (min-width: 768px) {
		font-size: 56px;
		line-height: 64px;
		margin-bottom: 40px;
	}
`;

const ItemsGrid = styled.div`
	width: 100%;
	display: inline-grid;
	gap: 24px;
	grid-template-columns: 1fr;

	@media (min-width: 768px) {
		grid-template-columns: 1fr 1fr;
	}
	@media (min-width: 1024px) {
		grid-template-columns: 1fr 1fr 1fr;
	}
`;
const TelegramButton = styled(Button)`
	position: fixed;
	bottom: 72px;
	right: 40px;
	max-width: fit-content;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 8px;
`;
const MarketplaceScreen: React.FC<IProps> = observer(() => {
	return (
		<Root>
			<Header />
			<Title>Explore the Best Items on Fuel Ecosystem</Title>
			<ItemsGrid>
				{data.map((item) => (
					<Item item={item} />
				))}
			</ItemsGrid>
			<Footer />
			<TelegramButton kind="secondary" size="medium" onClick={() => window.open("https://t.me/meedus_nft", "_blank")}>
				<Telegram style={{ width: 20, height: 20 }} />
				Join our Telegram
			</TelegramButton>
		</Root>
	);
});

export default MarketplaceScreen;
