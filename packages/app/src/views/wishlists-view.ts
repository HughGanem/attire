import { define, View } from "@calpoly/mustang";
import { css, html } from "lit";
import { state } from "lit/decorators.js";
import { Msg } from "../messages";
import { Model } from "../model";
import { Wishlist } from "server/models";
import { HomeButtonElement } from "../components/home-button.ts";

export class WistlistsViewElement extends View<Model, Msg> {
  static uses = define({
    "home-button": HomeButtonElement
  });

  @state()
  get wishlistList() {
    return this.model.wishlistList || [];
  }

  constructor() {
    super("dreamin:model");
  }

  connectedCallback() {
    super.connectedCallback();
    this.dispatchMessage(["wishlistList/select"]);
  }

  render() {
    const renderWishlist = (wishlist: Wishlist) => {
      const { name, budget, imageUrl, listid } = wishlist;

      return html`
        <a href="/app/wishlists/${listid}">
          <div class="wishlist">
            <h2 class="wishlist-title">
              <span>${name}</span>
            </h2>
            <div class="wishlist-image">
              <img src="${imageUrl}" alt="${name}" />
            </div>
            <div class="wishlist-budget">
              <span>$${String(budget.toFixed(2))}</span>
            </div>
          </div>
        </a>
      `;
    };

    return html`
      <div class="title-container">
        <h1>Wishlists</h1>
      </div>
      <div class="wishlist-container">
        ${this.wishlistList.map(renderWishlist)}
      </div>
    `;
  }

  static styles = css`
    .title-container {
      display: flex;
      background-color: var(--color-background-page-alt);
      border-radius: 25px;
      max-width: 800px;
      max-height: 400px;
      flex-direction: column;
      margin: 30px auto 30px auto;
      text-align: center;
    }

    .title-container h1 {
      text-align: center;
      font-family: 'Nunito Sans', sans-serif;
      font-size: 100px;
      color: var(--color-text-main);
      margin-top: 0;
      margin-bottom: 0;
    }
    
    .wishlist-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      margin: 20px auto;
    }

    .wishlist-container a {
      text-decoration: none;
      color: var(--color-text-main);
      margin: 10px;
    }

    .wishlist {
      background-color: var(--color-background-page-alt);
      border-radius: 25px;
      height: 450px;
      width: 450px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      text-align: center;
      padding: 20px;
      margin: 10px;
      position: relative;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .wishlist-title {
      font-family: 'Nunito Sans', sans-serif;
      font-size: 36px;
      margin: 10px 0;
      text-decoration: none;
      text-align: center;
    }

    .wishlist-budget {
      font-family: 'Nunito Sans', sans-serif;
      font-size: 28px; 
      margin-top: 10px; 
    }

    .wishlist-image img {
      width: 95%; 
      max-width: 450px; 
      max-height: 450px;
      object-fit: cover;
      border-radius: 5%; /* Makes the image rounded */
      transition: transform 0.2s;
    }

    .wishlist:hover {
      box-shadow: 0 0 20px var(--color-header);
      transform: scale(1.05);
    }

    .wishlist:hover .wishlist-image img {
      transform: scale(1.05);
    }
  `;
}