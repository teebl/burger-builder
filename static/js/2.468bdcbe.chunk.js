webpackJsonp([2],{178:function(e,r,t){"use strict";function n(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}function o(e,r){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!r||"object"!==typeof r&&"function"!==typeof r?e:r}function a(e,r){if("function"!==typeof r&&null!==r)throw new TypeError("Super expression must either be null or a function, not "+typeof r);e.prototype=Object.create(r&&r.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),r&&(Object.setPrototypeOf?Object.setPrototypeOf(e,r):e.__proto__=r)}Object.defineProperty(r,"__esModule",{value:!0});var i=t(0),s=t.n(i),c=t(8),u=t(189),l=t(14),p=t(53),d=t(13),f=t(51),b=function(){function e(e,r){for(var t=0;t<r.length;t++){var n=r[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(r,t,n){return t&&e(r.prototype,t),n&&e(r,n),r}}(),A=function(e){function r(){return n(this,r),o(this,(r.__proto__||Object.getPrototypeOf(r)).apply(this,arguments))}return a(r,e),b(r,[{key:"componentDidMount",value:function(){this.props.onFetchOrders(this.props.token,this.props.userId)}},{key:"render",value:function(){var e=s.a.createElement(f.a,null);return this.props.loading||(e=this.props.orders.map(function(e){return s.a.createElement(u.a,{key:e.id,order:e})})),e}}]),r}(i.Component),m=function(e){return{orders:e.order.orders,loading:e.order.loading,token:e.auth.token,userId:e.auth.userId}},h=function(e){return{onFetchOrders:function(r,t){return e(d.d(r))}}};r.default=Object(c.b)(m,h)(Object(p.a)(A,l.a))},189:function(e,r,t){"use strict";var n=t(0),o=t.n(n),a=t(190),i=t.n(a),s=function(e){var r=[];for(var t in e.order.ingredients)r.push({name:t,amount:e.order.ingredients[t]});var n=r.map(function(e){return o.a.createElement("li",{style:{textTransform:"capitalize"},key:e.name},e.name,": ",e.amount)});return o.a.createElement("div",{className:i.a.Order},o.a.createElement("h4",null,"Ingredients"),o.a.createElement("ul",null,n),o.a.createElement("h4",null,"Price:"," ",o.a.createElement("strong",null,Number.parseFloat(e.order.price).toFixed(2))))};r.a=s},190:function(e,r,t){var n=t(191);"string"===typeof n&&(n=[[e.i,n,""]]);var o={hmr:!1,modules:!0,localIdentName:"[name]__[local]__[hash:base64:5]"};o.transform=void 0;t(176)(n,o);n.locals&&(e.exports=n.locals)},191:function(e,r,t){r=e.exports=t(175)(!0),r.push([e.i,".Order__Order__W-Npf{width:80%;border:1px solid #eee;-webkit-box-shadow:0 2px 3px #ccc;box-shadow:0 2px 3px #ccc;padding:10px;margin:10px auto;-webkit-box-sizing:border-box;box-sizing:border-box}","",{version:3,sources:["C:/git/burger-builder/src/components/Order/Order.css"],names:[],mappings:"AAAA,qBACC,UAAW,AACX,sBAAuB,AACvB,kCAAmC,AAC3B,0BAA2B,AACnC,aAAc,AACd,iBAAkB,AAClB,8BAA+B,AACvB,qBAAuB,CAC/B",file:"Order.css",sourcesContent:[".Order {\r\n\twidth: 80%;\r\n\tborder: 1px solid #eee;\r\n\t-webkit-box-shadow: 0 2px 3px #ccc;\r\n\t        box-shadow: 0 2px 3px #ccc;\r\n\tpadding: 10px;\r\n\tmargin: 10px auto;\r\n\t-webkit-box-sizing: border-box;\r\n\t        box-sizing: border-box;\r\n}\r\n"],sourceRoot:""}]),r.locals={Order:"Order__Order__W-Npf"}}});
//# sourceMappingURL=2.468bdcbe.chunk.js.map