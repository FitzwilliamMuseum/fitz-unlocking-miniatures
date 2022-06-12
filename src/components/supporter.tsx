import { Link } from "gatsby";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import * as React from "react"
import '../styles/styles.scss'
import { isExternalUrl } from "../util";

export interface SupporterProps {
    readonly link: {
        readonly url: string | null;
        readonly title: string;
    };
    readonly image_src: {
        readonly childImageSharp: {
            readonly gatsbyImageData: IGatsbyImageData;
        } | null;
    } | null;
}




const Supporter: React.FC<SupporterProps> = ( { link, image_src } ) => {

    if (image_src && image_src.childImageSharp) {
        const img = (<GatsbyImage objectFit="contain" alt={link.title} image={image_src.childImageSharp.gatsbyImageData} />);
        if (link && link.url) {
            const linkItem = isExternalUrl(link.url) ? (<a href={link?.url}>{link.title}</a>) : (<Link to={link.url}>{link.title}</Link>)
            return (
                <React.Fragment>
                    <div className="supporter"><a  className="supporter--wrapper" href={link?.url}>{img}</a></div>
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <div className="supporter">{img}</div>
                </React.Fragment>
            )
        }
    }
    if (link && !link.url) {
        return (
            <React.Fragment>
                <div className="supporter">{ link.title }</div>
            </React.Fragment>
        )
    }
    if (link && link.url) {
        const linkItem = isExternalUrl(link.url) ? (<a href={link?.url}>{link.title}</a>) : (<Link to={link.url}>{link.title}</Link>)
        return (
            <React.Fragment>
                <div className="supporter">{ linkItem }</div>
            </React.Fragment>
        )
    }
    return (<></>)
}

export default Supporter
