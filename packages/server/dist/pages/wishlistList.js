"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var wishlistList_exports = {};
__export(wishlistList_exports, {
  WishlistListPage: () => WishlistListPage
});
module.exports = __toCommonJS(wishlistList_exports);
var import_server = require("@calpoly/mustang/server");
var import_renderPage = __toESM(require("./renderPage"));
class WishlistListPage {
  data;
  constructor(data) {
    this.data = data;
  }
  render() {
    return (0, import_renderPage.default)({
      body: this.renderBody(),
      stylesheets: [
        "/styles/homepage.css",
        "/styles/wishlist_page.css"
      ],
      styles: [
        import_server.css`main.page {
            --page-grids: 8;
            @media screen and (max-width: 48rem) {
              --page-grids: 6;
            }
          }`
      ],
      scripts: [
        `
        import { define, Auth } from "@calpoly/mustang";
        import { HeaderElement } from "/scripts/header.js";
        import { HomeButtonElement } from "/scripts/home-button.js";
        import { WishlistCardElement } from "/scripts/wishlist-card.js";
      
        define({
          "mu-auth": Auth.Provider,
          "header-element": HeaderElement,
          "home-button": HomeButtonElement,
          "wishlist-card": WishlistCardElement
        });
        
        HeaderElement.initializeOnce();`
      ]
    });
  }
  renderBody() {
    const wishlists = this.data.map((wishlist) => this.renderWishlist(wishlist));
    return import_server.html`
      <mu-auth provides="dreamin:auth">
        <header-element></header-element>
        <div class="tool-bar">
            <home-button></home-button>

            <div class="title-container">
                <h1>Wishlists</h1>
            </div>
        </div>

        <div class="wishlist-container">
            ${wishlists}
        </div>
      </mu-auth>`;
  }
  renderWishlist(wishlist) {
    const endpoint = `/wishlists/${wishlist.listid}`;
    const apiEndpoint = `/api/wishlists/${wishlist.listid}`;
    return import_server.html`
      <a href="${endpoint}">
          <wishlist-card src="${apiEndpoint}">
          </wishlist-card>
      </a>
    `;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  WishlistListPage
});
