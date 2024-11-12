import type { Item } from "./item";

export interface Wishlist {
    listid: string; 
    name: string;
    budget: number;
    imageUrl: string;
    items: Array<Item>;
}