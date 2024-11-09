import type { Item } from "./item";

export interface Wishlist {
    listId: string; 
    name: string;
    budget: number;
    imageUrl: string;
    items: Array<Item>;
}