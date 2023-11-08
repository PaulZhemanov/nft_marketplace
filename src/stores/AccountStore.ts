import RootStore from "@stores/RootStore";
import { makeAutoObservable } from "mobx";
import { Fuel, FuelWalletProvider } from "@fuel-wallet/sdk";
import { NODE_URL } from "@src/constants";

export enum LOGIN_TYPE {
	FUEL_WALLET = "Fuel Wallet",
	FUELET = "Fuelet Wallet",
}

export interface ISerializedAccountStore {
	address: string | null;
	loginType: LOGIN_TYPE | null;
	seed: string | null;
}

class AccountStore {
	public readonly rootStore: RootStore;

	constructor(rootStore: RootStore, initState?: ISerializedAccountStore) {
		makeAutoObservable(this);

		this.rootStore = rootStore;
		if (initState) {
			this.setLoginType(initState.loginType);
		}
		this.initFuel();
	}

	initFuel = () => {
		const fuel = new Fuel();
		this.setFuel(fuel);
		fuel.on(fuel.events.connectors, (connectors: Record<number, { name: string }>) => {
			const arr: any[] = Object.values(connectors).map((c) => c.name);
			this.setListConnectors(arr);
		});
		fuel?.on(this.fuel?.events?.currentAccount, (address: string) => this.setAddress(address));
		fuel?.on(this.fuel?.events?.network, this.handleNetworkEvent);
	};

	listConnectors: string[] = [];
	setListConnectors = (value: string[]) => (this.listConnectors = value);

	fuel: any = null;
	setFuel = (fuel: any) => (this.fuel = fuel);

	handleNetworkEvent = (network: FuelWalletProvider) => {
		if (network.url !== NODE_URL) {
			this.rootStore.notificationStore.toast(`Please change network url to Testnet Beta 4`);
		}
	};

	public address: string | null = null;
	setAddress = (address: string | null) => (this.address = address);

	public loginType: LOGIN_TYPE | null = null;
	setLoginType = (loginType: LOGIN_TYPE | null) => (this.loginType = loginType);

	login = async (loginType: LOGIN_TYPE) => {
		console.log("login", loginType);
		this.setLoginType(loginType);
		await this.loginWithWallet(loginType);
	};

	loginWithWallet = async (connector: LOGIN_TYPE) => {
		try {
			await this.fuel.selectConnector(connector);
			await this.fuel.connect();
			const account = await this.fuel.currentAccount();
			const provider = await this.fuel.getProvider();
			if (provider.url !== NODE_URL) {
				this.rootStore.notificationStore.toast(`Please change network url to beta 4`);
			}
			this.setAddress(account);
		} catch (e) {
			this.rootStore.notificationStore.toast(e?.toString(), {
				type: "error",
			});
			return;
		}
	};

	loginModalOpened: boolean = false;
	setLoginModalOpened = (state: boolean) => (this.loginModalOpened = state);
}

export default AccountStore;
