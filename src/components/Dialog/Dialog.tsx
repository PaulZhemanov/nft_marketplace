import React from "react";
import RcDialog from "rc-dialog";
import "rc-dialog/assets/index.css";
import "./styles.css";
import {IDialogPropTypes} from "rc-dialog/lib/IDialogPropTypes";
import {ReactComponent as CloseIcon} from "@src/assets/icons/closeBtn.svg";
import styled from "@emotion/styled";
import Button from "@components/Button";
import {ItemView} from "@screens/MarketplaceScreen/ItemView";
import Text from "@components/Text";
import SizedBox from "@components/SizedBox";


const Root = styled.div`
  display: flex;
  flex-direction: column;
  //justify-content: space-between;
  padding: 30px;
  box-sizing: border-box;
  //border: 2px solid #eeeeee;
  //border-radius: 12px;
  text-align: center;
  //gap: 16px;
  & > .title {
    font-weight: 700;
    font-size: 24px;
    line-height: 32px;
  }
`;

const CloseButton = styled(Button)`
  //width: 400px;
  padding: 0;
`;


interface IProps extends IDialogPropTypes {
    title?: string;
}

const Dialog: React.FC<IProps> = ({title, children, ...rest}) => (
    <RcDialog
        closeIcon={
            rest.onClose != null ? (
                <CloseButton size="medium" kind="secondary">
                    <CloseIcon/>
                </CloseButton>
            ) : (
                <></>
            )
        }
        animation="zoom"
        maskAnimation="fade"
        {...rest}
    >
        {/*{children}*/}
        <Root>
            <Text className={'title'}>{title}</Text>
            <SizedBox height={16}/>
            <ItemView
                src="https://bafybeib3pth6j3wmt5a4xdmx2zoc7hkykhqewknhurmj3s7v7p6wvsbonq.ipfs.nftstorage.link/"/>

        </Root>

    </RcDialog>
)

export default Dialog;



