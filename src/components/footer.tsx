import * as React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import '../styles/styles.scss';
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

    const { quickLinks, contact } = data.site.siteMetadata;

    const quickLinksItems = quickLinks.map((link: any, index: number) => {
        const linkItem = isExternalUrl(link.link) ? (<a href={link?.link}>{link.title}</a>) : (<Link to={link.link}>{link.title}</Link>)
        return <li key={link.link + index}>{linkItem}</li>
    })
    const contactItems = contact.map((item: any, index: number) => {
        return <div key={item.line + index} className="contact--line">{item.line}</div>
    })

    const getCurrentYear = () => { return new Date().getFullYear();};

    return (
        <React.Fragment>
            <div className="footer row">
                <div className="col-12 col--sm-12 footer--main">
                    <div className="row">
                        <div className="col footer--main--links">
                            <h4>Quick links</h4>
                            <ul>{quickLinksItems}</ul>
                        </div>
                        <div className="col footer--contact">
                            <h4>Contact</h4>
                            {contactItems}
                        </div>
                        <div className="col footer--copyright-codes">
                            <div>Content: <a
                                href="https://creativecommons.org/licenses/by-nc/4.0/"
                                target="__blank"
                                rel="noopener">CC-BY-NC</a></div>
                            <div>Metadata: <a
                                href="https://creativecommons.org/licenses/by-nc/4.0/"
                                target="__blank"
                                rel="noopener">CC-BY-NC</a></div>
                            <div>Code: <a
                                href="https://www.gnu.org/licenses/gpl-3.0.en.html"
                                target="__blank"
                                rel="noopener">GPL-V3</a></div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col--sm-12 footer--copyright">
                    <span className="footer--copyright-item">© 2022 - {getCurrentYear()} The University of Cambridge</span>
                    <a
                        className="footer--copyright-item"
                        target="__blank"
                        rel="noopener"
                        href="https://www.information-compliance.admin.cam.ac.uk/data-protection/general-data">Privacy policy</a>
                    <span className="footer--copyright-item">Website by <a
                        href="https://www.olamalu.com/"
                        target="__blank"
                        rel="noopener"
                    >www.olamalu.com</a></span>
                </div>
            </div>
        </React.Fragment>
    )
}
