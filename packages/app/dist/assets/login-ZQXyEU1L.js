import{d as c,b as u,r as d,x as h,i as m,e as f,n as g,a as p}from"./property-D5dKPTDe.js";var _=Object.defineProperty,v=(n,e,s,i)=>{for(var r=void 0,a=n.length-1,l;a>=0;a--)(l=n[a])&&(r=l(e,s,r)||r);return r&&_(e,s,r),r};c({"restful-form":u.FormElement});const o=class o extends d{constructor(){super(...arguments),this.message=""}render(){return h`
      <restful-form
        new
        .init=${{username:"",password:""}}
        src="/auth/login"
        @mu-rest-form:created=${this._handleSuccess}
        @mu-rest-form:error=${this._handleError}>
        <slot></slot>
      </restful-form>
      <p class="error">
        ${this.message?"Invalid Username or Password":""}
      </p>
      <pre>${this.message}</pre>
    `}get next(){return new URLSearchParams(document.location.search).get("next")}_handleSuccess(e){const s=e.detail,{token:i}=s.created,r=this.next||"/";console.log("Login successful",s,r),f.relay(e,"auth:message",["auth/signin",{token:i,redirect:r}])}_handleError(e){const{error:s}=e.detail;console.log("Login failed",e.detail),this.message=s.toString()}};o.styles=m`
    .error {
      color: firebrick;
    }
  `;let t=o;v([g()],t.prototype,"message");c({"mu-auth":p.Provider,"login-form":t});
