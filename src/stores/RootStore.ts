import { makeAutoObservable } from "mobx";
import AccountStore from "@stores/AccountStore";

export default class RootStore {
	public accountStore: AccountStore;

	constructor(_: any) {
		this.accountStore = new AccountStore(this);
		makeAutoObservable(this);
	}

	serialize = () => ({});
}
