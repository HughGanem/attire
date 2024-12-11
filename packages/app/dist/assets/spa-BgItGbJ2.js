import{a as u,r as f,x as s,i as h,e as w,n as x,V as v,d as y,h as $,s as S,_ as k}from"./property-D5dKPTDe.js";const P={};function z(i,t,e){switch(i[0]){case"item/select":console.log("Hit the update"),C(i[1],e).then(n=>t(r=>({...r,item:n})));break;default:const a=i[0];throw new Error(`Unhandled Auth message "${a}"`)}}function C(i,t){return fetch(`/api/items/${i.itemid}`,{headers:u.headers(t)}).then(e=>{if(e.status===200)return e.json()}).then(e=>{if(e)return console.log("Item:",e),e})}function N(i){const e=i.target.checked;w.relay(i,"dark-mode",{checked:e})}const g=class g extends f{render(){return s`
      <header>
            <a href="/" class="logo-container">
                <svg class="icon logo-icon">
                    <use src="./icons/accounts.svg#icon-logo" />
                </svg>
                <h1 class="logo">DreamCart</h1>
            </a>
            <div class="header-right">
                <label
                    @change=${N}>
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
    `}static initializeOnce(){function t(e,a){e.classList.toggle("dark-mode",a)}document.body.addEventListener("dark-mode",e=>{var a;return t(e.currentTarget,(a=e.detail)==null?void 0:a.checked)})}};g.styles=h`
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
  `;let c=g;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function A(i){return x({...i,state:!0,attribute:!1})}var O=Object.defineProperty,D=Object.getOwnPropertyDescriptor,b=(i,t,e,a)=>{for(var n=a>1?void 0:a?D(t,e):t,r=i.length-1,l;r>=0;r--)(l=i[r])&&(n=(a?l(t,e,n):l(n))||n);return a&&n&&O(t,e,n),n};const m=class m extends v{get item(){return this.model.item}constructor(){super("dreamin:model")}attributeChangedCallback(t,e,a){super.attributeChangedCallback(t,e,a),console.log("ATTRIBUTE CHANGED",t,e,a),t==="item-id"&&e!==a&&a&&(console.log("Item Page:",a),this.dispatchMessage(["item/select",{itemid:a}]))}render(){const t=this.item;return console.log("RENDER",this.itemid,this.item),t?s`
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
    `:s``}};m.styles=h`
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
  `;let o=m;b([x({attribute:"item-id",reflect:!0})],o.prototype,"itemid",2);b([A()],o.prototype,"item",1);const d=class d extends v{constructor(){super("dreamin:model")}render(){return s`
      <div class="container">
        <p>Hi Hugh</p>
      </div>
    `}};d.uses=y({}),d.styles=h`
    .container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      font-family: 'Arial', sans-serif;
      font-size: 24px;
    }
  `;let p=d;const T=[{auth:"protected",path:"/app/items/:id",view:i=>s`
      <item-view item-id=${i.id}></tour-view>
    `},{auth:"protected",path:"/app",view:()=>s`
      <home-view></home-view>
    `},{path:"/",redirect:"/app"}];class j extends f{render(){return s`<mu-switch></mu-switch>`}connectedCallback(){super.connectedCallback(),c.initializeOnce()}}y({"mu-auth":u.Provider,"mu-history":$.Provider,"mu-store":class extends S.Provider{constructor(){super(z,P,"dreamin:auth")}},"mu-switch":class extends k.Element{constructor(){super(T,"dreamin:history","dreamin:auth")}},"dreamin-app":j,"dreamcart-header":c,"item-view":o,"home-view":p});
