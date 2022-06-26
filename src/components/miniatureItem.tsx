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
    readonly image_src: string | null;
    readonly image_alt: string | null;
    readonly iiif_manifest_new: string | null;
}

export interface MiniatureItemProps {
    item: MiniatureItemInterface;
}


const MiniatureItem: React.FC<MiniatureItemProps> = ( {item} ) => {
    const iiifUri = item?.iiif_manifest_new ? item.iiif_manifest_new : ''
    return (
        <React.Fragment>
            <div className="fb--image">
                { item?.image_src && <img src={item?.image_src} alt={item.image_alt ? item.image_alt : 'Placeholder'} /> }
            </div>
            <div className="fb--content">
                <h2>{item.title}</h2>
                <div className="artist">{item.artist_text}</div>
                <div className="sitter">{item.sitter_text}</div>
            </div>
        </React.Fragment>
    )
}


export default MiniatureItem