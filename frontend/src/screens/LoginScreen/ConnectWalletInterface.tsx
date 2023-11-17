import React from "react";
import Text from "@components/Text";
import SizedBox from "@components/SizedBox";
import Button from "@components/Button";
import { LOGIN_TYPE } from "@stores/AccountStore";
import { useStores } from "@stores/useStores";
import { observer } from "mobx-react-lite";

interface IProps {}

const ConnectWalletInterface: React.FC<IProps> = observer(() => {
	const { accountStore } = useStores();
	const wallets = [
		{
			name: "Fuel Wallet",
			type: LOGIN_TYPE.FUEL_WALLET,
			active: accountStore.listConnectors.includes(LOGIN_TYPE.FUEL_WALLET),
		},
		{
			name: "Fuelet",
			type: LOGIN_TYPE.FUELET,
			active: accountStore.listConnectors.includes(LOGIN_TYPE.FUELET),
		},

		{ name: "Metamask", active: false },
	];

	return (
		<>
			<Text weight={700} size="large" textAlign="center">
				Connect wallet
			</Text>
			<SizedBox height={40} />
			{wallets.map(({ name, active, type }) => (
				<Button
					key={name}
					style={{ marginBottom: 16, maxWidth: 360 }}
					kind="secondary"
					onClick={() => active && type && accountStore.login(type)}
					disabled={!active}
				>
					{name}
				</Button>
			))}
		</>
	);
});
export default ConnectWalletInterface;
