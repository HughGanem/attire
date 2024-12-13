import{a as l,r as O,x as r,i as p,e as T,V as y,d as h,f as F,h as k,s as U,_ as R}from"./lit-element-DlPYl0ax.js";import{n as u}from"./property-KzhXVXCE.js";const _={};function M(a,e,t){switch(a[0]){case"item/select":j(a[1],t).then(i=>e(n=>({...n,item:i})));break;case"item/save":E(a[1],t).then(i=>e(n=>({...n,item:i}))).then(()=>{const{onSuccess:i}=a[1];i&&i()}).catch(i=>{const{onFailure:n}=a[1];n&&n(i)});break;case"item/create":W(a[1],t).then(i=>e(n=>({...n,item:i}))).then(()=>{const{onSuccess:i}=a[1];i&&i()}).catch(i=>{const{onFailure:n}=a[1];n&&n(i)});break;case"wishlist/save":L(a[1],t).then(i=>e(n=>({...n,wishlist:i}))).then(()=>{const{onSuccess:i}=a[1];i&&i()}).catch(i=>{const{onFailure:n}=a[1];n&&n(i)});break;case"wishlist/create":J(a[1],t).then(i=>e(n=>({...n,wishlist:i}))).then(()=>{const{onSuccess:i}=a[1];i&&i()}).catch(i=>{const{onFailure:n}=a[1];n&&n(i)});break;case"wishlistList/select":D(t).then(i=>e(n=>({...n,wishlistList:i})));break;case"wishlist/select":A(a[1],t).then(i=>e(n=>({...n,wishlist:i})));break;case"wishlistItems/select":B(a[1],t).then(i=>e(n=>({...n,itemList:i})));break;default:const s=a[0];throw new Error(`Unhandled Auth message "${s}"`)}}function j(a,e){return fetch(`/api/items/${a.itemid}`,{headers:l.headers(e)}).then(t=>{if(t.status===200)return t.json()}).then(t=>{if(t)return console.log("Item:",t),t})}function D(a){return fetch("/api/wishlists",{headers:l.headers(a)}).then(e=>{if(e.status!==200)throw"Failed to load wishlists";return e.json()}).then(e=>{if(console.log("JSON Returned: ",e),e)return console.log("MAKE WISHLIST: ",e),e})}function A(a,e){return fetch(`/api/wishlists/${a.listid}`,{headers:l.headers(e)}).then(t=>{if(t.status===200)return t.json()}).then(t=>{if(t)return console.log("Wishlist:",t),t})}function B(a,e){return A(a,e).then(t=>t&&t.itemids?Promise.all(t.itemids.map(s=>j({itemid:s},e))):[]).then(t=>(console.log("Items:",t),t))}function E(a,e){return fetch(`/api/items/${a.itemid}`,{method:"PUT",headers:{"Content-Type":"application/json",...l.headers(e)},body:JSON.stringify(a.item)}).then(t=>{if(t.status===200)return t.json();throw new Error(`Failed to save item for ${a.itemid}`)}).then(t=>{if(t)return t})}function L(a,e){return fetch(`/api/wishlists/${a.listid}`,{method:"PUT",headers:{"Content-Type":"application/json",...l.headers(e)},body:JSON.stringify(a.wishlist)}).then(t=>{if(t.status===200)return t.json();throw new Error(`Failed to save wishlist for ${a.listid}`)}).then(t=>{if(t)return t})}function J(a,e){return fetch("/api/wishlists",{method:"POST",headers:{"Content-Type":"application/json",...l.headers(e)},body:JSON.stringify(a.wishlist)}).then(t=>{if(t.status===201)return t.json();throw new Error(`Failed to create wishlist for ${a.wishlist.name}`)}).then(t=>{if(t)return t})}function W(a,e){return fetch("/api/items/",{method:"POST",headers:{...l.headers(e),"Content-Type":"application/json"},body:JSON.stringify(a.item)}).then(t=>{if(!t.ok)throw new Error(`Failed to create item: ${t.status} - ${t.statusText}`);return t.json()}).then(t=>{const s=t.itemid,i=`/api/wishlists/${a.listid}`;return fetch(i,{method:"GET",headers:{"Content-Type":"application/json",...l.headers(e)}}).then(n=>{if(!n.ok)throw new Error(`Failed to fetch wishlist at ${i}`);return n.json()}).then(n=>{const o=[...n.itemids,s];return console.log("ITEMIDS",o),fetch(i,{method:"PUT",headers:{"Content-Type":"application/json",...l.headers(e)},body:JSON.stringify({itemids:o})}).then(C=>{if(!C.ok)throw new Error(`Failed to update wishlist at ${i}`);return t})})}).catch(t=>{throw console.error("Failed to create and update item:",t),t})}function Y(a){const t=a.target.checked;T.relay(a,"dark-mode",{checked:t})}function G(a){T.relay(a,"auth:message",["auth/signout"])}const P=class P extends O{render(){return r`
      <header>
            <a href="/" class="logo-container">
                <svg class="icon">
                  <use href="/icons/accounts.svg#icon-logo"></use>
                </svg>
                <h1 class="logo">DreamCart</h1>
            </a>
            <div class="header-right">
                <label
                    @change=${Y}>
                    <input type="checkbox" autocomplete="off" />
                    Dark mode
                </label>
                <a href="#" 
                  @click=${G} 
                  class="sign-out-link">
                  Sign out
                </a>

            </div>
        </header>
    `}static initializeOnce(){function e(t,s){t.classList.toggle("dark-mode",s)}document.body.addEventListener("dark-mode",t=>{var s;return e(t.currentTarget,(s=t.detail)==null?void 0:s.checked)})}};P.styles=p`
    .sign-out-link {
      display: inline-block; /* Allows padding without breaking layout */
      color: var(--color-text-main); /* Fallback if variable not defined */
      background-color: var(--header-text);
      text-decoration: none; /* Removes underline */
      padding: 8px 16px; /* Adds clickable area */
      border: 1px solid var(--color-text-main); /* Matches link color */
      border-radius: 4px; /* Rounded edges */
      font-size: 1rem; /* Adjusts text size */
      transition: all 0.3s ease; /* Smooth hover effects */
    }

    .sign-out-link:hover {
      background-color: var(--color-text-main, #007BFF);
      color: var(--background-color, #FFF); /* Matches background */
      text-decoration: underline; /* Optionally add underline back */
    }

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

    .logo-container .icon {
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
  `;let f=P;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function S(a){return u({...a,state:!0,attribute:!1})}const I=class I extends O{render(){return r`
      <div class="home-button-container">
        <a href="/app/wishlists">
          <svg class="icon">
            <use href="/icons/accounts.svg#icon-home"></use>
          </svg>
        </a>
      </div>
    `}};I.styles=p`
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
  `;let m=I;var K=Object.defineProperty,q=Object.getOwnPropertyDescriptor,z=(a,e,t,s)=>{for(var i=s>1?void 0:s?q(e,t):e,n=a.length-1,o;n>=0;n--)(o=a[n])&&(i=(s?o(e,t,i):o(i))||i);return s&&i&&K(e,t,i),i};const b=class b extends y{constructor(){super("dreamin:model"),this.itemid="",this.edit=!1}get item(){return this.model.item}attributeChangedCallback(e,t,s){super.attributeChangedCallback(e,t,s),console.log("ATTRIBUTE CHANGED",e,t,s),e==="item-id"&&t!==s&&s&&(console.log("Item Page:",s),this.dispatchMessage(["item/select",{itemid:s}]))}render(){const e=this.item;return console.log("RENDER",this.itemid,this.item),e?this.edit?r`
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
              <strong><span>${e.itemName}</span></strong>
            </span>

            <div class="information-image">
              <img src="${e.itemImageUrl}" alt="${e.itemName}" />
            </div>

            <div class="detail-container">
              <p class="detail"><strong>Price: </strong>$<span>${(e.itemPrice||0).toFixed(2)}</span></p>
              <p class="detail"><strong>Size: </strong><span>${e.itemSize}</span></p>
              <p class="detail"><strong>Brand: </strong><span>${e.itemBrand}</span></p>
              <p class="detail"><strong>Store: </strong><span>${e.itemStore}</span></p>
              <p class="detail"><strong>Style: </strong><span>${e.itemStyle}</span></p>
              <p class="detail"><strong>Type of Clothing: </strong><span>${e.itemType}</span></p>
            </div>
          </div>`:r``}_handleSubmit(e){this.dispatchMessage(["item/save",{itemid:this.itemid,item:e.detail,onSuccess:()=>k.dispatch(this,"history/navigate",{href:`/app/items/${this.itemid}`}),onFailure:t=>console.log("ERROR:",t)}])}};b.uses=h({"mu-form":F.Element,"home-button":m}),b.styles=p`
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
  `;let d=b;z([u({attribute:"item-id"})],d.prototype,"itemid",2);z([u({type:Boolean})],d.prototype,"edit",2);z([S()],d.prototype,"item",1);const x=class x extends y{constructor(){super("dreamin:model")}render(){return r`
      <div class="container">
        <p>Hi Hugh</p>
      </div>
    `}};x.uses=h({}),x.styles=p`
    .container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      font-family: 'Arial', sans-serif;
      font-size: 24px;
    }
  `;let N=x;var Q=Object.defineProperty,X=Object.getOwnPropertyDescriptor,Z=(a,e,t,s)=>{for(var i=X(e,t),n=a.length-1,o;n>=0;n--)(o=a[n])&&(i=o(e,t,i)||i);return i&&Q(e,t,i),i};const v=class v extends y{get wishlistList(){return this.model.wishlistList||[]}constructor(){super("dreamin:model")}connectedCallback(){super.connectedCallback(),this.dispatchMessage(["wishlistList/select"])}render(){const e=t=>{const{name:s,budget:i,imageUrl:n,listid:o}=t;return r`
        <a href="/app/wishlists/${o}">
          <div class="wishlist">
            <h2 class="wishlist-title">
              <span>${s}</span>
            </h2>
            <div class="wishlist-image">
              <img src="${n}" alt="${s}" />
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
        ${this.wishlistList.map(e)}
      </div>
      <div class="form-container">
        <h2>Create a Wishlist</h2>
        <mu-form @mu-form:submit=${this._handleSubmit}>
          <label>
            <span>Name</span>
            <input name="name" />
          </label>
          <label>
            <span>Budget</span>
            <input name="budget" />
          </label>
          <label>
            <span>Image</span>
            <input name="imageUrl" />
          </label>
        </mu-form>
      </div>
    `}_handleSubmit(e){this.dispatchMessage(["wishlist/create",{wishlist:e.detail,onSuccess:()=>{this.dispatchMessage(["wishlistList/select"]),k.dispatch(this,"history/navigate",{href:"/app/wishlists"})},onFailure:t=>console.log("ERROR:",t)}])}};v.uses=h({"home-button":m}),v.styles=p`
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
    
    .form-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 30px auto; /* Adds spacing around the form */
    }

    .form-container h2 {
      font-family: 'Nunito Sans', sans-serif;
      font-size: 28px;
      color: var(--color-text-main);
      margin-bottom: 1rem; /* Adds spacing between the title and form */
    }

    mu-form {
      display: flex;
      flex-direction: column;
      gap: 1rem; /* Adds spacing between form fields */
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
  `;let g=v;Z([S()],g.prototype,"wishlistList");var H=Object.defineProperty,V=Object.getOwnPropertyDescriptor,$=(a,e,t,s)=>{for(var i=s>1?void 0:s?V(e,t):e,n=a.length-1,o;n>=0;n--)(o=a[n])&&(i=(s?o(e,t,i):o(i))||i);return s&&i&&H(e,t,i),i};const w=class w extends y{constructor(){super("dreamin:model"),this.listid="",this.edit=!1}get wishlist(){return this.model.wishlist}get items(){return this.model.itemList}attributeChangedCallback(e,t,s){super.attributeChangedCallback(e,t,s),console.log("ATTRIBUTE CHANGED",e,t,s),e==="list-id"&&t!==s&&s&&(console.log("Wishlist Page:",s),this.dispatchMessage(["wishlist/select",{listid:s}]),this.dispatchMessage(["wishlistItems/select",{listid:s}]))}render(){const e=this.wishlist,t=this.items;console.log("RENDER",this.listid,this.wishlist);const s=i=>r`
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
            `;return e?this.edit?r`
                    <home-button></home-button>
                    <div class="link-container">
                        <a href="/app/wishlists/${this.listid}" class="view-link">
                            View
                        </a>
                    </div>
                    <div class="form-container">
                        <mu-form .init=${this.wishlist} @mu-form:submit=${this._handleSubmit}>
                            <label>
                                <span>Name</span>
                                <input name="name" />
                            </label>
                            <label>
                                <span>Budget</span>
                                <input name="budget" />
                            </label>
                            <label>
                                <span>Image</span>
                                <input name="imageUrl" />
                            </label>
                        </mu-form>
                    </div>

                    <div class="items-container">
                        ${t?t.map(s):r`<p>No items in this wishlist</p>`}
                    </div>
                    <div class="form-container">
                        <h2>Create a Wishlist</h2>
                        <mu-form @mu-form:submit=${this._handleSubmit}>
                            <label>
                                <span>Name</span>
                                <input name="itemName" />
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
                                <span>Type</span>
                                <input name="itemType" />
                            </label>
                            <label>
                                <span>Image</span>
                                <input name="itemImageUrl" />
                            </label>
                        </mu-form>
                    </div>
                `:r`
                    <home-button></home-button>
                    <div class="link-container">
                        <a href="/app/wishlists/${this.listid}/edit" class="view-link">
                            Edit
                        </a>
                    </div>
                    <div class="tool-bar">
                        <div class="title-container">
                            <h1>
                                <span>${e.name}</span>
                            </h1>
                        </div>

                        <div class="budget-container">
                            <h1>Budget:</h1>
                            <span>${e.budget.toFixed(2)}</span>
                        </div>
                    </div>

                    <div class="items-container">
                        ${t?t.map(s):r`<p>No items in this wishlist</p>`}
                    </div>
                    <div class="form-container">
                        <h2>Create an Item</h2>
                        <mu-form @mu-form:submit=${this._handleSubmit}>
                            <label>
                                <span>Name</span>
                                <input name="itemName" />
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
                                <span>Type</span>
                                <input name="itemType" />
                            </label>
                            <label>
                                <span>Image</span>
                                <input name="itemImageUrl" />
                            </label>
                        </mu-form>
                    </div>
                `:r``}_handleSubmit(e){this.dispatchMessage(["item/create",{listid:this.listid,item:e.detail,onSuccess:()=>{this.dispatchMessage(["wishlist/select",{listid:this.listid}]),k.dispatch(this,"history/navigate",{href:`/app/wishlists/${this.listid}`})},onFailure:t=>console.log("ERROR:",t)}])}};w.uses=h({"home-button":m}),w.styles=p`
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

        .link-container:hover, .link-container:focus {
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
        .form-container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin: 30px auto; /* Adds spacing around the form */
        }

        .form-container h2 {
            font-family: 'Nunito Sans', sans-serif;
            font-size: 28px;
            color: var(--color-text-main);
            margin-bottom: 1rem; /* Adds spacing between the title and form */
        }

        mu-form {
            display: flex;
            flex-direction: column;
            gap: 1rem; /* Adds spacing between form fields */
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
    `;let c=w;$([u({attribute:"list-id"})],c.prototype,"listid",2);$([u({type:Boolean})],c.prototype,"edit",2);$([S()],c.prototype,"wishlist",1);$([S()],c.prototype,"items",1);const tt=[{auth:"protected",path:"/app/items/:id",view:a=>r`
      <item-view item-id=${a.id}></tour-view>
    `},{auth:"protected",path:"/app/items/:id/edit",view:a=>r`
      <item-view edit item-id=${a.id}></tour-view>
    `},{auth:"protected",path:"/app/wishlists/:id",view:a=>r`
      <wishlist-view list-id=${a.id}></wishlist-view>
    `},{auth:"protected",path:"/app/wishlists/:id/edit",view:a=>r`
      <wishlist-view edit list-id=${a.id}></wishlist-view>
    `},{auth:"protected",path:"/app/wishlists",view:()=>r`
      <wishlists-view></wishlists-view>
    `},{path:"/",redirect:"/app/wishlists"}];class et extends O{render(){return r`<mu-switch></mu-switch>`}connectedCallback(){super.connectedCallback(),f.initializeOnce()}}h({"mu-auth":l.Provider,"mu-history":k.Provider,"mu-store":class extends U.Provider{constructor(){super(M,_,"dreamin:auth")}},"mu-switch":class extends R.Element{constructor(){super(tt,"dreamin:history","dreamin:auth")}},"dreamin-app":et,"dreamcart-header":f,"item-view":d,"home-view":N,"wishlists-view":g,"wishlist-view":c});
