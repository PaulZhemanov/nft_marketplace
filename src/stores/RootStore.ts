import { makeAutoObservable } from "mobx";
import AccountStore from "@stores/AccountStore";
import NotificationStore from "@stores/NotificationStore";

export default class RootStore {
	public accountStore: AccountStore;
	public notificationStore: NotificationStore;

	constructor(_: any) {
		this.accountStore = new AccountStore(this);
		this.notificationStore = new NotificationStore(this);
		makeAutoObservable(this);
	}

	serialize = () => ({});
}
