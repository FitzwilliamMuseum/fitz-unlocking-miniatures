import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import * as React from "react"
import '../styles/styles.scss'

interface SupporterProps {
    readonly link: {
        readonly url: string | null;
        readonly title: string;
    };
    readonly image_src: {
        readonly childImageSharp: {
            readonly gatsbyImageData: IGatsbyImageData;
        } | null;
        publicURL: string
    } | null;
}

const Supporter: React.FC<SupporterProps> = ({ link, image_src }) => {

    if (image_src && image_src.childImageSharp) {
        const img = (<GatsbyImage objectFit="contain" alt={link.title} image={image_src.childImageSharp.gatsbyImageData} />);
        if (link && link.url) {
            return <div className="supporter"><a className="supporter--wrapper" href={link?.url} target="__blank">{img}</a></div>
        } else {
            return <div className="supporter">{img}</div>
        }
    }
    if (image_src?.publicURL) {
        const img = <img alt={link.title} src={image_src.publicURL} />;
        if (link && link.url) {
            return <div className="supporter"><a className="supporter--wrapper" href={link?.url} target="__blank">{img}</a></div>
        } else {
            return <div className="supporter">{img}</div>
        }
    }
    if (link && !link.url) {
        return <div className="supporter">{link.title}</div>
    }
    if (link && link.url) {
        return <div className="supporter"><a href={link?.url} target="__blank">{link.title}</a></div>
    }
    return (<></>)
}

export default Supporter
