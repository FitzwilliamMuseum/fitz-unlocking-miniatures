import React from "react"
import Layout from "../components/layout";
import config from "../../gatsby-config";
import ViewerIcon from "../assets/svg/viewer-icon.svg"

type ObjectPageContext = {
	pageResources: {
		json: {
			pageContext: MiniatureGraphQLItem
		}
	}
}

class ObjectPage extends React.Component<ObjectPageContext> {

	render() {
		const mockMiniature = { image_normal_light: { id: "", title: "" }, collection: { name: "" } } //required for production build
		const miniature: MiniatureGraphQLItem = this.props?.pageResources?.json?.pageContext || mockMiniature;
		// @ts-ignore
		const imageUrl = `${config.siteMetadata.api.url}assets/${miniature.image_normal_light.id}?format=jpg&height=200&quality=80`;
		const imageAlt = miniature.image_normal_light.title;

		return <Layout displayLogo={false} >
			<div className="object--hero-wrapper">
				<div className="object--hero-content">
					<img src={imageUrl} alt={imageAlt} />
					<div className="object--hero-info">
						<h1>{miniature.title}</h1>
						<div className="object--hero-info-table">
							<div>Collection</div><div>{miniature.collection.name}</div>
							<div>Accession number</div><div>{miniature.accession_number}</div>
							<div>Production date</div><div>{miniature.production_date_text}</div>
							<div>Artist</div><div>{miniature.artist_text}</div>
							<div>Sitter</div><div>{miniature.sitter_text}</div>
						</div>
					</div>
				</div>
			</div>
			<div className="miniature-items object--actions">
				<a
					className="miniature-item__button"
					// @ts-ignore
					href={`${config.siteMetadata.viewer.url}?manifestId[]=${config.siteMetadata.iiif.url + miniature.accession_number}/manifest.json`}>
					<span className="icon"><ViewerIcon /></span><span>Viewer</span>
				</a>
			</div>
			<div className="object--description-wrapper">
				<div className="object--description-content">
					<h2>Description</h2>
					<div>{miniature.description_content}</div>
					<div>{miniature.description_physical}</div>
					<p className="object--description-dimensions">
						<span><strong>Dimensions</strong></span>
						<span>{miniature.dimensions_unframed_width} x {miniature.dimensions_unframed_height} cm</span>
					</p>
					<div className="object--description-pigments">
						<a href="#pigments"><h3 id="pigments">Pigments</h3></a>
						<table>
							<tr><td>Background</td><td>{miniature.pigments_background}</td></tr>
							<tr><td>Costume</td><td>{miniature.pigments_costume}</td></tr>
							<tr><td>Jewellery</td><td>{miniature.pigments_jewellery}</td></tr>
							<tr><td>Flesh tones and lips</td><td>{miniature.pigments_flesh_tones_and_lips}</td></tr>
							<tr><td>Hair and beard</td><td>{miniature.pigments_hair_and_beard}</td></tr>
						</table>
					</div>
					<div className="object--description-materials-and-techniques">
						<p><span><strong>Materials</strong></span><span>{miniature.materials_supports}</span></p>
						<p>
							<span><strong>Analytical techniques</strong></span>
							<span>{miniature.analytical_techniques_used?.join(', ') || ''}</span>
						</p>
					</div>
					<a href="#micrographs"><h2 id="micrographs">Micrographs</h2></a>
					<div className="object--micrographs">
						{miniature.images_micrographs && miniature.images_micrographs?.map(micrograph => {
							// @ts-ignore
							const micrographImageDownloadUrl = `${config.siteMetadata.api.url}assets/${micrograph.micrograph.id}?format=jpg`;
							// @ts-ignore
							const micrographImageAnchorUrl = `${config.siteMetadata.api.url}assets/${micrograph.micrograph.id}?format=jpg&height=200&quality=80`;
							const micrographImageAlt = micrograph.file_name;
							return (
								<div id={micrograph.file_name}>
									<img loading="lazy" src={micrographImageAnchorUrl} alt={micrographImageAlt} />
									<p>
										<a href={`#${micrograph.file_name}`}><strong>{micrograph.file_name}</strong></a>
										{!!micrograph.hotspot && <span> Hotspot</span>}
										<div>{micrograph.description}</div>
									</p>
									<a href={micrographImageDownloadUrl} target="__blank">Open full size</a>
								</div>
							)
						})}
					</div>
				</div>
			</div>
		</Layout>
	}
}


export default ObjectPage;