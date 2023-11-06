import styled from "@emotion/styled";
import { observer } from "mobx-react-lite";
import React from "react";
import Item from "@screens/MarketplaceScreen/Item";
import { data } from "@src/services/ItemServices";
import Layout from "@components/Layout";
import Input from "@components/Input";
import SizedBox from "@components/SizedBox";
import Tabs from "@components/Tabs";

interface IProps {}

const Root = styled.div`
	display: flex;
	flex: 1;
	justify-content: center;
	flex-direction: column;
	align-items: center;
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

const Title = styled.div`
	font-weight: 700;
	font-size: 40px;
	line-height: 48px;
	text-align: center;
	letter-spacing: -0.01em;
	color: #000000;
	max-width: 900px;
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
const MarketplaceScreen: React.FC<IProps> = observer(() => {
	return (
		<Layout>
			<Root>
				<SizedBox height={30} />
				<Title>Explore Items on Fuel Ecosystem</Title>
				<Input
					// onChange={(e) => vm.setSearch(e.target.value)}
					icon="search"
					style={{ height: 48, maxWidth: 320 }}
					placeholder="Search in Meedus…"
				/>
				<SizedBox height={36} />
				<Tabs
					// activeTab={vm.tab}
					// setActive={vm.setTab}
					tabs={[{ name: "All" }, { name: "Unlocked" }, { name: "Locked" }]}
				/>
				<SizedBox height={40} />
				<ItemsGrid>
					{data.map((item) => (
						<Item item={item} />
					))}
				</ItemsGrid>
			</Root>
		</Layout>
	);
});

export default MarketplaceScreen;
