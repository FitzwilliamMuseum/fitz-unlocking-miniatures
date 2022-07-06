import React from "react"
import Layout from "../components/layout";
import { Link } from 'gatsby'
import ViewerIcon from "../assets/svg/viewer-icon.svg"

type ObjectPageContext = {
	pageResources: {
		json: {
			pageContext: MiniatureGraphQLItem
		}
	}
}

export default function ObjectPage({ pageResources: { json: { pageContext } } }: ObjectPageContext) {
	const miniature = pageContext;
	const imageUrl = `https://unlocking-miniatures.fitz.ms/assets/${miniature.image_normal_light.id}?&height=200&quality=80`;
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
						<div>Production date</div><div>{miniature.production_date}</div>
						<div>Artist</div><div>{miniature.artist_text}</div>
						<div>Sitter</div><div>{miniature.sitter_text}</div>
					</div>
				</div>
			</div>
		</div>
		<div className="miniature-items object--actions">
			<Link className="miniature-item__button" to={`/view/${miniature.id}`}>
				<span className="icon"><ViewerIcon /></span><span>Viewer</span>
			</Link>
		</div>
		<div className="object--description-wrapper">
			<div className="object--description-content">
				<h2>Description</h2>
				<div>{miniature.description_content}</div>
				<div>{miniature.description_physical}</div>
				<p className="object--description-dimentions">
					<span><strong>Dimentions</strong></span>
					<span>{miniature.dimensions_unframed_width} x {miniature.dimensions_unframed_height} cm</span>
				</p>
				<div className="object--description-pigments">
					<h3>Pigments</h3>
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
					<p><span><strong>Analytical techniques</strong></span><span>{miniature.analytical_techniques_used}</span></p>
				</div>
			</div>
		</div>
	</Layout>
}
