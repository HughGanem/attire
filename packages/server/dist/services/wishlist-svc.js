"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var wishlist_svc_exports = {};
__export(wishlist_svc_exports, {
  getWishlist: () => getWishlist
});
module.exports = __toCommonJS(wishlist_svc_exports);
const wishlists = {
  summer: {
    name: "Wants for the Summer",
    budget: 1e3,
    imageUrl: "https://t3.ftcdn.net/jpg/02/43/25/90/360_F_243259090_crbVsAqKF3PC2jk2eKiUwZHBPH8Q6y9Y.jpg",
    items: [
      {
        name: "New York Hat",
        price: 100,
        size: "Medium",
        brand: "Mad Haters",
        store: "New Life Clothing",
        style: "Baseball Cap",
        type: "Accessory",
        imageUrl: "https://www.pngall.com/wp-content/uploads/15/Yankee-Hat-PNG-File.png"
      },
      {
        name: "Beach Shorts",
        price: 50,
        size: "Large",
        brand: "BeachVibe",
        store: "Surf Shack",
        style: "Casual",
        type: "Shorts",
        imageUrl: "https://www.shopcoveusa.com/cdn/shop/files/BlackShortsFrontFinal2_1_1024x1024.jpg?v=1718226693"
      }
    ]
  }
};
function getWishlist(_) {
  return wishlists["summer"];
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getWishlist
});
