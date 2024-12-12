import{a as h,r as S,x as r,i as d,e as T,n as w,V as y,d as m,f as D,h as C,s as A,_}from"./property-DB8J0kcg.js";const U={};function L(s,t,e){switch(s[0]){case"item/select":I(s[1],e).then(i=>t(n=>({...n,item:i})));break;case"item/save":F(s[1],e).then(i=>t(n=>({...n,item:i}))).then(()=>{const{onSuccess:i}=s[1];i&&i()}).catch(i=>{const{onFailure:n}=s[1];n&&n(i)});break;case"wishlistList/select":R(e).then(i=>t(n=>({...n,wishlistList:i})));break;case"wishlist/select":j(s[1],e).then(i=>t(n=>({...n,wishlist:i})));break;case"wishlistItems/select":M(s[1],e).then(i=>t(n=>({...n,itemList:i})));break;default:const a=s[0];throw new Error(`Unhandled Auth message "${a}"`)}}function I(s,t){return fetch(`/api/items/${s.itemid}`,{headers:h.headers(t)}).then(e=>{if(e.status===200)return e.json()}).then(e=>{if(e)return console.log("Item:",e),e})}function R(s){return fetch("/api/wishlists",{headers:h.headers(s)}).then(t=>{if(t.status!==200)throw"Failed to load wishlists";return t.json()}).then(t=>{if(console.log("JSON Returned: ",t),t)return console.log("MAKE WISHLIST: ",t),t})}function j(s,t){return fetch(`/api/wishlists/${s.listid}`,{headers:h.headers(t)}).then(e=>{if(e.status===200)return e.json()}).then(e=>{if(e)return console.log("Wishlist:",e),e})}function M(s,t){return j(s,t).then(e=>e&&e.itemids?Promise.all(e.itemids.map(a=>I({itemid:a},t))):[]).then(e=>(console.log("Items:",e),e))}function F(s,t){return fetch(`/api/items/${s.itemid}`,{method:"PUT",headers:{"Content-Type":"application/json",...h.headers(t)},body:JSON.stringify(s.item)}).then(e=>{if(e.status===200)return e.json();throw new Error(`Failed to save item for ${s.itemid}`)}).then(e=>{if(e)return e})}function B(s){const e=s.target.checked;T.relay(s,"dark-mode",{checked:e})}const z=class z extends S{render(){return r`
      <header>
            <a href="/" class="logo-container">
                <svg class="icon logo-icon">
                    <use src="/icons/accounts.svg#icon-logo" />
                </svg>
                <h1 class="logo">DreamCart</h1>
            </a>
            <div class="header-right">
                <label
                    @change=${B}>
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
    `}static initializeOnce(){function t(e,a){e.classList.toggle("dark-mode",a)}document.body.addEventListener("dark-mode",e=>{var a;return t(e.currentTarget,(a=e.detail)==null?void 0:a.checked)})}};z.styles=d`
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
  `;let u=z;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function $(s){return w({...s,state:!0,attribute:!1})}const O=class O extends S{render(){return r`
      <div class="home-button-container">
        <a href="/app/wishlists">
          <svg class="icon">
            <use href="/icons/accounts.svg#icon-home"></use>
          </svg>
        </a>
      </div>
    `}};O.styles=d`
    .home-button-container {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--color-background-page-alt);
      border-radius: 25px;
      width: 100px;
      height: 100px;
      margin: 40px auto;
    }

    .icon {
      fill: var(--color-text-main);
      width: 80px;
      height: 80px;
      margin: auto;
      transition: transform 0.2s ease;
    }

    .home-button-container:hover .icon {
      transform: scale(1.2);
    }
  `;let p=O;var E=Object.defineProperty,G=Object.getOwnPropertyDescriptor,P=(s,t,e,a)=>{for(var i=a>1?void 0:a?G(t,e):t,n=s.length-1,o;n>=0;n--)(o=s[n])&&(i=(a?o(t,e,i):o(i))||i);return a&&i&&E(t,e,i),i};const f=class f extends y{constructor(){super("dreamin:model"),this.itemid="",this.edit=!1}get item(){return this.model.item}attributeChangedCallback(t,e,a){super.attributeChangedCallback(t,e,a),console.log("ATTRIBUTE CHANGED",t,e,a),t==="item-id"&&e!==a&&a&&(console.log("Item Page:",a),this.dispatchMessage(["item/select",{itemid:a}]))}render(){const t=this.item;return console.log("RENDER",this.itemid,this.item),t?this.edit?r`
          <home-button></home-button>
          <div class="link-container">
            <a href="/app/items/${this.itemid}" class="view-link">
              View
            </a>
          </div>
          <div class="form-container">
            <mu-form 
              .init=${this.item}
              @mu-form:submit=${this._handleSubmit}>
              <label>
                <span>Name</span>
                <input name="itemName" />
              </label>
              <label>
                <span>Image</span>
                <input name="itemImageUrl" />
              </label>
              <label>
                <span>Price</span>
                <input name="itemPrice" />
              </label>
              <label>
                <span>Size</span>
                <input name="itemSize" />
              </label>
              <label>
                <span>Brand</span>
                <input name="itemBrand" />
              </label>
              <label>
                <span>Store</span>
                <input name="itemStore" />
              </label>
              <label>
                <span>Style</span>
                <input name="itemStyle" />
              </label>
              <label>
                <span>Type of piece</span>
                <input name="itemType" />
              </label>
            </mu-form>
          </div>
        `:r`
          <home-button></home-button>
          <div class="link-container">
            <a href="/app/items/${this.itemid}/edit" class="view-link">
              Edit
            </a>
          </div>
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
          </div>`:r``}_handleSubmit(t){this.dispatchMessage(["item/save",{itemid:this.itemid,item:t.detail,onSuccess:()=>C.dispatch(this,"history/navigate",{href:`/app/items/${this.itemid}`}),onFailure:e=>console.log("ERROR:",e)}])}};f.uses=m({"mu-form":D.Element,"home-button":p}),f.styles=d`
    .link-container {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 300px;
      height: 125px;
      margin: 40px auto;
      background-color: var(--color-background-page-alt);
      border-radius: 25px;
    }

    .view-link {
      display: inline-block;
      padding: 0.75rem 1.5rem;
      font-family: 'Nunito Sans', sans-serif;
      font-size: 60px;
      font-weight: bold;
      text-decoration: none; 
      transition: background-color 0.3s ease, transform 0.2s ease;
      text-align: center;
    }

    .link-container:hover,
    .link-container:focus {
      background-color: #005fa3; /* Darker shade for hover */
      transform: translateY(-2px); /* Subtle lift */
      outline: none;
    }

    .link-container:active {
      background-color: #00457a; /* Even darker shade */
      transform: translateY(1px); /* Slight depress effect */
    }

    .form-container {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    mu-form {
      display: flex;
      flex-direction: column;
      gap: 1rem; /* Add spacing between labels */
      width: 100%;
      max-width: 400px; /* Optional max-width for form */
      background: white; /* Optional background for form */
      padding: 2rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
    }

    label {
      display: flex;
      flex-direction: column;
      font-family: Arial, sans-serif;
      font-size: 1rem;
      color: #333;
    }

    input {
      margin-top: 0.5rem;
      padding: 0.5rem;
      font-size: 1rem;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    input:focus {
      outline: none;
      border-color: #0078d4; /* Optional focus color */
      box-shadow: 0 0 4px rgba(0, 120, 212, 0.3);
    }
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
  `;let l=f;P([w({attribute:"item-id"})],l.prototype,"itemid",2);P([w({type:Boolean})],l.prototype,"edit",2);P([$()],l.prototype,"item",1);const x=class x extends y{constructor(){super("dreamin:model")}render(){return r`
      <div class="container">
        <p>Hi Hugh</p>
      </div>
    `}};x.uses=m({}),x.styles=d`
    .container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      font-family: 'Arial', sans-serif;
      font-size: 24px;
    }
  `;let k=x;var J=Object.defineProperty,W=Object.getOwnPropertyDescriptor,Y=(s,t,e,a)=>{for(var i=W(t,e),n=s.length-1,o;n>=0;n--)(o=s[n])&&(i=o(t,e,i)||i);return i&&J(t,e,i),i};const b=class b extends y{get wishlistList(){return this.model.wishlistList||[]}constructor(){super("dreamin:model")}connectedCallback(){super.connectedCallback(),this.dispatchMessage(["wishlistList/select"])}render(){const t=e=>{const{name:a,budget:i,imageUrl:n,listid:o}=e;return r`
        <a href="/app/wishlists/${o}">
          <div class="wishlist">
            <h2 class="wishlist-title">
              <span>${a}</span>
            </h2>
            <div class="wishlist-image">
              <img src="${n}" alt="${a}" />
            </div>
            <div class="wishlist-budget">
              <span>$${String(i.toFixed(2))}</span>
            </div>
          </div>
        </a>
      `};return r`
      <div class="title-container">
        <h1>Wishlists</h1>
      </div>
      <div class="wishlist-container">
        ${this.wishlistList.map(t)}
      </div>
    `}};b.uses=m({"home-button":p}),b.styles=d`
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
  `;let g=b;Y([$()],g.prototype,"wishlistList");var K=Object.defineProperty,q=Object.getOwnPropertyDescriptor,N=(s,t,e,a)=>{for(var i=a>1?void 0:a?q(t,e):t,n=s.length-1,o;n>=0;n--)(o=s[n])&&(i=(a?o(t,e,i):o(i))||i);return a&&i&&K(t,e,i),i};const v=class v extends y{get wishlist(){return this.model.wishlist}get items(){return this.model.itemList}constructor(){super("dreamin:model")}attributeChangedCallback(t,e,a){super.attributeChangedCallback(t,e,a),console.log("ATTRIBUTE CHANGED",t,e,a),t==="list-id"&&e!==a&&a&&(console.log("Wishlist Page:",a),this.dispatchMessage(["wishlist/select",{listid:a}]),this.dispatchMessage(["wishlistItems/select",{listid:a}]))}render(){const t=this.wishlist,e=this.items;console.log("RENDER",this.listid,this.wishlist);const a=i=>r`
                <a href="/app/items/${i.itemid}">
                    <div class="item-container">
                        <h2 class="itemName">
                            <span>${i.itemName}</span>
                        </h2>
                        <div class="itemImageUrl">
                            <img src="${i.itemImageUrl||"/default-image.jpg"}" alt="${i.itemName}" />
                        </div>
                        <p class="itemPrice">
                            Price: <span slot="product-price">$${i.itemPrice.toFixed(2)}</span>
                        </p>
                    </div>
                </a>
            `;return t?r`
                <home-button></home-button>
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
                    ${e?e.map(a):r`<p>No items in this wishlist</p>`}
                </div>
            `:r``}};v.uses=m({"home-button":p}),v.styles=d`
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
    `;let c=v;N([w({attribute:"list-id",reflect:!0})],c.prototype,"listid",2);N([$()],c.prototype,"wishlist",1);N([$()],c.prototype,"items",1);const Q=[{auth:"protected",path:"/app/items/:id",view:s=>r`
      <item-view item-id=${s.id}></tour-view>
    `},{auth:"protected",path:"/app/items/:id/edit",view:s=>r`
      <item-view edit item-id=${s.id}></tour-view>
    `},{auth:"protected",path:"/app/wishlists/:id",view:s=>r`
      <wishlist-view list-id=${s.id}></wishlist-view>
    `},{auth:"protected",path:"/app/wishlists",view:()=>r`
      <wishlists-view></wishlists-view>
    `},{path:"/",redirect:"/app/wishlists"}];class X extends S{render(){return r`<mu-switch></mu-switch>`}connectedCallback(){super.connectedCallback(),u.initializeOnce()}}m({"mu-auth":h.Provider,"mu-history":C.Provider,"mu-store":class extends A.Provider{constructor(){super(L,U,"dreamin:auth")}},"mu-switch":class extends _.Element{constructor(){super(Q,"dreamin:history","dreamin:auth")}},"dreamin-app":X,"dreamcart-header":u,"item-view":l,"home-view":k,"wishlists-view":g,"wishlist-view":c});
