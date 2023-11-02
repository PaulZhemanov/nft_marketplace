import React from "react";
import RcDialog from "rc-dialog";
import "rc-dialog/assets/index.css";
import "./styles.css";
import { IDialogPropTypes } from "rc-dialog/lib/IDialogPropTypes";
import { ReactComponent as CloseIcon } from "@src/assets/icons/closeBtn.svg";
import styled from "@emotion/styled";
import Button from "@components/Button";
import Text from "@components/Text";
import SizedBox from "@components/SizedBox";
import { TItem } from "@src/services/ItemServices";
import ItemMeta from "@components/ItemMeta";

const Root = styled.div`
	//width:266px;
	display: flex;
	flex-direction: column;
	//justify-content: space-between;
	padding: 20px;
	box-sizing: border-box;
	//border: 2px solid #eeeeee;
	//border-radius: 120px;
	text-align: center;
	& > .title {
		font-weight: 700;
		font-size: 24px;
		line-height: 32px;
	}
`;

const CloseButton = styled(Button)`
	padding: 0;
`;

interface IProps extends IDialogPropTypes {
	item: TItem;
	title?: string;
}

const Dialog: React.FC<IProps> = ({ item, title, children, ...rest }) => (
	<RcDialog
		closeIcon={
			rest.onClose != null ? (
				<CloseButton size="medium" kind="secondary">
					<CloseIcon />
				</CloseButton>
			) : (
				<></>
			)
		}
		animation="zoom"
		maskAnimation="fade"
		{...rest}
	>
		{children}
		<Root>
			<Text  className={"title"}>{title}</Text>
			<SizedBox height={16} />
			<ItemMeta item={item}
					  width='266px'
					  height= '266px'

			/>
			<Text className="title">Price {item.price}</Text>

			<Button>Buy for {item.price}</Button>
		</Root>
	</RcDialog>
);

export default Dialog;
