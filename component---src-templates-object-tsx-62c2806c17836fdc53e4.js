(self.webpackChunkgatsby_fitzwilliam_miniatures=self.webpackChunkgatsby_fitzwilliam_miniatures||[]).push([[926],{9845:function(e,t){"use strict";var n={pathPrefix:"/fitz-unlocking-miniatures",siteMetadata:{title:"Fitzwilliam Miniatures",siteUrl:"https://unlocking-miniatures.fitzmuseum.cam.ac.uk/",mainMenu:[{link:"/",title:"Home"},{link:"/collections",title:"Collections"},{link:"/research",title:"Methodology"},{link:"/terminology",title:"Terminology"},{link:"/about",title:"About"},{link:"/blog",title:"Blog"}],quickLinks:[{link:"/",title:"Home"},{link:"/collections",title:"Collections"},{link:"/research",title:"Methodology"},{link:"/terminology",title:"Terminology"},{link:"/about",title:"About"},{link:"/blog",title:"Blog"}],contact:[{line:"portraitminiatures [at] fitzmuseum.cam.ac.uk"},{line:"The Fitzwilliam Museum"},{line:"University of Cambridge"}],footerLogos:[{image_src:"../../content/assets/main-banner-image.jpeg",image_alt:"Logo"}],api:{url:"https://unlocking-miniatures.fitz.ms/",collections:{miniatures:"items/miniatures"}},iiif:{url:"https://miniatures-iiif.fitzmuseum.cam.ac.uk/"},viewer:{url:"https://miniatures-mirador.fitzmuseum.cam.ac.uk/"}},graphqlTypegen:!1,plugins:["gatsby-plugin-image","gatsby-plugin-react-helmet","gatsby-plugin-sitemap","gatsby-plugin-sharp","gatsby-transformer-sharp",{resolve:"gatsby-plugin-sass"},{resolve:"gatsby-source-filesystem",options:{name:"assets",path:"//content/assets"}},{resolve:"gatsby-source-filesystem",options:{name:"standard",path:"//content/standard"}},{resolve:"gatsby-source-filesystem",options:{name:"blog",path:"//content/markdown"}},{resolve:"gatsby-transformer-remark",options:{plugins:[{resolve:"gatsby-remark-images",options:{maxWidth:1280}},{resolve:"gatsby-remark-responsive-iframe",options:{wrapperStyle:"margin-bottom: 1.0725rem"}},"gatsby-remark-autolink-headers","gatsby-remark-copy-linked-files"]}},{resolve:"gatsby-plugin-react-svg",options:{rules:{include:"src/assets/svg"}}},{resolve:"gatsby-source-graphql",options:{typeName:"DirectusGraphQL",fieldName:"directusgraphql",url:"https://unlocking-miniatures.fitz.ms/graphql"}}]};t.Z=n},1150:function(e,t,n){"use strict";n.d(t,{Z:function(){return s}});var l=n(7294),a=n(1082),r=n(6275),i=function(e){var t=e.menu,n=[];return t.forEach((function(e,t){var i=(0,r.x)(e.link)?l.createElement("a",{href:e.link},e.title):l.createElement(a.rU,{to:e.link},e.title);n.push(l.createElement("li",{key:e.link+t},i))})),l.createElement("ul",{className:"main-menu"},n)},c=function(e){var t=e.displayLogo,n=e.dark,r=(0,a.K2)("2643931192").site.siteMetadata.mainMenu;return t?l.createElement("section",{className:"logo-header"+(!0===n?" dark":"")},l.createElement(a.rU,{to:"/"},!!n&&l.createElement("img",{className:"logo-header--logo",src:"/logo.png"}),!n&&l.createElement("img",{className:"logo-header--logo",src:"/logo-dark.png"})),l.createElement(i,{menu:r})):l.createElement(i,{menu:r})};function m(){var e=(0,a.K2)("3572636659").site.siteMetadata,t=e.quickLinks,n=e.contact,i=t.map((function(e,t){var n=(0,r.x)(e.link)?l.createElement("a",{href:null==e?void 0:e.link},e.title):l.createElement(a.rU,{to:e.link},e.title);return l.createElement("li",{key:e.link+t},n)})),c=n.map((function(e,t){return l.createElement("div",{key:e.line+t,className:"contact--line"},e.line)}));return l.createElement(l.Fragment,null,l.createElement("div",{className:"footer row"},l.createElement("div",{className:"col-12 col--sm-12 footer--main"},l.createElement("div",{className:"row"},l.createElement("div",{className:"col footer--main--links"},l.createElement("h4",null,"Quick links"),l.createElement("ul",null,i)),l.createElement("div",{className:"col footer--contact"},l.createElement("h4",null,"Contact"),c),l.createElement("div",{className:"col footer--copyright-codes"},l.createElement("div",null,"Content: ",l.createElement("a",{href:"https://creativecommons.org/licenses/by-nc/4.0/",target:"__blank",rel:"noopener"},"CC-BY-NC")),l.createElement("div",null,"Metadata: ",l.createElement("a",{href:"https://creativecommons.org/licenses/by-nc/4.0/",target:"__blank",rel:"noopener"},"CC-BY-NC")),l.createElement("div",null,"Code: ",l.createElement("a",{href:"https://www.gnu.org/licenses/gpl-3.0.en.html",target:"__blank",rel:"noopener"},"GPL-V3"))))),l.createElement("div",{className:"col-12 col--sm-12 footer--copyright"},l.createElement("span",{className:"footer--copyright-item"},"© 2022 The University of Cambridge"),l.createElement("a",{className:"footer--copyright-item",target:"__blank",rel:"noopener",href:"https://www.information-compliance.admin.cam.ac.uk/data-protection/general-data"},"Privacy policy"),l.createElement("span",{className:"footer--copyright-item"},"Website by ",l.createElement("a",{href:"https://www.olamalu.com/",target:"__blank",rel:"noopener"},"www.olamalu.com")))))}var s=function(e){var t=e.children,n=e.displayLogo,a=e.additionalClasses,r=e.dark;return l.createElement(l.Fragment,null,l.createElement(c,{displayLogo:n,dark:r}),l.createElement("main",{role:"main",className:null==a?void 0:a.join(" ")},t),l.createElement(m,null))}},2910:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return h}});var l=n(1721),a=n(7294),r=n(1150),i=n(9845),c=n(3584),m=n.n(c),s=n(3990),o=n.n(s),u=[{field:"image_normal_light",label:"Normal light"},{field:"image_raking_light",label:"Raking light"},{field:"image_infrared",label:"Infrared"},{field:"image_uv",label:"Ultraviolet"},{field:"image_xray",label:"X-Ray"},{field:"image_verso",label:"Verso"}],d=function(e){function t(t){return e.call(this,t)||this}return(0,l.Z)(t,e),t.prototype.render=function(){var e=this.props.miniature;return a.createElement("div",{className:"object--images"},u.filter((function(t){return null!=(null==e?void 0:e[t.field])})).map((function(t){var n=e[t.field],l=i.Z.siteMetadata.api.url+"assets/"+n.id+"?format=jpg&width=300&withoutEnlargement&quality=80",r=n.title,c=i.Z.siteMetadata.api.url+"assets/"+n.id+"?format=jpg&width=1920&withoutEnlargement&quality=80";return a.createElement("div",{id:n.id},a.createElement("a",{href:c,target:"__blank"},a.createElement("img",{loading:"lazy",src:l,alt:r})),a.createElement("p",null,a.createElement("a",{href:"#"+n.id},a.createElement("strong",null,t.label)),a.createElement("div",null,n.title)),a.createElement("a",{href:c,target:"__blank"},"Open full size"))})))},t}(a.Component),g=function(e){function t(t){return e.call(this,t)||this}return(0,l.Z)(t,e),t.prototype.render=function(){var e,t,n=this.props.miniature;return a.createElement("div",{className:"object--images--xrf-scan"},null===(e=n.images_ma_xrf_scans)||void 0===e||null===(t=e.filter((function(e){return e.ma_xrf_scan})))||void 0===t?void 0:t.map((function(e){var t=i.Z.siteMetadata.api.url+"assets/"+e.ma_xrf_scan.id+"?format=jpg&width=300&withoutEnlargement&quality=80",n=e.ma_xrf_scan.title,l=i.Z.siteMetadata.api.url+"assets/"+e.ma_xrf_scan.id+"?format=jpg&width=1920&withoutEnlargement&quality=80";return a.createElement("div",{id:e.ma_xrf_scan.id},a.createElement("a",{href:l,target:"__blank"},a.createElement("img",{loading:"lazy",src:t,alt:n})),a.createElement("p",null,a.createElement("a",{href:"#"+e.ma_xrf_scan.id},a.createElement("strong",null,e.ma_xrf_scan.title)),e.element_investigated&&a.createElement("div",null,e.element_investigated)),a.createElement("a",{href:l,target:"__blank"},"Open full size"))})))},t}(a.Component),p=n(6275),E=function(e){function t(){return e.apply(this,arguments)||this}return(0,l.Z)(t,e),t.prototype.render=function(){var e,t,n,l,c,s,u,E,h,f,_,v,b=(null===(e=this.props)||void 0===e||null===(t=e.pageResources)||void 0===t||null===(n=t.json)||void 0===n?void 0:n.pageContext)||{image_normal_light:{id:"",title:""},collection:""},k=i.Z.siteMetadata.api.url+"assets/"+(null===(l=b.image_normal_light)||void 0===l?void 0:l.id)+"?format=jpg&height=200&withoutEnlargement&quality=80",y=null===(c=b.image_normal_light)||void 0===c?void 0:c.title,w=i.Z.siteMetadata.iiif.url+(0,p.O)(b.accession_number)+"/manifest.json",N=i.Z.siteMetadata.viewer.url+"?manifestId[]="+w;return a.createElement(r.Z,{displayLogo:!1},a.createElement("div",{className:"object"},a.createElement("div",{className:"object--hero-wrapper"},a.createElement("div",{className:"object--hero-content"},a.createElement("h1",null,b.title),a.createElement("div",{className:"object--hero-info"},a.createElement("img",{src:k,alt:y}),a.createElement("div",{className:"object--hero-info-table"},a.createElement("div",null,a.createElement("strong",null,"Accession number")),a.createElement("div",null,b.accession_number),b.object_record_in_collection&&a.createElement(a.Fragment,null,a.createElement("div",null,a.createElement("strong",null,"Object record")),a.createElement("div",null,a.createElement("a",{href:b.object_record_in_collection,target:"__blank"},"Available here"))),a.createElement("div",null,a.createElement("strong",null,"Production date")),a.createElement("div",null,b.production_date_text),a.createElement("div",null,a.createElement("strong",null,"Artist")),a.createElement("div",null,b.artist_text),a.createElement("div",null,a.createElement("strong",null,"Sitter")),a.createElement("div",null,b.sitter_text),b.collection&&a.createElement(a.Fragment,null,a.createElement("div",null,a.createElement("strong",null,"Collection")),a.createElement("div",null,b.collection)),b.Credit&&a.createElement(a.Fragment,null,a.createElement("div",null,a.createElement("strong",null,"Credit")),a.createElement("div",null,b.Credit)))))),a.createElement("div",{className:"object--actions-wrapper"},a.createElement("div",{className:"miniature-items object--actions"},a.createElement("a",{className:"miniature-item__button",href:N},a.createElement("span",{className:"icon"},a.createElement(m(),null)),a.createElement("span",null,"Viewer")),a.createElement("a",{href:"#description"},a.createElement("h2",{id:"description"},"Description")),a.createElement("a",{href:"#images"},a.createElement("h2",null,"Images")),b.images_micrographs&&(null===(s=b.images_micrographs)||void 0===s?void 0:s.length)>0&&a.createElement("a",{href:"#micrographs"},a.createElement("h2",null,"Micrographs")),b.images_ma_xrf_scans&&(null===(u=b.images_ma_xrf_scans)||void 0===u?void 0:u.length)>0&&a.createElement("a",{href:"#MA-XRF MAPS"},a.createElement("h2",null,"MA-XRF MAPS")))),a.createElement("div",{className:"object--description-wrapper"},a.createElement("div",{className:"object--description-content"},a.createElement("a",{href:"#description"},a.createElement("h2",{id:"description"},"Description")),a.createElement("div",{className:"object--description-content--content"},a.createElement("div",null,b.description_content),a.createElement("div",null,b.description_physical)),a.createElement("table",null,a.createElement("tr",null,a.createElement("td",null,"Dimensions"),a.createElement("td",null,b.dimensions_unframed_width," x ",b.dimensions_unframed_height," mm")),a.createElement("tr",null,a.createElement("td",null,"Materials"),a.createElement("td",null,b.materials_supports)),a.createElement("tr",null,a.createElement("td",null,"Analytical techniques"),a.createElement("td",null,(null===(E=b.analytical_techniques_used)||void 0===E?void 0:E.join(", "))||""))),a.createElement("div",{className:"object--description-pigments"},a.createElement("a",{href:"#pigments"},a.createElement("h3",{id:"pigments"},"Pigments")),a.createElement("table",null,a.createElement("tr",null,a.createElement("td",null,"Background"),a.createElement("td",null,b.pigments_background)),a.createElement("tr",null,a.createElement("td",null,"Costume"),a.createElement("td",null,b.pigments_costume)),a.createElement("tr",null,a.createElement("td",null,"Jewellery"),a.createElement("td",null,b.pigments_jewellery)),a.createElement("tr",null,a.createElement("td",null,"Flesh tones and lips"),a.createElement("td",null,b.pigments_flesh_tones_and_lips)),a.createElement("tr",null,a.createElement("td",null,"Hair and beard"),a.createElement("td",null,b.pigments_hair_and_beard)))),a.createElement("div",{className:"object--description-exhibitions"},a.createElement("a",{href:"#exhibitions"},a.createElement("h3",{id:"exhibitions"},"Exhibitions")),(null==b||null===(h=b.exhibitions)||void 0===h?void 0:h.map((function(e){return a.createElement("div",null,a.createElement("a",{href:e.exhibitions_id.url,target:"__blank"},e.exhibitions_id.name+" "+e.exhibitions_id.start_date+"-"+e.exhibitions_id.end_date))})))||a.createElement("div",null)),a.createElement("div",{className:"object--description-references"},a.createElement("a",{href:"#references"},a.createElement("h3",{id:"references"},"References")),a.createElement("table",null,(null==b||null===(f=b.references)||void 0===f?void 0:f.filter((function(e){return e.references_id})).map((function(e){return a.createElement("tr",null,!!e.references_id.url&&a.createElement("td",null,a.createElement("a",{href:e.references_id.url,target:"__blank"},e.references_id.display_title)),!e.references_id.url&&a.createElement("td",null,e.references_id.display_title),a.createElement("td",null,e.references_id.publication_year||""),a.createElement("td",null,e.references_id.authors.map((function(e){return e.authors_and_editors_id.display_name})).join("; ")))})))||a.createElement("div",null))),a.createElement("a",{href:"#images"},a.createElement("h2",{id:"images"},"Images")),a.createElement(d,{miniature:b}),b.images_micrographs&&b.images_micrographs.length>0&&a.createElement("a",{href:"#micrographs"},a.createElement("h2",{id:"micrographs"},"Micrographs")),a.createElement("div",{className:"object--micrographs"},b.images_micrographs&&(null===(_=b.images_micrographs)||void 0===_?void 0:_.map((function(e){var t,n,l=i.Z.siteMetadata.api.url+"assets/"+(null==e||null===(t=e.micrograph)||void 0===t?void 0:t.id)+"?format=jpg&width=1920&withoutEnlargement&quality=80",r=i.Z.siteMetadata.api.url+"assets/"+(null==e||null===(n=e.micrograph)||void 0===n?void 0:n.id)+"?format=jpg&width=300&withoutEnlargement&quality=80",c=e.file_name,s=i.Z.siteMetadata.iiif.url+(0,p.O)(b.accession_number)+"/micrograph/"+e.id+"/manifest.json",u=i.Z.siteMetadata.viewer.url+"?manifestId[]="+s;return a.createElement("div",{id:e.file_name},a.createElement("a",{href:l,target:"__blank"},a.createElement("img",{loading:"lazy",src:r,alt:c})),a.createElement("p",null,a.createElement("a",{href:"#"+e.file_name},a.createElement("strong",null,e.file_name)),!!e.hotspot&&a.createElement("span",null," Hotspot"),a.createElement("div",null,e.description)),e.hotspot&&a.createElement(a.Fragment,null,a.createElement("a",{className:"micrograph-iiif",href:s,target:"__blank"},"Copy iiif manifest URL")),a.createElement("div",{className:"miniature-items object--actions miniature-items object--actions--micrograph"},e.hotspot&&a.createElement(a.Fragment,null,a.createElement("a",{className:"miniature-item__button miniature-item__button_micrograph",href:u,target:"__blank"},a.createElement("span",{className:"icon"},a.createElement(m(),null)),a.createElement("span",null,"Viewer"))),a.createElement("a",{className:"miniature-item__button miniature-item__button_micrograph",href:l,target:"__blank"},a.createElement("span",{className:"icon"},a.createElement(o(),null)),a.createElement("span",null,"Download"))))})))),(null===(v=b.images_ma_xrf_scans)||void 0===v?void 0:v.length)>0&&a.createElement(a.Fragment,null,a.createElement("a",{href:"#MA-XRF MAPS"},a.createElement("h2",{id:"MA-XRF MAPS"},"MA-XRF MAPS")),a.createElement(g,{miniature:b}))))))},t}(a.Component),h=E},6275:function(e,t,n){"use strict";function l(e){return/^((http|https|ftp):\/\/)/.test(e)}n.d(t,{O:function(){return r},x:function(){return l}});var a=/[^a-zA-Z0-9_. ]/g;function r(e){return(null==e?void 0:e.replace(a,"-"))||""}},3990:function(e,t,n){var l=n(7294);function a(e){return l.createElement("svg",e,[l.createElement("g",{key:0},l.createElement("rect",{fill:"none",height:"24",width:"24"})),l.createElement("g",{key:1},l.createElement("path",{d:"M5,20h14v-2H5V20z M19,9h-4V3H9v6H5l7,7L19,9z"}))])}a.defaultProps={enableBackground:"new 0 0 24 24",height:"24px",viewBox:"0 0 24 24",width:"24px",fill:"#000000"},e.exports=a,a.default=a},3584:function(e,t,n){var l=n(7294);function a(e){return l.createElement("svg",e,[l.createElement("path",{d:"M0 0h24v24H0z",fill:"none",key:0}),l.createElement("path",{d:"M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z",key:1})])}a.defaultProps={height:"24px",viewBox:"0 0 24 24",width:"24px",fill:"#000000",preserveAspectRatio:"xMidYMid meet"},e.exports=a,a.default=a}}]);
//# sourceMappingURL=component---src-templates-object-tsx-62c2806c17836fdc53e4.js.map