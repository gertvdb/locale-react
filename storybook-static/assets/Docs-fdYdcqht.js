import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{useMDXComponents as s}from"./index-BWRqzB2y.js";import"./iframe-DahssHNy.js";import{M as c,C as a}from"./blocks-Y7S7SwVU.js";import{S as r,a as l}from"./Example.stories-B8uau8Io.js";import"./preload-helper-Dp1pzeXC.js";import"./index-cSn03iJh.js";function t(n){const o={code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...s(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(c,{of:r}),`
`,e.jsx(o.h1,{id:"locale-management",children:e.jsx(o.code,{children:"Locale Management"})}),`
`,e.jsxs(o.p,{children:["This example demonstrates how to use the ",e.jsx(o.code,{children:"@gertvdb/locale"})," library to access the system locale and create custom locale objects."]}),`
`,e.jsx("br",{}),`
`,e.jsx(o.h2,{id:"demo",children:"Demo"}),`
`,e.jsx(a,{of:l}),`
`,e.jsx(o.h2,{id:"code",children:"Code"}),`
`,e.jsx(o.pre,{children:e.jsx(o.code,{className:"language-tsx",children:`import { SystemLocale, createLocale } from "@gertvdb/locale";

// Access system locale
const system = SystemLocale.locale;

// Create custom locale
const custom = createLocale({ languageOrLocale: 'fr-CA' });
`})})]})}function u(n={}){const{wrapper:o}={...s(),...n.components};return o?e.jsx(o,{...n,children:e.jsx(t,{...n})}):t(n)}export{u as default};
