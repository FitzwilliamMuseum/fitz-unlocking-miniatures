import React from "react"
import Layout from "../components/layout";
import config from "../../gatsby-config";
import ViewerIcon from "../assets/svg/viewer-icon.svg"
import MiniatureObjectImages from "../components/MiniatureObjectImages";

type ObjectPageContext = {
	pageResources: {
		json: {
			pageContext: MiniatureGraphQLItem
		}
	}
}

class ObjectPage extends React.Component<ObjectPageContext> {

	render() {
		//required for production gatsby build
		const mockMiniature = {
			image_normal_light: { id: "", title: "" }, collection: { name: "" },
		}
		const miniature: MiniatureGraphQLItem = this.props?.pageResources?.json?.pageContext || mockMiniature;
		// @ts-ignore
		const imageUrl = `${config.siteMetadata.api.url}assets/${miniature.image_normal_light.id}?format=jpg&height=200&quality=80`;
		const imageAlt = miniature.image_normal_light.title;

		return <Layout displayLogo={false} >
			<div className="object">
				<div className="object--hero-wrapper">
					<div className="object--hero-content">
						<h1>{miniature.title}</h1>
						<div className="object--hero-info">
							<img src={imageUrl} alt={imageAlt} />
							<div className="object--hero-info-table">
								<div><strong>Accession number</strong></div><div>{miniature.accession_number}</div>
								{miniature.object_record_in_collection && <><div>
									<a href={miniature.object_record_in_collection} target="__blank">Object record</a>
								</div><div></div></>}
								<div><strong>Production date</strong></div><div>{miniature.production_date_text}</div>
								<div><strong>Artist</strong></div><div>{miniature.artist_text}</div>
								<div><strong>Sitter</strong></div><div>{miniature.sitter_text}</div>
								{miniature.collection && <><div><strong>Collection</strong></div><div>{miniature.collection?.name}</div></>}
								{miniature.Credit && <><div><strong>Credit</strong></div><div>{miniature.Credit}</div></>}
							</div>
						</div>
					</div>
				</div>
				<div className="object--actions-wrapper">
					<div className="miniature-items object--actions">
						<a
							className="miniature-item__button"
							// @ts-ignore
							href={`${config.siteMetadata.viewer.url}?manifestId[]=${config.siteMetadata.iiif.url + miniature.accession_number}/manifest.json`}>
							<span className="icon"><ViewerIcon /></span><span>Viewer</span>
						</a>
						<a href="#description"><h2 id="description">Description</h2></a>
						<a href="#images"><h2 >Images</h2></a>
						{miniature.images_micrographs &&
							miniature.images_micrographs.length > 0 &&
							<a href="#micrographs"><h2 >Micrographs</h2></a>}
					</div>
				</div>
				<div className="object--description-wrapper">
					<div className="object--description-content">
						<a href="#description"><h2 id="description">Description</h2></a>
						<div>{miniature.description_content}</div>
						<div>{miniature.description_physical}</div>
						<table>
							<tr>
								<td>Dimensions</td>
								<td>{miniature.dimensions_unframed_width} x {miniature.dimensions_unframed_height} mm</td>
							</tr>
							<tr>
								<td>Materials</td>
								<td>{miniature.materials_supports}</td>
							</tr>
							<tr>
								<td>Analytical techniques</td>
								<td>{miniature.analytical_techniques_used?.join(', ') || ''}</td>
							</tr>
						</table>
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
						<div className="object--description-exhibitions">
							<a href="#exhibitions"><h3 id="exhibitions">Exhibitions</h3></a>
							{miniature?.exhibitions?.map(item => (
								<div>
									<a href={item.exhibitions_id.url} target="__blank">
										{`${item.exhibitions_id.name} ${item.exhibitions_id.start_date}-${item.exhibitions_id.end_date}`}
									</a>
								</div>
							)) || <div></div>}
						</div>
						<div className="object--description-references">
							<a href="#references"><h3 id="references">References</h3></a>
							<table>
								{miniature?.references?.map(item => (
									<tr>
										{!!item.references_id.url && <td><a href={item.references_id.url} target="__blank">{item.references_id.display_title}</a></td>}
										{!item.references_id.url && <td>{item.references_id.display_title}</td>}
										<td>{item.references_id.publication_year || ''}</td>
										<td>{item.references_id.authors
											.map(author => author.authors_and_editors_id.display_name).join('; ')}</td>
									</tr>
								)) || <div></div>}
							</table>
						</div>
						<a href="#images"><h2 id="images">Images</h2></a>
						<MiniatureObjectImages miniature={miniature} />
						{miniature.images_micrographs &&
							miniature.images_micrographs.length > 0 &&
							<a href="#micrographs"><h2 id="micrographs">Micrographs</h2></a>}
						<div className="object--micrographs">
							{miniature.images_micrographs && miniature.images_micrographs?.map(micrograph => {
								// @ts-ignore
								const micrographImageDownloadUrl = `${config.siteMetadata.api.url}assets/${micrograph.micrograph.id}?format=jpg`;
								// @ts-ignore
								const micrographImageAnchorUrl = `${config.siteMetadata.api.url}assets/${micrograph.micrograph.id}?format=jpg&height=200&quality=80`;
								const micrographImageAlt = micrograph.file_name;
								return (
									<div id={micrograph.file_name}>
										<a href={micrographImageDownloadUrl} target="__blank">
											<img loading="lazy" src={micrographImageAnchorUrl} alt={micrographImageAlt} />
										</a>
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
			</div>
		</Layout>
	}
}


export default ObjectPage;