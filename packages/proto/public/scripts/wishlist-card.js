import { css, html, shadow, Observer } from "@calpoly/mustang";

export class WishlistCardElement extends HTMLElement {
  get src() {
    return this.getAttribute("src");
  }

  static template = html`
  <template>
    <div class="wishlist">
      <h2 class="wishlist-title">
        <slot name="wishlist-title">Default Title</slot>
      </h2>
      <div class="wishlist-image">
        <slot name="wishlist-image">***Image Slot***</slot>
      </div>
      <div class="wishlist-budget">
        <slot name="wishlist-budget">Default Budget</slot>
      </div>
    </div>
  </template>`;

static styles = css`
  .wishlist {
    background-color: var(--color-background-page-alt);
    border-radius: 25px;
    height: 500px;
    width: 500px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    padding: 20px;
    margin: 10px;
    position: relative; /* Make wishlist a positioning context */
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .wishlist-title {
    font-family: 'Nunito Sans', sans-serif;
    font-size: 40px;
    margin: 10px 0;
    text-decoration: none;
    text-align: center;
  }

  .wishlist-budget {
    font-family: 'Nunito Sans', sans-serif;
    font-size: 30px; 
    margin-top: 10px; 
  }

  .wishlist-image slot::slotted(img) {
    width: 100%;
    height: 400px;
    object-fit: cover;
    border-radius: 25px;
    transition: transform 0.2s;
  }

  .wishlist:hover {
    box-shadow: 0 0 20px var(--color-header);
    transform: scale(1.05);
  }

  .wishlist:hover .wishlist-image slot::slotted(img) {
    transform: scale(1.05);
  }
`;


  constructor() {
    super();
    shadow(this)
      .template(WishlistCardElement.template)
      .styles(WishlistCardElement.styles);
  }

  _authObserver = new Observer(this, "dreamin:auth");

  get authorization() {
      return (
      this._user?.authenticated && {
          Authorization: `Bearer ${this._user.token}`,
      }
      );
  }

  connectedCallback() {
    this._authObserver.observe(({ user }) => {
        this._user = user;
        if (this.src) this.hydrate(this.src); // Ensure fetch happens once user is available
    });
  }

  hydrate(url) {
      fetch(url, { headers: this.authorization })
          .then((res) => {
              if (res.status !== 200) throw `Status: ${res.status}`;
              return res.json();
          })
          .then((json) => this.renderSlots(json))
          .catch((error) =>
              console.log(`Failed to render data from ${url}:`, error)
          );
  }

  renderSlots(data) {
      const itemSlots = {
          "wishlist-title": html`<span slot="wishlist-title">${data.name}</span>`,
          "wishlist-image": html`<img slot="wishlist-image" src="${data.imageUrl}" alt="${data.name}" />`,
          "wishlist-budget": html`<span slot="wishlist-budget">$${String(data.budget.toFixed(2))}</span>`,
      };

      this.replaceChildren();

      Object.keys(itemSlots).forEach((slotName) => {
          const slotContent = itemSlots[slotName];

          this.appendChild(slotContent);
      });
  }
}