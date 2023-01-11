"use strict";(self.webpackChunkgatsby_fitzwilliam_miniatures=self.webpackChunkgatsby_fitzwilliam_miniatures||[]).push([[969],{9845:function(e,t){var a={pathPrefix:"/fitz-unlocking-miniatures",siteMetadata:{title:"Fitzwilliam Miniatures",siteUrl:"https://unlocking-miniatures.fitzmuseum.cam.ac.uk/",mainMenu:[{link:"/",title:"Home"},{link:"/collections",title:"Collections"},{link:"/terminology",title:"Terminology"},{link:"/about",title:"About"},{link:"/blog",title:"Blog"}],quickLinks:[{link:"/",title:"Home"},{link:"/collections",title:"Collections"},{link:"/terminology",title:"Terminology"},{link:"/about",title:"About"},{link:"/blog",title:"Blog"}],contact:[{line:"portraitminiatures [at] fitzmuseum.cam.ac.uk"},{line:"The Fitzwilliam Museum"},{line:"University of Cambridge"}],footerLogos:[{image_src:"../../content/assets/main-banner-image.jpeg",image_alt:"Logo"}],api:{url:"https://unlocking-miniatures.fitz.ms/",collections:{miniatures:"items/miniatures"}},iiif:{url:"https://miniatures-iiif.fitzmuseum.cam.ac.uk/"},viewer:{url:"https://miniatures-mirador.fitzmuseum.cam.ac.uk/"}},graphqlTypegen:!1,plugins:["gatsby-plugin-image","gatsby-plugin-react-helmet","gatsby-plugin-sitemap","gatsby-plugin-sharp","gatsby-transformer-sharp",{resolve:"gatsby-plugin-sass"},{resolve:"gatsby-source-filesystem",options:{name:"assets",path:"//content/assets"}},{resolve:"gatsby-source-filesystem",options:{name:"standard",path:"//content/standard"}},{resolve:"gatsby-source-filesystem",options:{name:"blog",path:"//content/markdown"}},{resolve:"gatsby-transformer-remark",options:{plugins:[{resolve:"gatsby-remark-images",options:{maxWidth:1280}},{resolve:"gatsby-remark-responsive-iframe",options:{wrapperStyle:"margin-bottom: 1.0725rem"}},"gatsby-remark-autolink-headers","gatsby-remark-copy-linked-files"]}},{resolve:"gatsby-plugin-react-svg",options:{rules:{include:"src/assets/svg"}}},{resolve:"gatsby-source-graphql",options:{typeName:"DirectusGraphQL",fieldName:"directusgraphql",url:"https://unlocking-miniatures.fitz.ms/graphql"}}]};t.Z=a},1150:function(e,t,a){a.d(t,{Z:function(){return m}});var n=a(7294),l=a(1082),i=a(6275),r=function(e){var t=e.menu,a=[];return t.forEach((function(e,t){var r=(0,i.x)(e.link)?n.createElement("a",{href:e.link},e.title):n.createElement(l.rU,{to:e.link},e.title);a.push(n.createElement("li",{key:e.link+t},r))})),n.createElement("ul",{className:"main-menu"},a)},s=function(e){var t=e.displayLogo,a=e.dark,i=(0,l.K2)("2643931192").site.siteMetadata.mainMenu;return t?n.createElement("section",{className:"logo-header"+(!0===a?" dark":"")},n.createElement(l.rU,{to:"/"},!!a&&n.createElement("img",{className:"logo-header--logo",src:"/logo.png"}),!a&&n.createElement("img",{className:"logo-header--logo",src:"/logo-dark.png"})),n.createElement(r,{menu:i})):n.createElement(r,{menu:i})};function o(){var e=(0,l.K2)("3572636659").site.siteMetadata,t=e.quickLinks,a=e.contact,r=t.map((function(e,t){var a=(0,i.x)(e.link)?n.createElement("a",{href:null==e?void 0:e.link},e.title):n.createElement(l.rU,{to:e.link},e.title);return n.createElement("li",{key:e.link+t},a)})),s=a.map((function(e,t){return n.createElement("div",{key:e.line+t,className:"contact--line"},e.line)}));return n.createElement(n.Fragment,null,n.createElement("div",{className:"footer row"},n.createElement("div",{className:"col-12 col--sm-12 footer--main"},n.createElement("div",{className:"row"},n.createElement("div",{className:"col footer--main--links"},n.createElement("h4",null,"Quick links"),n.createElement("ul",null,r)),n.createElement("div",{className:"col footer--contact"},n.createElement("h4",null,"Contact"),s),n.createElement("div",{className:"col footer--copyright-codes"},n.createElement("div",null,"Content: ",n.createElement("a",{href:"https://creativecommons.org/licenses/by-nc/4.0/",target:"__blank",rel:"noopener"},"CC-BY-NC")),n.createElement("div",null,"Metadata: ",n.createElement("a",{href:"https://creativecommons.org/licenses/by-nc/4.0/",target:"__blank",rel:"noopener"},"CC-BY-NC")),n.createElement("div",null,"Code: ",n.createElement("a",{href:"https://www.gnu.org/licenses/gpl-3.0.en.html",target:"__blank",rel:"noopener"},"GPL-V3"))))),n.createElement("div",{className:"col-12 col--sm-12 footer--copyright"},n.createElement("span",{className:"footer--copyright-item"},"© 2022 The University of Cambridge"),n.createElement("a",{className:"footer--copyright-item",target:"__blank",rel:"noopener",href:"https://www.information-compliance.admin.cam.ac.uk/data-protection/general-data"},"Privacy policy"),n.createElement("span",{className:"footer--copyright-item"},"Website by ",n.createElement("a",{href:"https://www.olamalu.com/",target:"__blank",rel:"noopener"},"www.olamalu.com")))))}var m=function(e){var t=e.children,a=e.displayLogo,l=e.additionalClasses,i=e.dark;return n.createElement(n.Fragment,null,n.createElement(s,{displayLogo:a,dark:i}),n.createElement("main",{role:"main",className:null==l?void 0:l.join(" ")},t),n.createElement(o,null))}},3791:function(e,t,a){a.r(t),a.d(t,{default:function(){return m}});var n=a(7294),l=a(1150),i=a(9845),r=a(1082),s=a(6275),o="undefined"!=typeof window;function m(){var e="";if(o){var t=new URLSearchParams(document.location.search);e=t.get("items")||""}var a=(0,n.useState)([]),m=a[0],c=a[1];return(0,n.useEffect)((function(){var t,a=JSON.stringify({accession_number:{_in:null===(t=e)||void 0===t?void 0:t.split(",")}}),n=i.Z.siteMetadata.api.url+"items/miniatures/?filter="+a;fetch(n).then((function(e){return e.json()})).then((function(e){c(e.data)}))}),[]),n.createElement(l.Z,{displayLogo:!1},n.createElement("section",{className:"collections-compare--section"},n.createElement("div",{className:"miniature-items"},n.createElement(r.rU,{className:"miniature-item__button",to:"/collections"},"Back")),n.createElement("table",null,n.createElement("thead",null,n.createElement("th",null),null==m?void 0:m.map((function(e){return n.createElement("th",null,e.title)}))),n.createElement("tbody",null,n.createElement("tr",null,n.createElement("td",null),Object.values(m||[]).map((function(e){return n.createElement("td",null,(t=e,a=i.Z.siteMetadata.api.url+"/assets/"+t.image_normal_light+"?&height=200&quality=80",l=t.title||"",n.createElement("img",{src:a,alt:l})));var t,a,l}))),n.createElement("tr",null,n.createElement("td",null),Object.values(m||[]).map((function(e){return n.createElement("td",null,(t=e,a=i.Z.siteMetadata.iiif.url+(0,s.O)(t.accession_number)+"/manifest.json",l=i.Z.siteMetadata.viewer.url+"?manifestId[]="+a,n.createElement("span",null,n.createElement(r.rU,{to:"/object/"+t.slug},"Information"),n.createElement("a",{href:l},"Viewer"))));var t,a,l}))),[{field:"accession_number",lable:"Accession number",type:"string"},{field:"production_date_text",lable:"Production date",type:"string"},{field:"artist_text",lable:"Artist",type:"string"},{field:"sitter_text",lable:"Sitter",type:"string"},{field:"monogram",lable:"Monogram",type:"boolean"},{field:"dimensions_unframed_height",lable:"Dimensions height mm",type:"string"},{field:"dimensions_unframed_width",lable:"Dimensions width mm",type:"string"},{field:"pigments_background",lable:"Pigments background",type:"string"},{field:"pigments_costume",lable:"Pigments costume",type:"string"},{field:"pigments_jewellery",lable:"Pigments jewellery",type:"string"},{field:"pigments_flesh_tones_and_lips",lable:"Pigments flesh tones and lips",type:"string"},{field:"pigments_hair_and_beard",lable:"Pigments hair and beard",type:"string"},{field:"materials_supports",lable:"Materials supports",type:"string"},{field:"analytical_techniques_used",lable:"Analytical techniques used",type:"list"},{field:"image_normal_light",lable:"Image Normal light",type:"boolean"},{field:"image_raking_light",lable:"Image Raking light",type:"boolean"},{field:"image_infrared",lable:"Image Infrared",type:"boolean"},{field:"image_uv",lable:"Image Ultraviolet",type:"boolean"},{field:"image_xray",lable:"Image X-Ray",type:"boolean"}].map((function(e){return n.createElement("tr",null,n.createElement("td",null,e.lable),Object.values(m||[]).map((function(t){return n.createElement("td",null,"boolean"==e.type&&(t[e.field]?"Yes":"No"),"string"==e.type&&t[e.field],"list"==e.type&&t[e.field].join(", "))})))}))))))}},6275:function(e,t,a){function n(e){return/^((http|https|ftp):\/\/)/.test(e)}a.d(t,{O:function(){return i},x:function(){return n}});var l=/[^a-zA-Z0-9_. ]/g;function i(e){return(null==e?void 0:e.replace(l,"-"))||""}}}]);
//# sourceMappingURL=component---src-pages-collections-compare-tsx-cd77c9db766f33dcb285.js.map