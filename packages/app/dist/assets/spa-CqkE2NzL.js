import{a as d,r as N,x as r,i as p,e as T,V as y,d as m,f as A,h as P,s as D,_}from"./lit-element-DlPYl0ax.js";import{n as u}from"./property-KzhXVXCE.js";const R={};function U(e,i,t){switch(e[0]){case"item/select":I(e[1],t).then(s=>i(n=>({...n,item:s})));break;case"item/save":M(e[1],t).then(s=>i(n=>({...n,item:s}))).then(()=>{const{onSuccess:s}=e[1];s&&s()}).catch(s=>{const{onFailure:n}=e[1];n&&n(s)});break;case"wishlist/save":B(e[1],t).then(s=>i(n=>({...n,wishlist:s}))).then(()=>{const{onSuccess:s}=e[1];s&&s()}).catch(s=>{const{onFailure:n}=e[1];n&&n(s)});break;case"wishlistList/select":F(t).then(s=>i(n=>({...n,wishlistList:s})));break;case"wishlist/select":j(e[1],t).then(s=>i(n=>({...n,wishlist:s})));break;case"wishlistItems/select":L(e[1],t).then(s=>i(n=>({...n,itemList:s})));break;default:const a=e[0];throw new Error(`Unhandled Auth message "${a}"`)}}function I(e,i){return fetch(`/api/items/${e.itemid}`,{headers:d.headers(i)}).then(t=>{if(t.status===200)return t.json()}).then(t=>{if(t)return console.log("Item:",t),t})}function F(e){return fetch("/api/wishlists",{headers:d.headers(e)}).then(i=>{if(i.status!==200)throw"Failed to load wishlists";return i.json()}).then(i=>{if(console.log("JSON Returned: ",i),i)return console.log("MAKE WISHLIST: ",i),i})}function j(e,i){return fetch(`/api/wishlists/${e.listid}`,{headers:d.headers(i)}).then(t=>{if(t.status===200)return t.json()}).then(t=>{if(t)return console.log("Wishlist:",t),t})}function L(e,i){return j(e,i).then(t=>t&&t.itemids?Promise.all(t.itemids.map(a=>I({itemid:a},i))):[]).then(t=>(console.log("Items:",t),t))}function M(e,i){return fetch(`/api/items/${e.itemid}`,{method:"PUT",headers:{"Content-Type":"application/json",...d.headers(i)},body:JSON.stringify(e.item)}).then(t=>{if(t.status===200)return t.json();throw new Error(`Failed to save item for ${e.itemid}`)}).then(t=>{if(t)return t})}function B(e,i){return fetch(`/api/wishlists/${e.listid}`,{method:"PUT",headers:{"Content-Type":"application/json",...d.headers(i)},body:JSON.stringify(e.wishlist)}).then(t=>{if(t.status===200)return t.json();throw new Error(`Failed to save wishlist for ${e.listid}`)}).then(t=>{if(t)return t})}function E(e){const t=e.target.checked;T.relay(e,"dark-mode",{checked:t})}const z=class z extends N{render(){return r`
      <header>
            <a href="/" class="logo-container">
                <svg class="icon logo-icon">
                    <use src="/icons/accounts.svg#icon-logo" />
                </svg>
                <h1 class="logo">DreamCart</h1>
            </a>
            <div class="header-right">
                <label
                    @change=${E}>
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
    `}static initializeOnce(){function i(t,a){t.classList.toggle("dark-mode",a)}document.body.addEventListener("dark-mode",t=>{var a;return i(t.currentTarget,(a=t.detail)==null?void 0:a.checked)})}};z.styles=p`
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
  `;let f=z;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function k(e){return u({...e,state:!0,attribute:!1})}const C=class C extends N{render(){return r`
      <div class="home-button-container">
        <a href="/app/wishlists">
          <svg class="icon">
            <use href="/icons/accounts.svg#icon-home"></use>
          </svg>
        </a>
      </div>
    `}};C.styles=p`
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
  `;let h=C;var Y=Object.defineProperty,J=Object.getOwnPropertyDescriptor,O=(e,i,t,a)=>{for(var s=a>1?void 0:a?J(i,t):i,n=e.length-1,o;n>=0;n--)(o=e[n])&&(s=(a?o(i,t,s):o(s))||s);return a&&s&&Y(i,t,s),s};const x=class x extends y{constructor(){super("dreamin:model"),this.itemid="",this.edit=!1}get item(){return this.model.item}attributeChangedCallback(i,t,a){super.attributeChangedCallback(i,t,a),console.log("ATTRIBUTE CHANGED",i,t,a),i==="item-id"&&t!==a&&a&&(console.log("Item Page:",a),this.dispatchMessage(["item/select",{itemid:a}]))}render(){const i=this.item;return console.log("RENDER",this.itemid,this.item),i?this.edit?r`
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
              <strong><span>${i.itemName}</span></strong>
            </span>

            <div class="information-image">
              <img src="${i.itemImageUrl}" alt="${i.itemName}" />
            </div>

            <div class="detail-container">
              <p class="detail"><strong>Price: </strong>$<span>${(i.itemPrice||0).toFixed(2)}</span></p>
              <p class="detail"><strong>Size: </strong><span>${i.itemSize}</span></p>
              <p class="detail"><strong>Brand: </strong><span>${i.itemBrand}</span></p>
              <p class="detail"><strong>Store: </strong><span>${i.itemStore}</span></p>
              <p class="detail"><strong>Style: </strong><span>${i.itemStyle}</span></p>
              <p class="detail"><strong>Type of Clothing: </strong><span>${i.itemType}</span></p>
            </div>
          </div>`:r``}_handleSubmit(i){this.dispatchMessage(["item/save",{itemid:this.itemid,item:i.detail,onSuccess:()=>P.dispatch(this,"history/navigate",{href:`/app/items/${this.itemid}`}),onFailure:t=>console.log("ERROR:",t)}])}};x.uses=m({"mu-form":A.Element,"home-button":h}),x.styles=p`
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
  `;let c=x;O([u({attribute:"item-id"})],c.prototype,"itemid",2);O([u({type:Boolean})],c.prototype,"edit",2);O([k()],c.prototype,"item",1);const b=class b extends y{constructor(){super("dreamin:model")}render(){return r`
      <div class="container">
        <p>Hi Hugh</p>
      </div>
    `}};b.uses=m({}),b.styles=p`
    .container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      font-family: 'Arial', sans-serif;
      font-size: 24px;
    }
  `;let S=b;var W=Object.defineProperty,G=Object.getOwnPropertyDescriptor,K=(e,i,t,a)=>{for(var s=G(i,t),n=e.length-1,o;n>=0;n--)(o=e[n])&&(s=o(i,t,s)||s);return s&&W(i,t,s),s};const v=class v extends y{get wishlistList(){return this.model.wishlistList||[]}constructor(){super("dreamin:model")}connectedCallback(){super.connectedCallback(),this.dispatchMessage(["wishlistList/select"])}render(){const i=t=>{const{name:a,budget:s,imageUrl:n,listid:o}=t;return r`
        <a href="/app/wishlists/${o}">
          <div class="wishlist">
            <h2 class="wishlist-title">
              <span>${a}</span>
            </h2>
            <div class="wishlist-image">
              <img src="${n}" alt="${a}" />
            </div>
            <div class="wishlist-budget">
              <span>$${String(s.toFixed(2))}</span>
            </div>
          </div>
        </a>
      `};return r`
      <div class="title-container">
        <h1>Wishlists</h1>
      </div>
      <div class="wishlist-container">
        ${this.wishlistList.map(i)}
      </div>
    `}};v.uses=m({"home-button":h}),v.styles=p`
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
  `;let g=v;K([k()],g.prototype,"wishlistList");var q=Object.defineProperty,Q=Object.getOwnPropertyDescriptor,$=(e,i,t,a)=>{for(var s=a>1?void 0:a?Q(i,t):i,n=e.length-1,o;n>=0;n--)(o=e[n])&&(s=(a?o(i,t,s):o(s))||s);return a&&s&&q(i,t,s),s};const w=class w extends y{constructor(){super("dreamin:model"),this.listid="",this.edit=!1}get wishlist(){return this.model.wishlist}get items(){return this.model.itemList}attributeChangedCallback(i,t,a){super.attributeChangedCallback(i,t,a),console.log("ATTRIBUTE CHANGED",i,t,a),i==="list-id"&&t!==a&&a&&(console.log("Wishlist Page:",a),this.dispatchMessage(["wishlist/select",{listid:a}]),this.dispatchMessage(["wishlistItems/select",{listid:a}]))}render(){const i=this.wishlist,t=this.items;console.log("RENDER",this.listid,this.wishlist);const a=s=>r`
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
            `;return i?this.edit?r`
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
                        ${t?t.map(a):r`<p>No items in this wishlist</p>`}
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
                                <span>${i.name}</span>
                            </h1>
                        </div>

                        <div class="budget-container">
                            <h1>Budget:</h1>
                            <span>${i.budget.toFixed(2)}</span>
                        </div>
                    </div>

                    <div class="items-container">
                        ${t?t.map(a):r`<p>No items in this wishlist</p>`}
                    </div>
                `:r``}_handleSubmit(i){this.dispatchMessage(["wishlist/save",{listid:this.listid,wishlist:i.detail,onSuccess:()=>P.dispatch(this,"history/navigate",{href:`/app/wishlists/${this.listid}`}),onFailure:t=>console.log("ERROR:",t)}])}};w.uses=m({"home-button":h}),w.styles=p`
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
    `;let l=w;$([u({attribute:"list-id"})],l.prototype,"listid",2);$([u({type:Boolean})],l.prototype,"edit",2);$([k()],l.prototype,"wishlist",1);$([k()],l.prototype,"items",1);const X=[{auth:"protected",path:"/app/items/:id",view:e=>r`
      <item-view item-id=${e.id}></tour-view>
    `},{auth:"protected",path:"/app/items/:id/edit",view:e=>r`
      <item-view edit item-id=${e.id}></tour-view>
    `},{auth:"protected",path:"/app/wishlists/:id",view:e=>r`
      <wishlist-view list-id=${e.id}></wishlist-view>
    `},{auth:"protected",path:"/app/wishlists/:id/edit",view:e=>r`
      <wishlist-view edit list-id=${e.id}></wishlist-view>
    `},{auth:"protected",path:"/app/wishlists",view:()=>r`
      <wishlists-view></wishlists-view>
    `},{path:"/",redirect:"/app/wishlists"}];class Z extends N{render(){return r`<mu-switch></mu-switch>`}connectedCallback(){super.connectedCallback(),f.initializeOnce()}}m({"mu-auth":d.Provider,"mu-history":P.Provider,"mu-store":class extends D.Provider{constructor(){super(U,R,"dreamin:auth")}},"mu-switch":class extends _.Element{constructor(){super(X,"dreamin:history","dreamin:auth")}},"dreamin-app":Z,"dreamcart-header":f,"item-view":c,"home-view":S,"wishlists-view":g,"wishlist-view":l});
