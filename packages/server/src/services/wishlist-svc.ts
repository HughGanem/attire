import { ClothesSize, ItemType } from "models";

const wishlists = {
    summer: {
        name: "Wants for the Summer",
        budget: 1000,
        imageUrl: "https://t3.ftcdn.net/jpg/02/43/25/90/360_F_243259090_crbVsAqKF3PC2jk2eKiUwZHBPH8Q6y9Y.jpg",
        items: [
            {
                name: "New York Hat",
                price: 100,
                size: "Medium" as ClothesSize,
                brand: "Mad Haters",
                store: "New Life Clothing",
                style: "Baseball Cap",
                type: "Accessory" as ItemType,
                imageUrl: "https://www.pngall.com/wp-content/uploads/15/Yankee-Hat-PNG-File.png"
            },
            {
                name: "Beach Shorts",
                price: 50,
                size: "Large" as ClothesSize,
                brand: "BeachVibe",
                store: "Surf Shack",
                style: "Casual",
                type: "Shorts" as ItemType,
                imageUrl: "https://www.shopcoveusa.com/cdn/shop/files/BlackShortsFrontFinal2_1_1024x1024.jpg?v=1718226693"
            }
        ]
    }
}

export function getWishlist(_: string) {
    // return Venice regardless of which destination is requested
    return wishlists["summer"];
  }