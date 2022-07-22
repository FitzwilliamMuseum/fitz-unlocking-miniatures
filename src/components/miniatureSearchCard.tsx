import * as React from "react"
import { Index } from 'lunr'
import '../styles/styles.scss'
import { collectionsFields } from "../util/search";

//Allows the addition of non defined fields (see search.tsx for field list from Directus)
export type ExtendedMiniatureItemInterface = MiniatureItemInterface & { [k: string]: any}

export interface MiniatureItemSearchCardProps {
    item: ExtendedMiniatureItemInterface;
    result: Index.Result | null;
}


const MiniatureItemSearchCard: React.FC<MiniatureItemSearchCardProps> = ( {item, result} ) => {
    if (!result) {
        return <></>
    }
    //The object returned is keyed by search term, so popping this to get the value
    // @ts-ignore
    const metadata = Object.keys(result.matchData.metadata).length > 0 ? result.matchData.metadata[Object.keys(result.matchData.metadata)[0]] : {}
    const availableFields = collectionsFields()
    const matchingFields = Object.keys(metadata)
    if (matchingFields.length == 0) {
        return <></>
    }
    const searchResults: any = []
    matchingFields.forEach((key) => {
        if (item[key]) {
            const title = availableFields.map(item => {
                if (item.fieldname == key) {
                    return item.label
                }
            }).join('')
            searchResults.push(
                <div className="search-card__item">
                    <div className="search-card__item-title">{title}</div>
                    <div className="search-card__item-value">{item[key]}</div>
                </div>)
        }
    })
    return (
        <React.Fragment>
            <div className="search-card">
                {searchResults}
            </div>
        </React.Fragment>
    )
}


export default MiniatureItemSearchCard