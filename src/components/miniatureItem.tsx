import * as React from "react"
import type { PageProps } from "gatsby"
import { Link } from 'gatsby'
import '../styles/styles.scss'
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import { isExternalUrl } from "../util";
import { link } from "fs";

export interface MiniatureItemInterface {
    readonly title: string | null;
    readonly artist_text: string | null;
    readonly sitter_text: string | null;
    readonly image_normal_light: string | null;
    readonly image_alt: string | null;
    readonly iiif_manifest_new: string | null;
}

export interface MiniatureItemProps {
    item: MiniatureItemInterface;
}


const MiniatureItem: React.FC<MiniatureItemProps> = ( {item} ) => {
    const iiifUri = item?.iiif_manifest_new ? item.iiif_manifest_new : ''
    const image_src: string = item?.image_normal_light ? `https://rlq782oa.directus.app/assets/${item.image_normal_light}?fit=cover&width=300&height=400&quality=80` : ''
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
            </div>
        </React.Fragment>
    )
}


export default MiniatureItem