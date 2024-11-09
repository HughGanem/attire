import type { Wishlist } from "./wishlist";

export interface User {
    userid: string;
    username: string;
    wishlists: Array<Wishlist>;
}