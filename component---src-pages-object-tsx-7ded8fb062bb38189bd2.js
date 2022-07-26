(self.webpackChunkgatsby_fitzwilliam_miniatures=self.webpackChunkgatsby_fitzwilliam_miniatures||[]).push([[420],{3344:function(e,t){"use strict";var l={pathPrefix:"/fitz-unlocking-miniatures",siteMetadata:{title:"Fitzwilliam Miniatures",siteUrl:"https://unlocking-miniatures.fitzmuseum.cam.ac.uk/",mainMenu:[{link:"/",title:"Home"},{link:"/collections",title:"Collections"}],quickLinks:[{link:"/",title:"Home"},{link:"/collections",title:"Collections"}],contact:[{line:"The Fitzwilliam Museum"},{line:"University of Cambridge"}],footerLogos:[{image_src:"../../content/assets/main-banner-image.jpeg",image_alt:"Logo"}],socialMedia:[{type:"twitter",url:"https://www.twitter.com/FitzMuseum_UK",title:"@FitzMuseum_UK"},{type:"youtube",url:"https://www.youtube.com/c/FitzMuseum",title:"on YouTube"}],api:{url:"https://unlocking-miniatures.fitz.ms/",collections:{miniatures:"items/miniatures"}},iiif:{url:"https://miniatures-iiif.fitzmuseum.cam.ac.uk/"},viewer:{url:"https://miniatures-mirador.fitzmuseum.cam.ac.uk/"}},graphqlTypegen:!0,plugins:["gatsby-plugin-image","gatsby-plugin-react-helmet","gatsby-plugin-sitemap","gatsby-plugin-mdx","gatsby-plugin-sharp","gatsby-transformer-sharp",{resolve:"gatsby-plugin-sass"},{resolve:"gatsby-source-filesystem",options:{name:"images",path:"//content/assets"},__key:"images"},{resolve:"gatsby-source-filesystem",options:{name:"systemPages",path:"./src/pages/"},__key:"SystemPages"},{resolve:"gatsby-source-filesystem",options:{name:"standard-pages",path:"//content/standard"},__key:"Standard"},{resolve:"gatsby-transformer-remark",options:{plugins:[{resolve:"gatsby-remark-images",options:{maxWidth:1280}},{resolve:"gatsby-remark-responsive-iframe",options:{wrapperStyle:"margin-bottom: 1.0725rem"}},"gatsby-remark-autolink-headers","gatsby-remark-copy-linked-files"]}},{resolve:"gatsby-plugin-react-svg",options:{rules:{include:"src/assets/svg"}}},{resolve:"gatsby-source-graphql",options:{typeName:"DirectusGraphQL",fieldName:"directusgraphql",url:"https://unlocking-miniatures.fitz.ms/graphql"}}]};t.Z=l},6473:function(e,t,l){"use strict";l.r(t),l.d(t,{default:function(){return d}});var a=l(1721),n=l(7294),i=l(8378),r=l(3344),s=l(6100),m=l.n(s),c=[{field:"image_normal_light",label:"Normal light"},{field:"image_raking_light",label:"Raking light"},{field:"image_infrared",label:"Infrared"},{field:"image_uv",label:"Ultraviolet"},{field:"image_xray",label:"X-Ray"},{field:"image_verso",label:"Verso"}],o=function(e){function t(t){return e.call(this,t)||this}return(0,a.Z)(t,e),t.prototype.render=function(){var e=this.props.miniature;return n.createElement("div",{className:"object--images"},c.filter((function(t){return null!=(null==e?void 0:e[t.field])})).map((function(t){var l=e[t.field],a=r.Z.siteMetadata.api.url+"assets/"+l.id+"?format=jpg&width=300&quality=80",i=l.title,s=r.Z.siteMetadata.api.url+"assets/"+l.id+"?format=jpg";return n.createElement("div",{id:l.id},n.createElement("img",{loading:"lazy",src:a,alt:i}),n.createElement("p",null,n.createElement("a",{href:"#"+l.id},n.createElement("strong",null,t.label)),n.createElement("div",null,l.title)),n.createElement("a",{href:s,target:"__blank"},"Open full size"))})))},t}(n.Component),u=function(e){function t(){return e.apply(this,arguments)||this}return(0,a.Z)(t,e),t.prototype.render=function(){var e,t,l,a,s,c,u,d=(null===(e=this.props)||void 0===e||null===(t=e.pageResources)||void 0===t||null===(l=t.json)||void 0===l?void 0:l.pageContext)||{image_normal_light:{id:"",title:""},collection:{name:""}},p=r.Z.siteMetadata.api.url+"assets/"+d.image_normal_light.id+"?format=jpg&height=200&quality=80",g=d.image_normal_light.title;return n.createElement(i.Z,{displayLogo:!1},n.createElement("div",{className:"object"},n.createElement("div",{className:"object--hero-wrapper"},n.createElement("div",{className:"object--hero-content"},n.createElement("img",{src:p,alt:g}),n.createElement("div",{className:"object--hero-info"},n.createElement("h1",null,d.title),n.createElement("div",{className:"object--hero-info-table"},n.createElement("div",null,"Collection"),n.createElement("div",null,d.collection.name),n.createElement("div",null,"Accession number"),n.createElement("div",null,d.accession_number),n.createElement("div",null,"Production date"),n.createElement("div",null,d.production_date_text),n.createElement("div",null,"Artist"),n.createElement("div",null,d.artist_text),n.createElement("div",null,"Sitter"),n.createElement("div",null,d.sitter_text))))),n.createElement("div",{className:"miniature-items object--actions"},n.createElement("a",{className:"miniature-item__button",href:r.Z.siteMetadata.viewer.url+"?manifestId[]="+(r.Z.siteMetadata.iiif.url+d.accession_number)+"/manifest.json"},n.createElement("span",{className:"icon"},n.createElement(m(),null)),n.createElement("span",null,"Viewer")),n.createElement("a",{href:"#description"},n.createElement("h2",{id:"description"},"Description")),n.createElement("a",{href:"#images"},n.createElement("h2",null,"Images")),n.createElement("a",{href:"#micrographs"},n.createElement("h2",null,"Micrographs"))),n.createElement("div",{className:"object--description-wrapper"},n.createElement("div",{className:"object--description-content"},n.createElement("a",{href:"#description"},n.createElement("h2",{id:"description"},"Description")),n.createElement("div",null,d.description_content),n.createElement("div",null,d.description_physical),n.createElement("div",{className:"object--description-dimensions"},n.createElement("p",null,n.createElement("span",null,n.createElement("strong",null,"Dimensions")),n.createElement("span",null,d.dimensions_unframed_width," x ",d.dimensions_unframed_height," mm"))),n.createElement("div",{className:"object--description-materials-and-techniques"},n.createElement("p",null,n.createElement("span",null,n.createElement("strong",null,"Materials")),n.createElement("span",null,d.materials_supports)),n.createElement("p",null,n.createElement("span",null,n.createElement("strong",null,"Analytical techniques")),n.createElement("span",null,(null===(a=d.analytical_techniques_used)||void 0===a?void 0:a.join(", "))||""))),n.createElement("div",{className:"object--description-pigments"},n.createElement("a",{href:"#pigments"},n.createElement("h3",{id:"pigments"},"Pigments")),n.createElement("table",null,n.createElement("tr",null,n.createElement("td",null,"Background"),n.createElement("td",null,d.pigments_background)),n.createElement("tr",null,n.createElement("td",null,"Costume"),n.createElement("td",null,d.pigments_costume)),n.createElement("tr",null,n.createElement("td",null,"Jewellery"),n.createElement("td",null,d.pigments_jewellery)),n.createElement("tr",null,n.createElement("td",null,"Flesh tones and lips"),n.createElement("td",null,d.pigments_flesh_tones_and_lips)),n.createElement("tr",null,n.createElement("td",null,"Hair and beard"),n.createElement("td",null,d.pigments_hair_and_beard)))),n.createElement("div",{className:"object--description-exhibitions"},n.createElement("a",{href:"#exhibitions"},n.createElement("h3",{id:"exhibitions"},"Exhibitions")),(null==d||null===(s=d.exhibitions)||void 0===s?void 0:s.map((function(e){return n.createElement("div",null,n.createElement("a",{href:e.exhibitions_id.url,target:"__blank"},e.exhibitions_id.name+" "+e.exhibitions_id.start_date+"-"+e.exhibitions_id.end_date))})))||n.createElement("div",null)),n.createElement("div",{className:"object--description-references"},n.createElement("a",{href:"#references"},n.createElement("h3",{id:"references"},"References")),n.createElement("table",null,(null==d||null===(c=d.references)||void 0===c?void 0:c.map((function(e){return n.createElement("tr",null,n.createElement("td",null,n.createElement("a",{href:e.references_id.url||"",target:"__blank"},e.references_id.display_title)),n.createElement("td",null,e.references_id.publication_year||""),n.createElement("td",null,e.references_id.authors.map((function(e){return e.authors_and_editors_id.display_name})).join("; ")))})))||n.createElement("div",null))),n.createElement("a",{href:"#images"},n.createElement("h2",{id:"images"},"Images")),n.createElement(o,{miniature:d}),n.createElement("a",{href:"#micrographs"},n.createElement("h2",{id:"micrographs"},"Micrographs")),n.createElement("div",{className:"object--micrographs"},d.images_micrographs&&(null===(u=d.images_micrographs)||void 0===u?void 0:u.map((function(e){var t=r.Z.siteMetadata.api.url+"assets/"+e.micrograph.id+"?format=jpg",l=r.Z.siteMetadata.api.url+"assets/"+e.micrograph.id+"?format=jpg&height=200&quality=80",a=e.file_name;return n.createElement("div",{id:e.file_name},n.createElement("img",{loading:"lazy",src:l,alt:a}),n.createElement("p",null,n.createElement("a",{href:"#"+e.file_name},n.createElement("strong",null,e.file_name)),!!e.hotspot&&n.createElement("span",null," Hotspot"),n.createElement("div",null,e.description)),n.createElement("a",{href:t,target:"__blank"},"Open full size"))}))))))))},t}(n.Component),d=u},6100:function(e,t,l){var a=l(7294);function n(e){return a.createElement("svg",e,[a.createElement("path",{d:"M0 0h24v24H0z",fill:"none",key:0}),a.createElement("path",{d:"M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z",key:1})])}n.defaultProps={height:"24px",viewBox:"0 0 24 24",width:"24px",fill:"#000000",preserveAspectRatio:"xMidYMid meet"},e.exports=n,n.default=n}}]);
//# sourceMappingURL=component---src-pages-object-tsx-7ded8fb062bb38189bd2.js.map