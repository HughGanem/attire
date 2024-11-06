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
var wishlist_exports = {};
__export(wishlist_exports, {
  WishlistPage: () => WishlistPage
});
module.exports = __toCommonJS(wishlist_exports);
var import_server = require("@calpoly/mustang/server");
var import_renderPage = __toESM(require("./renderPage"));
class WishlistPage {
  data;
  constructor(data) {
    this.data = data;
  }
  render() {
    return (0, import_renderPage.default)({
      body: this.renderBody(),
      stylesheets: [
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
        import { define } from "@calpoly/mustang";
        import { HeaderElement } from "/scripts/header.js";
        import { HomeButtonElement } from "/scripts/home-button.js";
        import { ItemCardElement } from "/scripts/item-card.js"
      
        define({
          "header-element": HeaderElement,
          "home-button": HomeButtonElement,
          "item-card": ItemCardElement
        });
        
        HeaderElement.initializeOnce();`
      ]
    });
  }
  renderBody() {
    const { listid, name, budget, itemids } = this.data;
    const itemList = itemids.map((itemid) => this.renderItem(itemid));
    return import_server.html`
      <header-element></header-element>
      <div class="tool-bar">
        <home-button></home-button>

        <div class="title-container">
          <h1>${name}</h1>
        </div>

        <div class="budget-container">
          <h1>Budget:</h1>
          <p>$${budget}</p>
        </div>
      </div>

      <div class="items-container">
        ${itemList}
      </div>`;
  }
  renderItem(itemid) {
    const endpoint = `/items/${itemid}`;
    const apiEndpoint = `/api/items/${itemid}`;
    return import_server.html`
      <a href="${endpoint}">
        <item-card src="${apiEndpoint}">
        </item-card>
      </a>
    `;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  WishlistPage
});
