import * as React from "react"
import type { PageProps } from "gatsby"
import { Link } from 'gatsby'
import '../styles/styles.scss'
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import { isExternalUrl } from "../util";
import { link } from "fs";

export interface FeatureBoxItem {
    readonly title: string | null;
    readonly content: string | null;
    readonly image_alt: string | null;
    readonly link: {
        readonly url: string | null;
        readonly title: string | null;
    } | null;
    readonly image_src: {
        readonly childImageSharp: {
            readonly gatsbyImageData: IGatsbyImageData;
        } | null;
    } | null;
}

export interface FeatureBoxProps {
    item: FeatureBoxItem;
    direction?: string;
}


const FeatureBox: React.FC<FeatureBoxProps> = ( {item, direction} ) => {
    const d = direction ? direction : 'left'
    const linkUri = item?.link && item?.link.url ? item.link.url : ''
    const linkExternal = isExternalUrl(linkUri)
    const linkInternal = !linkExternal && linkUri
    if (linkExternal) {
        return (
            <a className="section--fb-item" href={linkUri}>
                { featureBoxStructure(item, d, true) }
            </a>
        )
    } else if (linkInternal) {
        <Link className="section--fb-item" to={linkUri}>
           { featureBoxStructure(item, d, true) }
        </Link>
    } 
    return featureBoxStructure(item, d, false)
}

const featureBoxStructure = (item: FeatureBoxItem, direction: string, hasLink: boolean) => {
    const image = item?.image_src ? item.image_src?.childImageSharp?.gatsbyImageData : null
    if (direction == 'left') {
        return (
            <>
                <ConditionalWrapper 
                    condition={!hasLink} 
                    wrapper={ children => <div className="section--fb-item">{children}</div>}
                >
                    <React.Fragment>
                        <div className="fb--image">
                            { image && <GatsbyImage image={image} alt={item.image_alt ? item.image_alt : 'Placeholder'} /> }
                        </div>
                        <div className="fb--content">
                            <h2>{item.title}</h2>
                            <div className="text">{item.content}</div>
                        </div>
                    </React.Fragment>
                </ConditionalWrapper>
        </>
        )
    }
    return (
        <>
            <ConditionalWrapper 
                condition={!hasLink} 
                wrapper={ children => <div className="section--fb-item">{children}</div>}
            >
                <React.Fragment>
                    <div className="fb--content">
                        <h2>{item.title}</h2>
                        <div className="text">{item.content}</div>
                    </div>
                    <div className="fb--image">
                        { image && <GatsbyImage image={image} alt={item.image_alt ? item.image_alt : 'Placeholder'} /> }
                    </div>
                </React.Fragment>
            </ConditionalWrapper>
    </>
    )
}

const ConditionalWrapper = ({ condition, wrapper, children }) => 
  condition ? wrapper(children) : children;

export default FeatureBox