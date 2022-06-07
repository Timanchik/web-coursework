import { reaction } from "mobx";
import UserStore from "./UserStore";
import PostStore from "./PostStore";

export default class RootStore {
    constructor() {
        this.userStore = new UserStore();

        reaction(() => this.userStore.isAuthenticated, (isAuthenticated, prevValue, reaction) => {
            if (isAuthenticated) {
                this.postStore = new PostStore();
            } else {

            }
        });
    }
} 
