import React from 'react';
import config from "../../gatsby-config";

type MiniatureObjectImagesProps = {
    miniature: MiniatureGraphQLItem
}

const imageOptions = [
    {
        field: 'image_normal_light',
        label: 'Normal light'
    },
    {
        field: 'image_raking_light',
        label: 'Raking light'
    },
    {
        field: 'image_infrared',
        label: 'Infrared'
    },
    {
        field: 'image_uv',
        label: 'Ultraviolet'
    },
    {
        field: 'image_xray',
        label: 'X-Ray'
    },
    {
        field: 'image_verso',
        label: 'Verso'
    }
]

class MiniatureObjectImages extends React.Component<MiniatureObjectImagesProps> {

    constructor(props: MiniatureObjectImagesProps) {
        super(props);
    }

    render() {
        const { miniature } = this.props;
        return (
            <div className="object--images">
                {
                    // @ts-ignore
                    imageOptions.filter(item => miniature?.[item.field] != null).map(item => {
                        // @ts-ignore
                        const sourceImage = miniature[item.field] as MiniatureObjectImage;
                        // @ts-ignore
                        const imageUrl = `${config.siteMetadata.api.url}assets/${sourceImage.id}?format=jpg&width=300&quality=80`;
                        const imageAlt = sourceImage.title;
                        // @ts-ignore
                        const downloadUrl = `${config.siteMetadata.api.url}assets/${sourceImage.id}?format=jpg`;
                        return (
                            <div id={sourceImage.id}>
                                <img loading="lazy" src={imageUrl} alt={imageAlt} />
                                <p>
                                    <a href={`#${sourceImage.id}`}><strong>{item.label}</strong></a>
                                    <div>{sourceImage.title}</div>
                                </p>
                                <a href={downloadUrl} target="__blank">Open full size</a>
                            </div>
                        )
                    })}
            </div>
        )
    }
}

export default MiniatureObjectImages;