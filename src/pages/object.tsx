import React from "react"

export default function ObjectPage({ pageResources: { json: { pageContext } } }) {
	const imageUrl = `https://unlocking-miniatures.fitz.ms/assets/${pageContext.image_normal_light.id}?fit=cover&width=300&height=400&quality=80`;
	const imageAlt = pageContext.image_normal_light.name;
	return <div>
		<h1>{pageContext.title}</h1>
		<img src={imageUrl} alt={imageAlt} height="400" />
		<pre>{JSON.stringify(pageContext, null, "    ")}</pre>
	</div>
}
