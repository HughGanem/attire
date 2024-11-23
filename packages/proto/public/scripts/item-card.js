import { css, html, shadow, Observer } from "@calpoly/mustang";

export class ItemCardElement extends HTMLElement {
    get src() {
        return this.getAttribute("src");
    }

    static template = html`
        <template>
            <div class="item-container">
                <h2 class="itemName">
                    <slot name="product-title">Default Product</slot>
                </h2>
                <div class="itemImageUrl">
                    <slot name="itemImageUrl">***Featured Slot***</slot>
                </div>
                <p class="itemPrice">
                    Price: <slot name="product-price">$##.##</slot>
                </p>
            </div>
        </template>`;

    static styles = css`
        .item-container {
            background-color: var(--color-background-page-alt);
            border-radius: 25px;
            height: 600px;
            width: 500px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            text-align: center;
            padding: 20px;
            margin: 10px auto;
            transition: transform 0.2s, box-shadow 0.2s;
        }

        .itemName {
            font-family: 'Nunito Sans', sans-serif;
            font-size: 40px;
            margin: 10px 0;
            text-decoration: none;
        }

        .itemImageUrl slot::slotted(img) {
            width: 100%;
            height: 100%;
            max-width: 450px;
            max-height: 400px;
            object-fit: cover;
            border-radius: 25px;
            transition: transform 0.2s;
        }

        .itemPrice {
            font-family: 'Nunito Sans', sans-serif;
            font-size: 30px;
            margin: 10px 0;
        }

        .item-container:hover {
            box-shadow: 0 0 20px var(--color-header);
            transform: scale(1.05);
        }

        .item-container:hover .itemImageUrl slot::slotted(img) {
            transform: scale(1.05);
        }`;

    constructor() {
        super();
        shadow(this)
            .template(ItemCardElement.template)
            .styles(ItemCardElement.styles);
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
            if (this.src) this.hydrate(this.src);
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
            "product-title": html`<span slot="product-title">${data.itemName}</span>`,
            "itemImageUrl": html`<img slot="itemImageUrl" src="${data.itemImageUrl}" alt="${data.itemName}" />`,
            "product-price": html`<span slot="product-price">$${data.itemPrice.toFixed(2)}</span>`
        };

        this.replaceChildren();
    
        Object.keys(itemSlots).forEach((slotName) => {
            const slotContent = itemSlots[slotName];
    
            this.appendChild(slotContent);
        });
    }
}
