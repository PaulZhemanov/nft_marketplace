import React from "react";
import Text from "@components/Text";
import SizedBox from "@components/SizedBox";
import { TItem } from "@src/services/ItemServices";
import styled from "@emotion/styled";
import Button from "@components/Button";

const Root = styled.div``;

const ItemView = styled.img<{ src?: string; width?: string; height?: string }>`
	border-radius: 8px;
	width: ${({ width }) => (width ? width : "350px")};
	height: ${({ height }) => height};
	${({ src }) => (src == null ? "border: 2px solid #000" : `background: url(${src}) center no-repeat`)};
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
			<ItemView style={{ height: `${width}px` }} width={width} src={item.link} />
			<Wrapper>
				<Text size="title" weight={700}>
					{item.name}
				</Text>
				<Text size="medium">{item.description}</Text>
			</Wrapper>

			<SizedBox height={10} />
		</Root>
	);
};

export default ItemMeta;
