import RootStore from "@stores/RootStore";
import { makeAutoObservable } from "mobx";

export enum LOGIN_TYPE {
	FUEL_WALLET = "Fuel Wallet",
	FUEL_DEV = "Fuel Wallet Development",
	FUELET = "Fuelet Wallet",
	GENERATE_SEED = "Generate seed",
}

class AccountStore {
	public readonly rootStore: RootStore;

	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;
		makeAutoObservable(this);
	}

	loginModalOpened: boolean = false;
	setLoginModalOpened = (state: boolean) => (this.loginModalOpened = state);
}

export default AccountStore;
