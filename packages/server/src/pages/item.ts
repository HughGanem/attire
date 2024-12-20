import { css, html } from "@calpoly/mustang/server";
import { Wishlist, Item } from "../models";
import renderPage from "./renderPage";

export class ItemPage {
  data: Item;

  constructor(data: Item) {
    this.data = data;
  }

  render(): ReturnType<typeof renderPage> {
    return renderPage({
      body: this.renderBody(),
      stylesheets: [],
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
        import { ItemElement } from "/scripts/item.js";
      
        define({
          "mu-auth": Auth.Provider,
          "header-element": HeaderElement,
          "item-element": ItemElement
        });`
      ]
    });
  }

  renderBody(): ReturnType<typeof html> {
    const { itemid } = this.data;
    const apiEndpoint = `/api/items/${itemid}`;

    return html`
      <mu-auth provides="dreamin:auth">
        <header-element></header-element>
        <item-element src="${apiEndpoint}"></item-element>
      </mu-auth>
    `;
  }
}