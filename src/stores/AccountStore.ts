import RootStore from "@stores/RootStore";
import { makeAutoObservable } from "mobx";

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
