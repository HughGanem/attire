import { css, html } from "@calpoly/mustang/server";
import { Wishlist, Item } from "../models";
import renderPage from "./renderPage";

export class WishlistPage {
  data: Wishlist;

  constructor(data: Wishlist) {
    this.data = data;
  }

  render(): ReturnType<typeof renderPage> {
    return renderPage({
      body: this.renderBody(),
      stylesheets: [
        "/styles/wishlist_page.css"
      ],
      styles: [
        css`main.page {
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
      
        define({
          "header-element": HeaderElement,
          "home-button": HomeButtonElement
        });
        
        HeaderElement.initializeOnce();`
      ]
    });
  }

  renderBody(): ReturnType<typeof html> {
    const { name, budget, items } = this.data;
    const itemList = items.map(item => this.renderItem(item));
    return html`
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

  renderItem(item: Item): ReturnType<typeof html> {
    return html`
      <div class="item-container">
        <h2 class="item-name">${item.name}</h2>
        <div class="item-image">
          <img src="${item.imageUrl}" alt="${item.name}" />
        </div>
        <p class="item-price">
          Price: $${item.price}
        </p>
      </div>`;
  }
}
