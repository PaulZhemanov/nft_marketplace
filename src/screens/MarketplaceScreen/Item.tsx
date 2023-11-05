import styled from "@emotion/styled";
import React, { useState } from "react";
import Button from "@components/Button";
import SizedBox from "@components/SizedBox";
import Dialog from "@components/Dialog/Dialog";
import { data, TItem } from "@src/services/ItemServices";
import Text from "@components/Text";
import ItemMeta from "@components/ItemMeta";

const Root = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: 16px;
	box-sizing: border-box;
	border: 2px solid #eeeeee;
	border-radius: 8px;
`;

interface IProps {
	item: TItem;
}

const Item: React.FC<IProps> = ({ item }) => {
	const [visible, setVisible] = useState(false);

	return (
		<Root>
			<ItemMeta item={item} />
			<SizedBox height={24} />

			<Button onClick={() => setVisible(true)}>Buy NFT</Button>
			<Dialog item={item} visible={visible} onClose={() => setVisible(false)} title="Buy NFT" />
		</Root>
	);
};

export default Item;
