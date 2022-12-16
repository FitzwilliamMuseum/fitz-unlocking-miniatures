import * as React from "react"
import { Link } from 'gatsby'
import '../styles/styles.scss'
import MiniatureItemSearchCard from "./miniatureSearchCard";
import config from "../../gatsby-config";
import ViewerIcon from "../assets/svg/viewer-icon.svg"
import CompareAddIcon from "../assets/svg/add-icon.svg"
import CompareRemoveIcon from "../assets/svg/remove-icon.svg"
import { urlSafeString } from "../util";

class MiniatureItem extends React.Component<MiniatureItemProps> {

    constructor(props: MiniatureItemProps) {
        super(props);
    }

    render() {
        const { item, result, onClickCompare, compareActive } = this.props;
        const image_src: string = item.image_normal_light.filename_disk ?
            // @ts-ignore
            `${config?.siteMetadata?.api.url}/assets/${item.image_normal_light.filename_disk}?fit=cover&width=300&height=400&quality=80` : '';
        const objectPageUrl = `/object/${item.slug}`;
        // @ts-ignore
        const viewerUrl = `${config.siteMetadata.viewer.url}?manifestId[]=${config.siteMetadata.iiif.url + urlSafeString(item.accession_number)}/manifest.json`
        return (
            <React.Fragment>
                <div className="miniature-item">
                    <div className="miniature-item__image">
                        <Link to={objectPageUrl}>
                            {image_src && <img src={image_src} alt={item.title} />}
                        </Link>
                    </div>
                    <div className="miniature-item__content">
                        <Link to={objectPageUrl}>
                            <h2>{item.title}</h2>
                        </Link>
                        <div className="production_date_text">{item.production_date_text}</div>
                        <div className="accession_number">{item.accession_number}</div>
                        <div className="artist">{item.artist_text}</div>
                        <div className="sitter">{item.sitter_text}</div>
                    </div>
                    <MiniatureItemSearchCard item={item} result={result} />
                    <div className="miniature-item__actions">
                        <a
                            className="miniature-item__button"
                            href={viewerUrl}>
                            <span className="icon"><ViewerIcon /></span><span>Viewer</span>
                        </a>
                        <div className="miniature-item__button" onClick={onClickCompare}>
                            <span className="icon">
                                {compareActive ? <CompareRemoveIcon /> : <CompareAddIcon />}
                            </span>
                            <span>Compare</span>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default MiniatureItem