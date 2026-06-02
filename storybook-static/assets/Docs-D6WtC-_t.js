import{j as n}from"./jsx-runtime-D_zvdyIk.js";import{useMDXComponents as a}from"./index-CCvhPOiG.js";import"./iframe-Da4-cKYs.js";import{M as r,C as c}from"./blocks-UIKSo_fk.js";import{S as i,a as s}from"./Example.stories-_ntfQOxs.js";import"./preload-helper-Dp1pzeXC.js";import"./index-C-St8kbP.js";import"./LocaleContext-kaYUn-0a.js";function t(e){const o={code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...a(),...e.components};return n.jsxs(n.Fragment,{children:[n.jsx(r,{of:i}),`
`,n.jsx(o.h1,{id:"domain-objects",children:"Domain Objects"}),`
`,n.jsxs(o.p,{children:["This example demonstrates the ",n.jsx(o.code,{children:"Language"}),", ",n.jsx(o.code,{children:"Country"}),", and ",n.jsx(o.code,{children:"Continent"})," domain classes."]}),`
`,n.jsx("br",{}),`
`,n.jsx(o.h2,{id:"demo",children:"Demo"}),`
`,n.jsx(c,{of:s}),`
`,n.jsx(o.h2,{id:"language",children:"Language"}),`
`,n.jsx(o.pre,{children:n.jsx(o.code,{className:"language-tsx",children:`import { Language } from "@gertvdb/locale";

const language = Language.fromIso6391({ iso_639_1: 'fr' });
// or
const language = Language.fromIso6392({ iso_639_2: 'fra' });
// or
const language = Language.fromIso6393({ iso_639_3: 'fra' });

language.name        // "French"
language.local       // "français"
language.iso_639_1   // "fr"
language.iso_639_2   // "fra"
language.iso_639_3   // "fra"
language.machineName // "french"
`})}),`
`,n.jsx(o.h2,{id:"country",children:"Country"}),`
`,n.jsx(o.pre,{children:n.jsx(o.code,{className:"language-tsx",children:`import { Country } from "@gertvdb/locale";

const country = Country.fromIso31661Alpha2({ alpha2: 'BE' });
// or
const country = Country.fromIso31661Alpha3({ alpha3: 'BEL' });
// or
const country = Country.fromIso31661Numeric({ numeric: 56 });

country.name                // "Belgium"
country.alpha2              // "BE"
country.alpha3              // "BEL"
country.numeric             // "056"
country.direct_dialing_code // "+32"
country.continent.name      // "Europe"
country.languages()         // ILanguage[]
country.borders()           // ICountry[]

// Convert to a locale
const locale = country.toLocale({ language: 'fr' });
`})}),`
`,n.jsx(o.h2,{id:"continent",children:"Continent"}),`
`,n.jsx(o.pre,{children:n.jsx(o.code,{className:"language-tsx",children:`import { Continent } from "@gertvdb/locale";

const continent = Continent.europe();
// or
const continent = Continent.new({ alpha2: 'EU' });

// Other continents:
Continent.africa()
Continent.antarctica()
Continent.asia()
Continent.northAmerica()
Continent.oceania()
Continent.southAmerica()

continent.name         // "Europe"
continent.alpha2       // "EU"
continent.machine_name // "europe"
continent.countries()  // ICountry[]
`})})]})}function f(e={}){const{wrapper:o}={...a(),...e.components};return o?n.jsx(o,{...e,children:n.jsx(t,{...e})}):t(e)}export{f as default};
