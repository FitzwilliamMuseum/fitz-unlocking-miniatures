import lunr, { Index } from 'lunr'
import config from '../../gatsby-config';

// TODO: should we move this to config?
export const collectionsFields = () : Array<any> => {
    const fields = [
        {label: "Title", fieldname: 'title'},
        {label: "Artist", fieldname: 'artist_text'},
        {label: "Sitter", fieldname: 'sitter_text'},
        {label: "Image", fieldname: 'image_normal_light', exclude: true},
        {label: "ID", fieldname: 'id', ref: true, exclude: true},
        {label: "Background pigments", fieldname: 'pigments_background'},
        {label: "Flesh tones pigments", fieldname: 'pigments_flesh_tones'},
        {label: "Lips pigments", fieldname: 'pigments_lips'},
        {label: "Hair pigments", fieldname: 'pigments_hair'},
        {label: "Lace pigments", fieldname: 'pigments_lace'},
        {label: "Ruff/Collar pigments", fieldname: 'pigments_ruff_or_collar'},
        {label: "Costume pigments", fieldname: 'pigments_costume'},
        {label: "Jewellery pigments", fieldname: 'pigments_jewellery'},
    ]
    return fields;
}

export const buildDirectusRequestUrl = (): string => {
    const fields = collectionsFields().map((item) => {
        return 'fields[]=' + item.fieldname
    })
    const url = config?.siteMetadata?.api.url + config?.siteMetadata?.api.collections.miniatures
    return url + '?' + fields.join('&')
}

export const createSearchIndex = (documents: Array<any>) : Index => {
    return lunr(function() {
        this.ref('id')
        collectionsFields().forEach((item) => {
            if (!item.exclude) {
                this.field(item.fieldname) //We don't do any weighting but could here
            }
        })

        documents.forEach((doc) => {
            this.add(doc)
        })

    })
};