import styled from "@emotion/styled";
import React, {useState} from "react";
import Button from "@components/Button";
import SizedBox from "@components/SizedBox";
import Dialog from "@components/Dialog/Dialog";
import {ItemView} from "@screens/MarketplaceScreen/ItemView";
import { data, TItem } from "@src/services/ItemServices";


const Root = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: 16px;
	box-sizing: border-box;
	border: 2px solid #eeeeee;
	border-radius: 12px;
`;

interface IProps {
	item: TItem;
}

const Item: React.FC<IProps> = ({ item }) => {
	const [visible, setVisible] = useState(false);

	return (
		<Root>
			<ItemView src={item.link} />
			<SizedBox height={30} />
			<Button onClick={() => setVisible(true)}>Buy NFT</Button>
			<Dialog item={item} visible={visible} onClose={() => setVisible(false)} title="Buy NFT" />
		</Root>
	);
};

export default Item;
