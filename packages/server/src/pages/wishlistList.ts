import { css, html } from "@calpoly/mustang/server";
import { Wishlist } from "../models";
import renderPage from "./renderPage";

export class WishlistListPage {
  data: Wishlist[];

  constructor(data: Wishlist[]) {
    this.data = data;
  }

  render(): ReturnType<typeof renderPage> {
    return renderPage({
      body: this.renderBody(),
      stylesheets: [
        "/styles/homepage.css",
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
        import { WishlistCardElement } from "/scripts/wishlist-card.js";
        import { WishlistFormElement } from "/scripts/wishlist-form.js";
      
        define({
          "mu-auth": Auth.Provider,
          "header-element": HeaderElement,
          "home-button": HomeButtonElement,
          "wishlist-card": WishlistCardElement,
          "wishlist-form": WishlistFormElement,
        });
        
        HeaderElement.initializeOnce();`
      ]
    });
  }

  renderBody(): ReturnType<typeof html> {
    const wishlists = this.data.map(wishlist => this.renderWishlist(wishlist));

    return html`
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
        <wishlist-form src="/api/wishlists/"></wishlist-form>
      </mu-auth>`;
  }

  renderWishlist(wishlist: Wishlist): ReturnType<typeof html> {
    const endpoint = `/wishlists/${wishlist.listid}`;
    const apiEndpoint = `/api/wishlists/${wishlist.listid}`;
    return html`
      <a href="${endpoint}">
          <wishlist-card src="${apiEndpoint}">
          </wishlist-card>
      </a>
    `;
  }
}