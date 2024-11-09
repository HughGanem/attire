import exp from "constants";

export interface Wishlist {
    name: string
    budget: number;
    imageUrl: string;
    items: Array<Item>;
}

export interface Item {
    name: string;
    price: number;
    size: ClothesSize;
    brand: string;
    store: string;
    style: string;
    type: ItemType;
    imageUrl: string;
}

export type ClothesSize =
    | "Extra Small"
    | "Small"
    | "Medium"
    | "Large"
    | "Extra Large";

export type ItemType =
    | "Shoes"
    | "Shorts"
    | "Pants"
    | "Shirt"
    | "Outerwear"
    | "Accessory";
