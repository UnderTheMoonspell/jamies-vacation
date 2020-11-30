(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[4],{155:function(e,t,n){},158:function(e,t,n){},162:function(e,t,n){},184:function(e,t,n){},185:function(e,t,n){},186:function(e,t,n){var a={"./amsterdam.jpg":187,"./budapest.jpg":188,"./madrid.jpg":189};function r(e){var t=c(e);return n(t)}function c(e){if(!n.o(a,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return a[e]}r.keys=function(){return Object.keys(a)},r.resolve=c,e.exports=r,r.id=186},187:function(e,t,n){e.exports=n.p+"static/media/amsterdam.5b747391.jpg"},188:function(e,t,n){e.exports=n.p+"static/media/budapest.2b3e1a91.jpg"},189:function(e,t,n){e.exports=n.p+"static/media/madrid.3ba5be59.jpg"},206:function(e,t,n){"use strict";n.r(t);var a=n(61),r=n(0),c=n.n(r),i=(n(155),n(204)),s=function(){return c.a.createElement("div",{className:"custom-loader"},c.a.createElement(i.a,{active:!0,content:"Loading..."}))},o=n(194),u=(n(158),n(205)),l=function(e){var t=e.onSortFieldChange,n=Object(o.a)(e,["onSortFieldChange"]);return c.a.createElement(u.a,Object.assign({className:"custom-sort"},n,{onChange:function(e,n){t(n.value)}}))},m=n(123),d=function e(){Object(m.a)(this,e)};d.destinations=[{id:1,name:"Amsterdam",code:"AMS"},{id:2,name:"Madrid",code:"MAD"},{id:3,name:"Budapest",code:"BUD"}],d.weatherBaseUrl="https://api.openweathermap.org/data/2.5",d.kiwiBaseURL="https://api.skypicker.com",d.dateFormat="DD/MM/yyyy",d.endpoints={GET_WEATHER_BY_CITY:function(e){return"/weather?q=".concat(e).concat("&appid=f0e307920b21ae38564d922c31d05753","&units=metric")},LOCATIONS:function(e){return"/locations?term=".concat(e,"&location_types=airport&sort=name")},GET_TICKET_INFO:function(e,t,n,a){return"/flights?flyFrom=".concat(e,"&to=").concat(t,"&date_from=").concat(n,"&date_to=").concat(a,"&curr=EURmax_stopovers=0&sort=price&limit=1&partner=picky")}};n(162);var p=n(76),f=n.n(p),h=n(143),v=n(191),b=n(77),E=n(164),O=n.n(E),j=n(165),g=n.n(j),y=function e(t){var n=this;Object(m.a)(this,e),this.instance=void 0,this._initializeResponseInterceptor=function(){n.instance.interceptors.response.use(n._handleResponse,n._handleError)},this._handleResponse=function(e){return e.data},this._handleError=function(e){return Promise.reject(e)},this.get=function(e,t){return n.instance.get(e,t)},this.post=function(e,t){return n.instance.post(e,t)},this.instance=g.a.create({baseURL:t}),this._initializeResponseInterceptor()},w=new y(d.weatherBaseUrl),k=new y(d.kiwiBaseURL),N=n(183),_=n.n(N),x={isLoading:!1,result:[],url:"",method:"",error:"",headers:{}},C=function(e){var t=Object(r.useState)(x),n=Object(a.a)(t,2),c=n[0],i=n[1],s=function(e){return i(Object(h.a)(Object(h.a)({},x),e))};return function(e,t){var n=Object(r.useRef)(!0);Object(r.useEffect)((function(){n.current?n.current=!1:e()}),[e,t])}((function(){var t=function(){var t=Object(b.a)(f.a.mark((function t(){var n,a;return f.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,s({isLoading:!0}),t.next=4,e[c.method](c.url);case 4:n=t.sent,a=n.locations,s({result:a,isLoading:!1}),t.next=12;break;case 9:t.prev=9,t.t0=t.catch(0),s({error:t.t0});case 12:case"end":return t.stop()}}),t,null,[[0,9]])})));return function(){return t.apply(this,arguments)}}();c.url&&t()}),[c.url,c.method]),{isLoading:c.isLoading,result:c.result,setUrl:function(e,t,n){s({url:e,method:t,headers:n})}}},L=c.a.memo((function(e){var t=Object(r.useState)(""),n=Object(a.a)(t,2),i=n[0],s=n[1],o=Object(r.useState)(!1),u=Object(a.a)(o,2),l=u[0],m=u[1],p=C(k),h=p.isLoading,v=p.result,E=p.setUrl,O=function(){var t=Object(b.a)(f.a.mark((function t(n){var a;return f.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(m(!0),a=n.target.value||"",s(a),!(a.length<3)){t.next=5;break}return t.abrupt("return");case 5:E(e.url(a),"get");case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),j=Object(r.useMemo)((function(){return(null===v||void 0===v?void 0:v.length)>1&&i.length>=3||1===(null===v||void 0===v?void 0:v.length)&&d.destinations.findIndex((function(e){return e.name===v[0].city.name}))<0}),[v,i]),g=Object(r.useMemo)((function(){return j?v.filter((function(e){return d.destinations.findIndex((function(t){return t.name===e.city.name}))<0})):[]}),[j,v]);return Object(r.useEffect)((function(){var e=function(e){e.target.contains(document.getElementsByClassName("results")[0])&&m(!1)};return window.addEventListener("click",e),function(){return window.removeEventListener("click",e)}}),[]),c.a.createElement("div",{className:"ui search ".concat(h&&"loading")},c.a.createElement("div",{className:"ui icon input"},c.a.createElement("input",{"auto-complete":"off",type:"text","tab-index":"0",className:"prompt",value:i,onChange:O,onFocus:function(){return m(!0)},"data-testid":"search-input"}),c.a.createElement("i",{"aria-hidden":"true",className:"search icon"})),c.a.createElement("div",{className:"results transition ".concat(i.length&&l&&"visible"),"data-testid":"results-container"},j?g.map((function(t){return c.a.createElement("div",{className:"result",key:t.id,onClick:function(n){return function(t){e.clickHandler(t),s("")}(t)}},c.a.createElement(e.renderedItem,t))})):c.a.createElement("div",{className:"message empty"},c.a.createElement("div",{className:"header"},"No results found."))))})),T=(n(184),function(e){var t;return c.a.createElement("div",{className:"airport"},e.city.name,c.a.createElement("span",{className:"name"},e.name),c.a.createElement("i",{className:"".concat(null===(t=e.city.country)||void 0===t?void 0:t.code.toLowerCase()," flag")}))}),F=n(207),I=n(192),S=n(190),M=(n(185),function(e){var t,a,r;return c.a.createElement(F.a,{className:"city-card ".concat(e.is_best&&"is-best")},e.is_best&&c.a.createElement(I.a,{color:"red",ribbon:!0},"Best"),c.a.createElement(S.a,{className:"city-image",src:n(186)("./".concat(e.city.name.toLowerCase(),".jpg")),wrapped:!0,ui:!1}),c.a.createElement(F.a.Content,null,c.a.createElement(F.a.Header,null,e.city.name),c.a.createElement(F.a.Meta,null),c.a.createElement(F.a.Description,null,c.a.createElement("img",{alt:"weather icon",src:"https://openweathermap.org/img/wn/".concat(null===(t=e.city.weather)||void 0===t?void 0:t.icon,".png"),className:"weather-icon"}),c.a.createElement("div",{className:"weather-info"},c.a.createElement("span",{"data-testid":"temperature"},"Temperature: ",null===(a=e.city.weather)||void 0===a?void 0:a.temp," \xba"),c.a.createElement("span",null,"Humidity: ",null===(r=e.city.weather)||void 0===r?void 0:r.humidity," %")),c.a.createElement("span",{className:"price-info","data-testid":"price"},e.city.price,"\u20ac"))))});t.default=function(){var e=Object(r.useState)(),t=Object(a.a)(e,2),n=t[0],i=t[1],o=function(e){var t=Object(r.useState)([]),n=Object(a.a)(t,2),c=n[0],i=n[1],s=Object(r.useState)(!1),o=Object(a.a)(s,2),u=o[0],l=o[1],m=Object(r.useState)(!1),p=Object(a.a)(m,2),E=p[0],j=p[1],g=function(){var e=Object(b.a)(f.a.mark((function e(t){var n;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,w.get(d.endpoints.GET_WEATHER_BY_CITY(t.name));case 2:n=e.sent,i((function(e){return[].concat(Object(v.a)(e),[Object(h.a)(Object(h.a)({},t),{},{feels_like:n.main.feels_like,weather:{icon:n.weather[0].icon,humidity:n.main.humidity,temp:n.main.temp.toFixed(1)}})])}));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(r.useEffect)((function(){(function(){var e=Object(b.a)(f.a.mark((function e(){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Promise.all(d.destinations.map(g));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[]),Object(r.useEffect)((function(){var t=function(){var t=Object(b.a)(f.a.mark((function t(n){var a;return f.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return j(!1),t.next=3,k.get(d.endpoints.GET_TICKET_INFO(e.code,n.code,_()(new Date).format(d.dateFormat),_()(new Date).add({days:1}).format(d.dateFormat)));case 3:(a=t.sent).data.length&&i((function(e){var t=e.map((function(e){return e.name===n.name?Object(h.a)(Object(h.a)({},e),{},{price:a.data[0].price}):e}));return O()(t,"price","asc")})),j(!0);case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),n=function(){var e=Object(b.a)(f.a.mark((function e(){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return i((function(e){return e.map((function(e){return Object(h.a)(Object(h.a)({},e),{},{price:0})}))})),l(!0),e.next=4,Promise.all(d.destinations.map(t));case 4:l(!1);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();(null===e||void 0===e?void 0:e.name)&&n()}),[e]),{cities:c,isLoading:u,sortCities:function(e,t){return i(O()(c,e.split(","),t.split(",")))},finishedFetching:E}}(n),u=o.cities,m=o.isLoading,p=o.sortCities,E=o.finishedFetching,j=[{text:"Weather",value:"feels_like|desc"},{text:"Price",value:"price|asc"},{text:"Price & Weather",value:"price,feels_like|asc,desc"}],g=Object(r.useCallback)((function(e){return i((function(t){return e}))}),[]),y=Object(r.useCallback)((function(e){return c.a.createElement(T,e)}),[]),N=Object(r.useMemo)((function(){return!u.reduce((function(e,t){return e+t.price}),0)}),[u]),x=Object(r.useMemo)((function(){return u.map((function(e,t){return c.a.createElement(M,{key:e.id,city:e,is_best:!t})}))}),[u]),C=Object(r.useCallback)((function(e){p(e.split("|")[0],e.split("|")[1])}),[p]),F=Object(r.useMemo)((function(){if(E)return N?c.a.createElement("div",{className:"empty-results"},"No flights from the chosen destination"):c.a.createElement(c.a.Fragment,null,c.a.createElement(l,{name:"city-sort",placeholder:"Sort By",options:j,onSortFieldChange:C,"data-testid":"city-sort"}),c.a.createElement("div",{className:"results-container"},x))}),[E,x,N,C,j]);return c.a.createElement("div",{className:"home"},c.a.createElement("h1",null,"Going back to office planner"),c.a.createElement("h3",null,"Where are you flying from ?"),c.a.createElement(L,{url:d.endpoints.LOCATIONS,renderedItem:y,clickHandler:g}),m?c.a.createElement(s,null):F)}}}]);
//# sourceMappingURL=4.4f000017.chunk.js.map