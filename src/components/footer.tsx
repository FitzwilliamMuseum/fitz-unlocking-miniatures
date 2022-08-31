import * as React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import '../styles/styles.scss'
import { GatsbyImage } from "gatsby-plugin-image";
import { isExternalUrl } from "../util";

export default function Footer() {

    const data = useStaticQuery(graphql`
    query FooterQuery {
        site {
            siteMetadata {
                quickLinks {
                    link
                    title
                }
                contact {
                    line
                }
                footerLogos {
                    image_src
                    image_alt
                }
            }
        }
    }    
  `)

    const { quickLinks, contact, footerLogos } = data.site.siteMetadata;

    const quickLinksItems: Array<any> = []
    const contactItems: Array<any> = []
    const footerLogoItems: Array<any> = []

    if (quickLinks) {
        quickLinks.forEach((link: any) => {
            const linkItem = isExternalUrl(link.link) ? (<a href={link?.link}>{link.title}</a>) : (<Link to={link.link}>{link.title}</Link>)
            quickLinksItems.push(<li>{linkItem}</li>)
        })
    }
    if (contact) {
        contact.forEach((item: any) => {
            contactItems.push(<div className="contact--line">{item.line}</div>)
        })
    }
    if (footerLogos) {
        footerLogos.forEach((logo: any) => {
            if (logo?.image_src?.childImageSharp?.gatsbyImageData) {
                const img = (<GatsbyImage objectFit="contain" alt={logo.image_alt} image={logo.image_src.childImageSharp.gatsbyImageData} />);
                footerLogoItems.push(img)
            }
        })
    }
    return (
        <React.Fragment>
            <div className="footer row">
                <div className="col-12 col--sm-12 footer--main">
                    <div className="row">
                        <div className="col-3 col--sm-12 footer--main--links">
                            <h4>Quick links</h4>
                            <ul>{quickLinksItems}</ul>
                        </div>
                        <div className="col-3 col--sm-12 footer--contact">
                            <h4>Contact</h4>
                            {contactItems}
                        </div>
                        <div className="col-6 col--sm-12 footer--logos">
                            {footerLogoItems}
                        </div>
                    </div>
                </div>
                <div className="col-12 col--sm-12 footer--copyright">
                    <span className="footer--copyright-item">© 2022 The University of Cambridge</span>
                    <a
                        className="footer--copyright-item"
                        target="__blank"
                        rel="noopener"
                        href="https://www.information-compliance.admin.cam.ac.uk/data-protection/general-data">Privacy policy</a>
                </div>
            </div>
        </React.Fragment>
    )
}
