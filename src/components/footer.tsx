import * as React from "react"
import { graphql, Link, PageProps } from "gatsby"
import '../styles/styles.scss'
import MainMenu from "./mainMenu";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import { isExternalUrl } from "../util";


export interface FooterProps {
    readonly content: {
        readonly quickLinks: Array<{
            readonly link: string
            readonly title: string
        }> | null | undefined;
        readonly contact: Array<{
            readonly line: string;
        }> | null | undefined;
        readonly footerLogos: Array<FooterLogo> | null | undefined;
        readonly socialMedia: Array<SocialMedia> | null | undefined;
    }
}

export interface FooterLogo {
    readonly image_alt: string;
        readonly image_src: {
            readonly childImageSharp: {
                readonly gatsbyImageData: IGatsbyImageData;
            } | null;
        } | null;
}

export interface SocialMedia {
    readonly type: string;
    readonly url: string;
    readonly title: string;
}


const Footer: React.FC<FooterProps> = ( footerData ) => {

    const { quickLinks, contact, footerLogos, socialMedia } = footerData.content

    const socialMediaItems: Array<any> = []
    const quickLinksItems: Array<any> = []
    const contactItems: Array<any> = []
    const footerLogoItems: Array<any> = []

    if (quickLinks) {
        quickLinks.forEach((link) => {
            const linkItem = isExternalUrl(link.link) ? (<a href={link?.link}>{link.title}</a>) : (<Link to={link.link}>{link.title}</Link>)
            quickLinksItems.push(<li>{linkItem}</li>)
        })
    }
    if (socialMedia) {
        socialMedia.forEach((item) => {
            socialMediaItems.push(<div className="sm--item"><a className={item.type} href={item?.url}>{item.title}</a></div>)
        })
    }
    if (contact) {
        contact.forEach((item)=> {
            contactItems.push(<div className="contact--line">{item.line}</div>)
        })
    }
    if (footerLogos) {
        footerLogos.forEach((logo)=> {
            if (logo?.image_src?.childImageSharp?.gatsbyImageData) {
                const img = (<GatsbyImage objectFit="contain" alt={logo.image_alt} image={logo.image_src.childImageSharp.gatsbyImageData} />);
                footerLogoItems.push(img)
            }
        })
    }
    return (
        <React.Fragment>
            <div className="footer row">
                <div className="col-12 col--sm-12 footer--social-media">
                    {socialMediaItems}
                </div>
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
                    <span className="footer--copyright-item">Copyright University of Cambridge</span>
                    <span className="footer--copyright-item">Privacy policy</span>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Footer
