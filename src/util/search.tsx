import lunr, { Index } from 'lunr';
import config from '../../gatsby-config';

// TODO: should we move this to config?
export const collectionsFields = (): Array<any> => {
    const fields = [
        { label: "Title", fieldname: 'title' },
        { label: "Artist", fieldname: 'artist_text' },
        { label: "Sitter", fieldname: 'sitter_text' },
        { label: "Image", fieldname: 'image_normal_light', exclude: true },
        { label: "ID", fieldname: 'id', ref: true, exclude: true },
        { label: "Background pigments", fieldname: 'pigments_background' },
        { label: "Flesh tones pigments", fieldname: 'pigments_flesh_tones' },
        { label: "Lips pigments", fieldname: 'pigments_lips' },
        { label: "Hair pigments", fieldname: 'pigments_hair' },
        { label: "Lace pigments", fieldname: 'pigments_lace' },
        { label: "Ruff/Collar pigments", fieldname: 'pigments_ruff_or_collar' },
        { label: "Costume pigments", fieldname: 'pigments_costume' },
        { label: "Jewellery pigments", fieldname: 'pigments_jewellery' },
        { label: "Accession number", fieldname: "accession_number" },
        { label: "Slug", fieldname: "slug" },
        { label: "Production date text", fieldname: "production_date_text", exclude: true },
        { label: "Production date", fieldname: "production_date", exclude: true },
        { label: "Monogram", fieldname: "monogram", exclude: true },
        { label: "Description", fieldname: "description_content" },
        { label: "Description", fieldname: "description_physical" },
        { label: "Support material", fieldname: "materials_supports" },
        { label: "Collection", fieldname: "collection" },
        { label: "Credit", fieldname: "Credit" }
    ]
    return fields;
}

export const buildDirectusRequestUrl = (): string => {
    const fields = collectionsFields().map((item) => {
        return 'fields[]=' + item.fieldname
    })
    // @ts-ignore
    const url = config?.siteMetadata?.api.url + config?.siteMetadata?.api.collections.miniatures
    return url + '?' + fields.join('&')
}

export const buildDirectusGraphQlRequest = (): string => {
    const fields = collectionsFields().map((item) => {
        return 'fields[]=' + item.fieldname
    })
    // @ts-ignore
    const url = config?.siteMetadata?.api.url + config?.siteMetadata?.api.collections.miniatures
    return url + '?' + fields.join('&')
}

export const createSearchIndexFromGraphQl = (documents: Array<MiniatureGraphQLItem>): Index => {
    return lunr(function () {
        this.ref('id');
        this.metadataWhitelist = ['position'];

        collectionsFields().forEach(item => {
            if (!item.exclude) {
                this.field(item.fieldname)
            }
        });

        documents.forEach((item) => {
            this.add({
                ...item,
                //@ts-ignore
                collection: item.collection.name
            })
        });
    });
};

export const createSearchIndex = (documents: Array<any>): Index => {
    return lunr(function () {
        this.ref('id');
        this.metadataWhitelist = ['position'];
        collectionsFields().forEach((item) => {
            if (!item.exclude) {
                this.field(item.fieldname)
            }
        })
        documents.forEach((doc) => {
            this.add(doc)
        });
    });
};

const defaultSuggestFields = ['title', 'collection', 'artist_text', 'sitter_text'];

export function searchSuggest(searchIndex: Index, searchTerm: string, suggestFields = defaultSuggestFields): Index.Result[] {

    return searchTerm ? searchIndex.query(function (q) {
        // exact match
        q.term(searchTerm, {
            boost: 100,
            fields: suggestFields
        })
        // prefix match
        q.term(searchTerm, {
            usePipeline: true,
            wildcard: lunr.Query.wildcard.TRAILING,
            boost: 10,
            fields: suggestFields
        })
        // fuzzy matching
        q.term(searchTerm, {
            usePipeline: false,
            editDistance: 1,
            boost: 1,
            fields: suggestFields
        })
    }) : [];
}