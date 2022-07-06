
type MiniatureItemInterface = {
    id: string | null;
    title: string | null;
    artist_text: string | null;
    sitter_text: string | null;
    image_normal_light: string | null;
    image_alt: string | null;
    iiif_manifest_new: string | null;
    accession_number: string
}

type MiniatureGraphQLItem = {
    id: string
    title: string
    collection: {
        id: string
        name: string
    }
    accession_number: string
    production_date: string
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
    analytical_techniques_used: string
    exhibitions: {
        id: string
        exhibitions_id: {
            id: string
            name: string
        }
        miniatures_id: {
            id: string
            accession_number: string
        }
    }
    references: {
        id: string
        references_id: {
            id: string
            book_title: string
            display_title: string
            article_title: string
            journal_title: string
        }
    }
    image_normal_light: {
        id: string
        title: string
        filename_disk: string
        filename_download: string
    }
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