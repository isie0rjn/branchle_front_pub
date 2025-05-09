import { writable } from "svelte/store";


export const messages = writable<{ role: "user" | "assistant"; content: string }[]>([]);

export const messages_sys = writable<{ role: "user" | "assistant"; content: string }[]>([]);