import { writable } from 'svelte/store';

interface User {
    email: string | null;
    name: string | null;
}

export const user = writable<User>({ email: null, name: null });

