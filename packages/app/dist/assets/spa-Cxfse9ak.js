import{a as g,r as S,x as n,i as d,e as O,n as v,V as u,d as N,h as I,s as _,_ as D}from"./property-D5dKPTDe.js";const j={};function A(a,t,i){switch(a[0]){case"item/select":k(a[1],i).then(s=>t(r=>({...r,item:s})));break;case"wishlistList/select":L(i).then(s=>t(r=>({...r,wishlistList:s})));break;case"wishlist/select":z(a[1],i).then(s=>t(r=>({...r,wishlist:s})));break;case"wishlistItems/select":T(a[1],i).then(s=>t(r=>({...r,itemList:s})));break;default:const e=a[0];throw new Error(`Unhandled Auth message "${e}"`)}}function k(a,t){return fetch(`/api/items/${a.itemid}`,{headers:g.headers(t)}).then(i=>{if(i.status===200)return i.json()}).then(i=>{if(i)return console.log("Item:",i),i})}function L(a){return fetch("/api/wishlists",{headers:g.headers(a)}).then(t=>{if(t.status!==200)throw"Failed to load wishlists";return t.json()}).then(t=>{if(console.log("JSON Returned: ",t),t)return console.log("MAKE WISHLIST: ",t),t})}function z(a,t){return fetch(`/api/wishlists/${a.listid}`,{headers:g.headers(t)}).then(i=>{if(i.status===200)return i.json()}).then(i=>{if(i)return console.log("Wishlist:",i),i})}function T(a,t){return z(a,t).then(i=>i&&i.itemids?Promise.all(i.itemids.map(e=>k({itemid:e},t))):[]).then(i=>(console.log("Items:",i),i))}function U(a){const i=a.target.checked;O.relay(a,"dark-mode",{checked:i})}const b=class b extends S{render(){return n`
      <header>
            <a href="/" class="logo-container">
                <svg class="icon logo-icon">
                    <use src="./icons/accounts.svg#icon-logo" />
                </svg>
                <h1 class="logo">DreamCart</h1>
            </a>
            <div class="header-right">
                <label
                    @change=${U}>
                    <input type="checkbox" autocomplete="off" />
                    Dark mode
                </label>
                <a id="userid">
                    Hello, <span></span>
                </a>
                <a href="/login">
                  <button id="signout">Sign Out</button>
                </a>
            </div>
        </header>
    `}static initializeOnce(){function t(i,e){i.classList.toggle("dark-mode",e)}document.body.addEventListener("dark-mode",i=>{var e;return t(i.currentTarget,(e=i.detail)==null?void 0:e.checked)})}};b.styles=d`
    header {
        color: var(--header-text);
        background-color: var(--color-header);
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 120px;
        padding: 0 32px;
    }

    .logo-container {
        display: flex;
        align-items: center;
        text-decoration: none;
        color: inherit;
    }

    .logo-container h1 {
        margin: 0 0 0 10px;
        font-family: 'Nunito Sans', sans-serif;
        font-size: 60px;
    }

    .logo-container .logo-icon {
        width: 80px;
        height: 80px;
        fill: var(--header-text);
    }
    .header-right {
      display: flex;
      align-items: center;
      gap: 16px; /* Space between elements */
      margin-left: auto; /* Push container to the right */
    }

    .header-right label {
        font-family: 'Nunito Sans', sans-serif;
        font-size: 16px;
        color: var(--header-text);
        cursor: pointer;
    }
  `;let h=b;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function f(a){return v({...a,state:!0,attribute:!1})}var M=Object.defineProperty,R=Object.getOwnPropertyDescriptor,C=(a,t,i,e)=>{for(var s=e>1?void 0:e?R(t,i):t,r=a.length-1,o;r>=0;r--)(o=a[r])&&(s=(e?o(t,i,s):o(s))||s);return e&&s&&M(t,i,s),s};const y=class y extends u{get item(){return this.model.item}constructor(){super("dreamin:model")}attributeChangedCallback(t,i,e){super.attributeChangedCallback(t,i,e),console.log("ATTRIBUTE CHANGED",t,i,e),t==="item-id"&&i!==e&&e&&(console.log("Item Page:",e),this.dispatchMessage(["item/select",{itemid:e}]))}render(){const t=this.item;return console.log("RENDER",this.itemid,this.item),t?n`
      <div class="information-container">
        <span class="information-title">
          <strong><span>${t.itemName}</span></strong>
        </span>

        <div class="information-image">
          <img src="${t.itemImageUrl}" alt="${t.itemName}" />
        </div>

        <div class="detail-container">
          <p class="detail"><strong>Price: </strong>$<span>${(t.itemPrice||0).toFixed(2)}</span></p>
          <p class="detail"><strong>Size: </strong><span>${t.itemSize}</span></p>
          <p class="detail"><strong>Brand: </strong><span>${t.itemBrand}</span></p>
          <p class="detail"><strong>Store: </strong><span>${t.itemStore}</span></p>
          <p class="detail"><strong>Style: </strong><span>${t.itemStyle}</span></p>
          <p class="detail"><strong>Type of Clothing: </strong><span>${t.itemType}</span></p>
        </div>
      </div>
    `:n``}};y.styles=d`
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
  `;let c=y;C([v({attribute:"item-id",reflect:!0})],c.prototype,"itemid",2);C([f()],c.prototype,"item",1);const m=class m extends u{constructor(){super("dreamin:model")}render(){return n`
      <div class="container">
        <p>Hi Hugh</p>
      </div>
    `}};m.uses=N({}),m.styles=d`
    .container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      font-family: 'Arial', sans-serif;
      font-size: 24px;
    }
  `;let x=m;var B=Object.defineProperty,F=Object.getOwnPropertyDescriptor,W=(a,t,i,e)=>{for(var s=F(t,i),r=a.length-1,o;r>=0;r--)(o=a[r])&&(s=o(t,i,s)||s);return s&&B(t,i,s),s};const $=class $ extends u{get wishlistList(){return this.model.wishlistList||[]}constructor(){super("dreamin:model")}connectedCallback(){super.connectedCallback(),this.dispatchMessage(["wishlistList/select"])}render(){const t=i=>{const{name:e,budget:s,imageUrl:r,listid:o}=i;return n`
        <a href="/app/wishlists/${o}">
          <div class="wishlist">
            <h2 class="wishlist-title">
              <span>${e}</span>
            </h2>
            <div class="wishlist-image">
              <img src="${r}" alt="${e}"/>
            </div>
            <div class="wishlist-budget">
              <span>$${String(s.toFixed(2))}</span>
            </div>
          </div>
        </a>
      `};return n`
      <div class="title-container">
        <h1>Wishlists</h1>
      </div>
      <div class="wishlist-container">
        ${this.wishlistList.map(t)}
      </div>
    `}};$.styles=d`
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
  `;let p=$;W([f()],p.prototype,"wishlistList");var E=Object.defineProperty,G=Object.getOwnPropertyDescriptor,w=(a,t,i,e)=>{for(var s=e>1?void 0:e?G(t,i):t,r=a.length-1,o;r>=0;r--)(o=a[r])&&(s=(e?o(t,i,s):o(s))||s);return e&&s&&E(t,i,s),s};const P=class P extends u{get wishlist(){return this.model.wishlist}get items(){return this.model.itemList}constructor(){super("dreamin:model")}attributeChangedCallback(t,i,e){super.attributeChangedCallback(t,i,e),console.log("ATTRIBUTE CHANGED",t,i,e),t==="list-id"&&i!==e&&e&&(console.log("Wishlist Page:",e),this.dispatchMessage(["wishlist/select",{listid:e}]),this.dispatchMessage(["wishlistItems/select",{listid:e}]))}render(){const t=this.wishlist,i=this.items;console.log("RENDER",this.listid,this.wishlist);const e=s=>n`
                <a href="/app/items/${s.itemid}">
                    <div class="item-container">
                        <h2 class="itemName">
                            <span>${s.itemName}</span>
                        </h2>
                        <div class="itemImageUrl">
                            <img src="${s.itemImageUrl||"/default-image.jpg"}" alt="${s.itemName}" />
                        </div>
                        <p class="itemPrice">
                            Price: <span slot="product-price">$${s.itemPrice.toFixed(2)}</span>
                        </p>
                    </div>
                </a>
            `;return t?n`
                <div class="tool-bar">
                    <div class="title-container">
                        <h1>
                            <span>${t.name}</span>
                        </h1>
                    </div>

                    <div class="budget-container">
                        <h1>Budget:</h1>
                        <span>${t.budget.toFixed(2)}</span>
                    </div>
                </div>

                <div class="items-container">
                    ${i?i.map(e):n`<p>No items in this wishlist</p>`}
                </div>
            `:n``}};P.styles=d`
        .items-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 20px auto;
        }

        .items-container a {
            text-decoration: none;
            color: var(--color-text-main);
            margin: 10px;
        }

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
            font-family: "Nunito Sans", sans-serif;
            font-size: 40px;
            margin: 10px 0;
            text-decoration: none;
        }

        .itemImageUrl img {
            width: 100%;
            height: 100%;
            max-width: 450px;
            max-height: 400px;
            object-fit: cover;
            border-radius: 25px;
            transition: transform 0.2s;
        }

        .itemPrice {
            font-family: "Nunito Sans", sans-serif;
            font-size: 30px;
            margin: 10px 0;
        }

        .item-container:hover {
            box-shadow: 0 0 20px var(--color-header);
            transform: scale(1.05);
        }

        .item-container:hover .itemImageUrl img {
            transform: scale(1.05);
        }

        .title-container h1 {
            font-family: "Nunito Sans", sans-serif;
            font-size: 50px;
            font-weight: bold;
            margin: 10px 0;
        }

        .budget-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            font-family: "Nunito Sans", sans-serif;
            font-size: 30px;
            margin-top: 20px;
        }

        .budget-container h1 {
            margin: 0;
            font-size: 35px;
            font-weight: normal;
        }

        .tool-bar {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
    `;let l=P;w([v({attribute:"list-id",reflect:!0})],l.prototype,"listid",2);w([f()],l.prototype,"wishlist",1);w([f()],l.prototype,"items",1);const H=[{auth:"protected",path:"/app/items/:id",view:a=>n`
      <item-view item-id=${a.id}></tour-view>
    `},{auth:"protected",path:"/app/wishlists/:id",view:a=>n`
      <wishlist-view list-id=${a.id}></wishlist-view>
    `},{auth:"protected",path:"/app/wishlists",view:()=>n`
      <wishlists-view></wishlists-view>
    `},{auth:"protected",path:"/app",view:()=>n`
      <home-view></home-view>
    `},{path:"/",redirect:"/app"}];class J extends S{render(){return n`<mu-switch></mu-switch>`}connectedCallback(){super.connectedCallback(),h.initializeOnce()}}N({"mu-auth":g.Provider,"mu-history":I.Provider,"mu-store":class extends _.Provider{constructor(){super(A,j,"dreamin:auth")}},"mu-switch":class extends D.Element{constructor(){super(H,"dreamin:history","dreamin:auth")}},"dreamin-app":J,"dreamcart-header":h,"item-view":c,"home-view":x,"wishlists-view":p,"wishlist-view":l});
