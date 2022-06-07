import { makeAutoObservable } from 'mobx';

export default class UserStore {
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });

        this.getUserData()

        // setTimeout(() => {
        //     this.user = { 
        //         id: 0,
        //         username: 'John',
        //     }
        //     this.isAuthenticated = true
        // }, 1000)
    }

    user = null;
    isAuthenticated = null;
    settings = null;

    setUser = data => this.user = data
    setSettings = data => this.settings = data
    setAuthenticated = data => this.isAuthenticated = data

    getUserData = () => {
        return fetch("/get-user-data", {
            method: 'POST'
        }).then(response => {
            if (response.status === 200) {
                return response.json()
            } else {
                throw Error("Failed to get user data")
            }
        }).then(response => {
            this.setUser({ ...response });
            this.setAuthenticated(true);
            return response
        }).catch(error => {
            this.setAuthenticated(false);
            this.setUser(null);
            console.error(error);
        });
    }

    login = (credentials) => {
        return fetch('/login', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(credentials)
        }).then(response => {
            if (response.status === 200) {
                this.getUserData();
                return response;
            } else if (response.status === 400) {
                return ({ errorMessage: "Login failure: unknown user name or bad password" });
            } else {
                return ({ errorMessage: "Login failure" });
            }
        }).catch(error => {
            console.error(error)
        });
    }

    register = (credentials) => {
        return fetch(`/registration`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                username: credentials.username.value,
                password: credentials.password.value,
            })
        }).then(response => {
            if (response.status === 200) {
                return response;
            } else if (response.status === 400) {
                return ({ errorMessage: "Register failure" });
            } else {
                return ({ errorMessage: "Register failure" });
            }
        }).catch(error => {
            console.error(error)
        });
    }

    logout = () => {
        return fetch('/logout', {
            method: 'POST'
        }).then(response => {
            if (response.status === 200) {
                this.setUser(null);
                this.setAuthenticated(false);
            } else {
                this.setAuthenticated(false);
                throw Error("Logout failed");
            }
        }).catch(error => {
            console.error(error)
        });
    }

    getSettings = () => {
        return fetch("/rest/user/data", {
            method: 'POST'
        }).then(response => {
            if (response.status === 200) {
                return response
            } else {
                return ({ errorMessage: "Failure" });
            }
        }).then(response => {
            this.setSettings({ ...response });
        }).catch(error => {
            console.error(error);
        });
    }
}
