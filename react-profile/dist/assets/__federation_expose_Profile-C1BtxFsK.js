var i={exports:{}},e={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var d=Symbol.for("react.transitional.element"),x=Symbol.for("react.fragment");function l(a,r,t){var o=null;if(t!==void 0&&(o=""+t),r.key!==void 0&&(o=""+r.key),"key"in r){t={};for(var n in r)n!=="key"&&(t[n]=r[n])}else t=r;return r=t.ref,{$$typeof:d,type:a,key:o,ref:r!==void 0?r:null,props:t}}e.Fragment=x;e.jsx=l;e.jsxs=l;i.exports=e;var s=i.exports;function p(){return s.jsxs("div",{style:{padding:"40px",background:"rgba(255,255,255,0.05)",borderRadius:"24px",border:"1px solid rgba(255,255,255,0.1)"},children:[s.jsx("h1",{style:{background:"linear-gradient(to right, #4ade80, #3b82f6)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",fontSize:"32px"},children:"Kritika's Profile Component"}),s.jsx("p",{style:{color:"#94a3b8",marginTop:"10px"},children:"This component was natively loaded from Port 5003."})]})}export{p as default,s as j};
