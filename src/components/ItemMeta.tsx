import React from "react";
import Text from "@components/Text";
import SizedBox from "@components/SizedBox";
import { TItem } from "@src/services/ItemServices";
import styled from "@emotion/styled";

const Root = styled.div``;
const ItemView = styled.img<{ src?: string }>`
	width: 100%;
	border-radius: 8px;
	transition: transform 0.3s;
	${({ src }) => (src == null ? "border: 2px solid #000" : `background: url(${src}) center no-repeat`)};
	background-size: cover;

	&:hover {
		transform: scale(1.01);
	}
`;

interface IProps {
	item: TItem;
}

const ItemMeta: React.FC<IProps> = ({ item }) => {
	return (
		<Root>
			<ItemView src={item.link} />
			<Text size="title" weight={700}>
				<SizedBox height={16} />
				{item.name}
			</Text>
			<Text size="medium">{item.description}</Text>
			<SizedBox height={10} />
		</Root>
	);
};

export default ItemMeta;
