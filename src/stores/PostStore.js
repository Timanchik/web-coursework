import { makeAutoObservable } from 'mobx';
import { getFormData } from '../utils/getFormData';

export default class PostStore {
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    addPost = (post) => {
        const formData = getFormData(post)
        return fetch("/create-post", {
            method: 'POST',
            body: formData
        }).then(response => {
            return response
        }).catch(error => {
            console.error(error);
        });
    }

    like = (postId) => {
        return fetch("/like", {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ id: postId })
        }).then(response => {
            if (response?.status === 200) {
                return response
            } else {
                throw Error("Failed to like")
            }
        }).catch(error => {
            console.error(error);
        });
    }

    deletePost = (postId) => {
        return fetch("/delete-post", {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ id: postId })
        }).then(response => {
            if (response?.status === 200) {
                return response
            } else {
                throw Error("Failed to delete post")
            }
        }).catch(error => {
            console.error(error);
        });
    }
}
