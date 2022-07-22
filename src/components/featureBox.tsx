import * as React from "react"
import { Link } from 'gatsby'
import '../styles/styles.scss'
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import { isExternalUrl } from "../util";

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


const FeatureBox: React.FC<FeatureBoxProps> = ({ item, direction }) => {
    const d = direction ? direction : 'left'
    const linkUri = item?.link?.url || ''
    const linkExternal = isExternalUrl(linkUri)
    if (linkExternal) {
        return (
            <a className="section--fb-item" href={linkUri}>
                {featureBoxStructure(item, d, true)}
            </a>
        )
    }
    return <Link className="section--fb-item" to={linkUri}>
        {featureBoxStructure(item, d, true)}
    </Link>
}

const featureBoxStructure = (item: FeatureBoxItem, direction: string, hasLink: boolean) => {
    const image = item?.image_src ? item.image_src?.childImageSharp?.gatsbyImageData : null
    if (direction == 'left') {
        return (
            <>
                <ConditionalWrapper
                    condition={!hasLink}
                    wrapper={(children: any) => <div className="section--fb-item">{children}</div>}
                >
                    <React.Fragment>
                        <div className="fb--image">
                            {image && <GatsbyImage image={image} alt={item.image_alt ? item.image_alt : 'Placeholder'} />}
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
                wrapper={(children: any) => <div className="section--fb-item">{children}</div>}
            >
                <React.Fragment>
                    <div className="fb--content">
                        <h2>{item.title}</h2>
                        <div className="text">{item.content}</div>
                    </div>
                    <div className="fb--image">
                        {image && <GatsbyImage image={image} alt={item.image_alt ? item.image_alt : 'Placeholder'} />}
                    </div>
                </React.Fragment>
            </ConditionalWrapper>
        </>
    )
}

const ConditionalWrapper = (props: any) => {
    const { condition, wrapper, children } = props;
    return condition ? wrapper(children) : children;
}

export default FeatureBox