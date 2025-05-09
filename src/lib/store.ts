import { browser } from "$app/environment";
import { writable } from 'svelte/store';

interface User {
    id: number | null;
    email: string | null;
    name: string | null;
}



export const user = writable<User>(
    browser && localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")!)
        : { email: null, name: null, id: null }
);

export const messages = writable<{ role: "user" | "assistant"; content: string }[]>([]);

if (browser){
    user.subscribe(value => {
        if (value && value.email) {
            localStorage.setItem("user", JSON.stringify(value));
        } else {
            localStorage.removeItem("user");
        }
    });
}


