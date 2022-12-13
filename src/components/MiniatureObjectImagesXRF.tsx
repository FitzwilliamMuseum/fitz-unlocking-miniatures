import React from 'react';
import config from "../../gatsby-config";

type MiniatureObjectImagesProps = {
    miniature: MiniatureGraphQLItem
}

class MiniatureObjectImagesXRF extends React.Component<MiniatureObjectImagesProps> {

    constructor(props: MiniatureObjectImagesProps) {
        super(props);
    }

    render() {
        const { miniature } = this.props;
        return (
            <div className="object--images--xrf-scan">
                {
                    miniature.images_ma_xrf_scans.map(item => {
                        // @ts-ignore
                        const imageUrl = `${config.siteMetadata.api.url}assets/${item.ma_xrf_scan.id}?format=jpg&width=300&withoutEnlargement&quality=80`;
                        const imageAlt = item.ma_xrf_scan.title;
                        // @ts-ignore
                        const downloadUrl = `${config.siteMetadata.api.url}assets/${item.ma_xrf_scan.id}?format=jpg&width=1920&withoutEnlargement&quality=80`;
                        return (
                            <div id={item.ma_xrf_scan.id}>
                                <a href={downloadUrl} target="__blank">
                                    <img loading="lazy" src={imageUrl} alt={imageAlt} />
                                </a>
                                <p>
                                    <a href={`#${item.ma_xrf_scan.id}`}><strong>{item.ma_xrf_scan.title}</strong></a>
                                    {item.element_investigated && <div>{item.element_investigated}</div>}
                                </p>
                                <a href={downloadUrl} target="__blank">Open full size</a>
                            </div>
                        )
                    })}
            </div>
        )
    }
}

export default MiniatureObjectImagesXRF;