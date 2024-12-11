import { Auth, Observer } from "@calpoly/mustang";
import { css, html, LitElement } from "lit";
import { state } from "lit/decorators.js";
import { Item } from "server/models";

export class ItemViewElement extends LitElement {
  static styles = css`
    .information-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 20px auto;
      max-width: 500px;
      padding: 20px;
      background-color: var(--color-background-page-alt);
      border-radius: 25px;
    }

    .information-title {
      font-family: 'Nunito Sans', sans-serif;
      font-size: 40px;
      margin: 10px 0;
      text-align: center;
    }

    .information-image {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: auto;
      margin-bottom: 20px;
    }

    .information-image img {
      max-width: 80%;
      height: auto;
      border-radius: 25px;
    }

    .detail-container {
      width: 100%;
      text-align: left;
      padding: 0 20px;
    }

    .detail {
      font-family: 'Nunito Sans', sans-serif;
      font-size: 30px;
      margin: 5px 0;
    }
  `;

  @state()
  declare item: Item;

  get src() {
    return `api/items/GolfWangHat`
    // return `api/items/${this.item.itemid}`;
  }

  render() {
    const {
      itemName,
      itemPrice,
      itemSize,
      itemBrand,
      itemStore,
      itemStyle,
      itemType,
      itemImageUrl
    } = this.item;

    return html`
      <div class="information-container">
        <span class="information-title">
          <strong><span>${itemName}</span></strong>
        </span>

        <div class="information-image">
          <img src="${itemImageUrl}" alt="${itemName}" />
        </div>

        <div class="detail-container">
          <p class="detail"><strong>Price: </strong>$<span>${itemPrice.toFixed(2)}</span></p>
          <p class="detail"><strong>Size: </strong><span>${itemSize}</span></p>
          <p class="detail"><strong>Brand: </strong><span>${itemBrand}</span></p>
          <p class="detail"><strong>Store: </strong><span>${itemStore}</span></p>
          <p class="detail"><strong>Style: </strong><span>${itemStyle}</span></p>
          <p class="detail"><strong>Type of Clothing: </strong><span>${itemType}</span></p>
        </div>
      </div>
    `;
  }

  hydrate(url: string) {
    fetch(url, {
      headers: Auth.headers(this._user)
    })
      .then((res: Response) => {
        if (res.status === 200) return res.json();
        throw new Error(`Server responded with status ${res.status}`);
      })
      .then((json: unknown) => {
        if (json) {
          this.item = json as Item;
        }
      })
      .catch((err) => console.error("Failed to load item data:", err));
  }

  private _authObserver = new Observer<Auth.Model>(this, "dreamin:auth");

  private _user = new Auth.User();

  connectedCallback() {
    super.connectedCallback();
    this._authObserver.observe(({ user }) => {
      if (user) {
        this._user = user;
      }
      this.hydrate(this.src);
    });
  }
}