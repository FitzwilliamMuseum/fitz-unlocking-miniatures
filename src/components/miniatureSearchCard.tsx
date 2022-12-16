import * as React from "react"
import { Index } from 'lunr'
import '../styles/styles.scss'
import { collectionsFields } from "../util/search";

const availableFields = collectionsFields()

//Allows the addition of non defined fields (see search.tsx for field list from Directus)
export type ExtendedMiniatureItemInterface = MiniatureItemInterface & { [k: string]: any }

export interface MiniatureItemSearchCardProps {
    item: MiniatureGraphQLItem;
    result: Index.Result | null;
}

type StyledSearchMatchingTextItemProps = {
    textLeft: string
    textCenter: string
    textRight: string
}

function StyledSearchMatchingTextItem({ textLeft, textCenter, textRight }: StyledSearchMatchingTextItemProps) {
    return (
        <>
            {textLeft && <span>{textLeft}</span>}
            <span className="iniature-items-search--result--match">
                &nbsp;{textCenter}&nbsp;
            </span>
            {textRight && <span>{textRight}</span>}
        </>
    )
}

type StyledSearchMatchingTextProps = {
    body: string
    position: any
}

function StyledSearchMatchingText({ body, position }: StyledSearchMatchingTextProps) {

    return (
        <>
            {position.map((positionItem: number[], index: number) => {
                const positionOffsetMax = 80;

                const positionLeftStart = position[index - 1] ? (position[index - 1][0] + position[index - 1][1]) : 0;
                const positionLeftEnd = positionItem[0];
                const positionLeftOffset = positionItem[0] - positionOffsetMax;
                const textLeft = positionLeftStart < positionLeftOffset ?
                    ' ... ' + body.slice(positionLeftOffset, positionLeftEnd) :
                    body.slice(positionLeftStart, positionLeftEnd);

                const positionRightStart = positionItem[0] + positionItem[1];
                const positionRightEnd = positionItem[0] + positionItem[1] + positionOffsetMax;
                const textRight = 
                index >= (position.length - 1) ?
                (body.slice(positionRightStart, positionRightEnd) + (positionRightEnd < body.length ? ' ... ' : '')) :
                '';

                const textCenter = body.slice(
                    positionItem[0],
                    positionItem[0] + positionItem[1]
                );

                return <StyledSearchMatchingTextItem
                    key={index + body}
                    textLeft={textLeft}
                    textRight={textRight}
                    textCenter={textCenter} />
            })}
        </>
    )
}

const MiniatureItemSearchCard: React.FC<MiniatureItemSearchCardProps> = ({ item, result }) => {

    const resultItems = Object.values(result?.matchData.metadata || {});

    if (resultItems.length <= 0) {
        return <></>
    }

    const metadataByField: {
        [key: string]: {
            title: string
            field: String
            position: [][]
        }
    } = {};

    resultItems.forEach(metadataQueryMatch => {
        Object.keys(metadataQueryMatch).forEach(field => {
            if (!metadataByField[field]) {

                let title = field;
                for (let i = 0; i < availableFields.length; i++) {
                    if (availableFields[i].fieldname == field) {
                        title = availableFields[i].label;
                        break;
                    }
                }

                metadataByField[field] = {
                    title,
                    field,
                    position: []
                };
            }
            metadataByField[field].position = metadataByField[field].position.concat(metadataQueryMatch[field].position);
            metadataByField[field].position.sort((a: any, b: any) => { return a[0] - b[0] });
        })
    });

    const searchResults = Object.values(metadataByField).map(({ title, field, position }, index) => {
        return (
            <div className="search-card__item" key={index}>
                <div className="search-card__item-title">{title}</div>
                <div className="search-card__item-value" >
                    <StyledSearchMatchingText body={
                            //@ts-ignore
                            item[field]} position={position} />
                </div>
            </div>)
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