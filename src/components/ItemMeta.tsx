import React from "react";
import Text from "@components/Text";
import SizedBox from "@components/SizedBox";
import { TItem } from "@src/services/ItemServices";
import styled from "@emotion/styled";

const Root = styled.div``;

const ItemPreview = styled.img<{ src?: string }>`
	width: 100%;
	border-radius: 8px;
	transition: transform 0.3s;
	${({ src }) =>
		src == null
			? "border: 2px solid #000"
			: `background: url(${src}) 
		center no-repeat`};
	background-size: cover;

	&:hover {
		transform: scale(1.01);
	}
`;
const Wrapper = styled.div`
	padding: 8px;
`;

interface IProps {
	item: TItem;
	width?: string;
	height?: string;
}

const ItemMeta: React.FC<IProps> = ({ item, width, height }) => {
	return (
		<Root>
			<ItemPreview style={{ height: `${width}px` }} src={item.link} />
			<Wrapper>
				<Text size="title" weight={700}>
					{item.name}
				</Text>
				<Text size="medium">{item.description}</Text>
			</Wrapper>
		</Root>
	);
};

export default ItemMeta;
