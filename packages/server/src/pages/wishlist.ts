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
        import { define, Auth } from "@calpoly/mustang";
        import { HeaderElement } from "/scripts/header.js";
        import { HomeButtonElement } from "/scripts/home-button.js";
        import { ItemCardElement } from "/scripts/item-card.js";
        import { ItemFormElement } from "/scripts/item-form.js";
      
        define({
          "mu-auth": Auth.Provider,
          "header-element": HeaderElement,
          "home-button": HomeButtonElement,
          "item-card": ItemCardElement,
          "item-form": ItemFormElement,
        });
        
        HeaderElement.initializeOnce();`
      ]
    });
  }

  renderBody(): ReturnType<typeof html> {
    const { listid, name, budget, itemids } = this.data;
    const itemList = itemids.map(itemid => this.renderItem(itemid));

    return html`
      <mu-auth provides="dreamin:auth">
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
        </div>

        <item-form src="/api/wishlists/${listid}"></item-form>
        
      </mu-auth>`;
  }

  renderItem(itemid: string): ReturnType<typeof html> {
    const endpoint = `/items/${itemid}`
    const apiEndpoint = `/api/items/${itemid}`
    return html`
      <a href="${endpoint}">
        <item-card src="${apiEndpoint}">
        </item-card>
      </a>
    `;
  }
}