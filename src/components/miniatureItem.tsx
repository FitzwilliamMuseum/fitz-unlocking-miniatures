import * as React from "react"
import type { PageProps } from "gatsby"
import { Link } from 'gatsby'
import '../styles/styles.scss'
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import { isExternalUrl } from "../util";
import { link } from "fs";
import { Index } from "lunr";
import MiniatureItemSearchCard from "./miniatureSearchCard";
import config from "../../gatsby-config";
import InfoIcon from "../assets/svg/info-icon.svg"
import ViewerIcon from "../assets/svg/viewer-icon.svg"

export interface MiniatureItemInterface {
    readonly id: string | null;
    readonly title: string | null;
    readonly artist_text: string | null;
    readonly sitter_text: string | null;
    readonly image_normal_light: string | null;
    readonly image_alt: string | null;
    readonly iiif_manifest_new: string | null;
}

export interface MiniatureItemProps {
    item: MiniatureItemInterface;
    result: Index.Result | null;
}


const MiniatureItem: React.FC<MiniatureItemProps> = ( {item, result} ) => {
    const iiifUri = item?.iiif_manifest_new ? item.iiif_manifest_new : ''
    const image_src: string = item?.image_normal_light ? `${config?.siteMetadata?.api.url}/assets/${item.image_normal_light}?fit=cover&width=300&height=400&quality=80` : ''
    const linkUri: string = `/explore/${item?.id}`
    return (
        <React.Fragment>
            <div className="miniature-item">
                <div className="miniature-item__image">
                    { image_src && <img src={image_src} alt={item.image_alt ? item.image_alt : 'Placeholder'} /> }
                </div>
                <div className="miniature-item__content">
                    <h2>{item.title}</h2>
                    <div className="artist">{item.artist_text}</div>
                    <div className="sitter">{item.sitter_text}</div>
                </div>
                <MiniatureItemSearchCard item={item} result={result}/>
                <div className="miniature-item__actions">
                    <Link className="miniature-item__button" to={`/object/${item?.id}`}><span className="icon"><InfoIcon/></span><span>More information</span></Link><Link className="miniature-item__button" to={`/view/${item?.id}`}><span className="icon"><ViewerIcon/></span><span>Viewer</span></Link>
                </div>
            </div>
        </React.Fragment>
    )
}


export default MiniatureItem