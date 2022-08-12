
type MiniatureItemInterface = {
    id: string | null;
    title: string | null;
    artist_text: string | null;
    sitter_text: string | null;
    image_normal_light: string | null;
    image_alt: string | null;
    iiif_manifest_new: string | null;
    accession_number: string
    slug: string
    production_date_text: string
    production_date: string | null
    monogram: boolean
    description_content: string
    description_physical: string
    materials_supports: string
}

type MiniatureObjectImage = {
    id: string
    title: string
    filename_disk: string
    filename_download: string
}

type MiniatureGraphQLItem = {
    id: string
    title: string
    collection: {
        id: string
        name: string
    }
    accession_number: string
    production_date_text: string
    artist_text: string
    artist_reference: {
        id: string
        forename: string
        surname: string
    }
    sitter_text: string
    sitter_reference: {
        id: string
        forename: string
        surname: string
    }
    description_content: string
    description_physical: string
    monogram: boolean
    dimensions_unframed_width: string
    dimensions_unframed_height: string
    pigments_background: string
    pigments_costume: string
    pigments_flesh_tones_and_lips: string
    pigments_hair_and_beard: string
    pigments_jewellery: string
    materials_supports: string
    analytical_techniques_used: Array<string>
    exhibitions: Array<{
        id: string
        exhibitions_id: {
            id: string
            name: string
            start_date: string
            end_date: string
            url
        }
    }>
    references: Array<{
        id: string
        references_id: {
            authors: Array<{
                authors_and_editors_id: {
                    display_name: string
                    id: string
                }
            }>
            display_title: string
            id: string
            publication_year: string
            url?: string
        }
    }>
    image_normal_light: MiniatureObjectImage
    image_raking_light?: MiniatureObjectImage
    image_infrared?: MiniatureObjectImage
    image_uv?: MiniatureObjectImage
    image_xray?: MiniatureObjectImage
    image_verso?: MiniatureObjectImage
    images_micrographs: Array<{
        id: string
        file_name: string
        hotspot: boolean
        description: string
        micrograph: {
            id: string
        }
    }>
    slug: string
    object_record_in_collection: string
}

type MiniatureItemProps = {
    item: MiniatureItemInterface;
    result: Index.Result | null;
    onClickCompare: VoidFunction;
    compareActive: boolean;
}

type MiniatureItemWithSearchResultInterface = {
    item: MiniatureItemInterface
    result: Index.Result | null
}