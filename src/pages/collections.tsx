import React, { useState, useEffect } from "react"
import Layout from '../components/layout'
import MiniatureItem from "../components/miniatureItem"
import Loading from '../images/loading-spin.svg'
import { Link } from 'gatsby'
import ViewerIcon from "../assets/svg/viewer-icon.svg"
import config from "../../gatsby-config";
import CompareRemoveIcon from "../assets/svg/remove-icon.svg"
import lunr from "lunr";
import { searchSuggest } from "../util/search"

const suggestTextRegex = /[^a-zA-z0-9\- ]/g;

type Compare = {
  [id: string]: MiniatureGraphQLItem;
}

type NoResultsComponentProps = {
  searchText: string
  resultsCount: number
}

function NoResultsComponent({ searchText, resultsCount }: NoResultsComponentProps) {
  const noResultsText = '.    No results yet.   Please keep typing or search another term.';
  return <>{(searchText && resultsCount == 0) && (<div className={`no-search-results`}>
    <span className="no-search-results--text">Searching for <span className="search-text">{searchText}</span>{noResultsText}</span>
  </div>)}</>
}

type CompareComponentProps = {
  compareValues: MiniatureGraphQLItem[]
  removeCompareItem: (item: MiniatureGraphQLItem) => void
}

function CompareComponent({ compareValues, removeCompareItem }: CompareComponentProps) {
  return <>{(compareValues.length > 0) && <div className="miniature-collection--compare">
    <h3>Compare objects</h3>
    <p>Select up to 3 objects using the 'plus compare' button on other objects</p>
    {compareValues.map(compareItem => (
      <div className="miniature-items" key={compareItem.id}>
        <div className="miniature-item__button" onClick={() => removeCompareItem(compareItem)}>
          <span className="icon">
            <CompareRemoveIcon />
          </span>
          <span>{compareItem.title}</span>
        </div>
      </div>
    ))}
    <div className="miniature-items">
      <Link
        className="miniature-item__button"
        to={`/collections-compare/?items=${compareValues.map(item => item.accession_number).join(",")}`}>
        Object information comparison
      </Link>
      <a
        className="miniature-item__button"
        // @ts-ignore
        href={`${config.siteMetadata.viewer.url}?${compareValues.map(
          // @ts-ignore
          item => `manifestId[]=${config.siteMetadata.iiif.url + item.accession_number}/manifest.json`).join("&")}`}>
        <span className="icon"><ViewerIcon /></span><span>Image viewer comparison</span>
      </a>
    </div>
  </div>}</>
}

type FilterComponentProps = {
  filterValue: FilterState
  productionDateOptions: string[]
  monogramOptions: string[]
  onChangeSearchText: (searchText: string) => void
  onChangeDateStart: (start: string) => void
  onChangeDateEnd: (end: string) => void
  onChangeMonogram: (value: string) => void
  searchSuggestion: string[]
}

function FilterComponent(props: FilterComponentProps) {
  const {
    filterValue,
    productionDateOptions,
    monogramOptions,
    onChangeSearchText,
    onChangeDateStart,
    onChangeDateEnd,
    onChangeMonogram,
    searchSuggestion
  } = props;
  const productionDateOptionsHTML = productionDateOptions.map((item, index) => <option key={item + index} value={item}>{item}</option>)
  return <div className="miniature-items-search--container">
    <div className="miniature-items-search">
      <div className="miniature-items-search--input">
        <input name="searchKeywords"
          value={filterValue.text}
          onChange={(event) => onChangeSearchText(event.target.value)}
          placeholder="Search" />
        {searchSuggestion.length > 0 && <div className="miniature-items-search--suggest">
          {searchSuggestion.map((item) => <button
            className="miniature-items-search--suggest--item"
            key={item}
            onClick={() => onChangeSearchText(item)}>{item}</button>)}
        </div>}
      </div>
      <div>
        <label>Production date</label>
        <select
          value={filterValue.dateStart}
          onChange={(event) => onChangeDateStart(event.target.value)}>{productionDateOptionsHTML}</select><span> - </span>
        <select
          value={filterValue.dateEnd}
          onChange={(event) => onChangeDateEnd(event.target.value)}
        >{productionDateOptionsHTML}</select>
      </div>
      <select
        value={filterValue.monogram}
        onChange={(event) => onChangeMonogram(event.target.value)}
      >
        {monogramOptions.map((item, index) => <option key={item + index} value={item}>{item}</option>)}
      </select>
    </div>
  </div>
}

type ResultsComponentProps = {
  miniatures: MiniatureItemWithSearchResultInterface[]
  addCompareItem: (item: MiniatureGraphQLItem) => void
  removeCompareItem: (item: MiniatureGraphQLItem) => void
  compareActive: Compare
}

function ResultsComponent({ miniatures, addCompareItem, removeCompareItem, compareActive }: ResultsComponentProps) {
  return <div className={`miniature-items`}>
    {Array.isArray(miniatures) && miniatures.map(item => {
      const itemCompareActive = !!compareActive[item.item.id!!];
      return <MiniatureItem
        key={item.item.id}
        item={item.item}
        result={item.result}
        onClickCompare={() => itemCompareActive ? removeCompareItem(item.item) : addCompareItem(item.item)}
        compareActive={itemCompareActive}
      />
    })}
  </div>
}

type FilterState = {
  text: string
  dateStart: string
  dateEnd: string
  monogram: string
};

type CollectionPageProps = {
  pageContext: {
    miniatures: { [id: number]: MiniatureGraphQLItem }
    serialisedSearchIndex: string
  }
}

const MONOGRAM_OPT_ANY = "Monogram";
const MONOGRAM_OPT_YES = "Yes";
const MONOGRAM_OPT_NO = "No";

export default function CollectionsPage({ pageContext: { miniatures, serialisedSearchIndex } }: CollectionPageProps) {

  const [loading, setLoading] = useState(true)
  const [filteredMiniatures, setFilteredMiniatures] = useState<MiniatureItemWithSearchResultInterface[]>([])
  const [searchSuggestion, setSearchSuggestion] = useState<string[]>([])
  const [compare, setCompare] = useState<Compare>({})

  const dateOptions = [
    "1500", "1510", "1520", "1530", "1540", "1550", "1560", "1570", "1580", "1590",
    "1600", "1610", "1620", "1630", "1640", "1650", "1660", "1670", "1680", "1690",
    "1700"
  ];
  const monogramOptions = [MONOGRAM_OPT_ANY, MONOGRAM_OPT_YES, MONOGRAM_OPT_NO];

  let searchIndex = serialisedSearchIndex ? lunr.Index.load(JSON.parse(serialisedSearchIndex)) : null;

  const [filterState, setFilterState] = useState<FilterState>({
    text: "",
    dateStart: dateOptions[0],
    dateEnd: dateOptions[dateOptions.length - 1],
    monogram: MONOGRAM_OPT_ANY
  });

  useEffect(() => {
    setLoading(true);
    const searchTerm = filterState.text.toLowerCase().trim();
    const results = searchIndex ? searchIndex.search(searchTerm) : [];

    const filtered: MiniatureItemWithSearchResultInterface[] = [];
    for (let i = 0; i < results.length; i++) {
      const foundItem = miniatures[parseInt(results[i].ref)];
      if (foundItem) {
        if (typeof foundItem.production_date_text == "string") {
          const itemDate = foundItem.production_date_text.slice(0, 4);
          //filter production start date
          if (itemDate < filterState.dateStart) {
            continue;
          }
          //filter production end date
          if (itemDate > filterState.dateEnd) {
            continue;
          }
        }
        if (filterState.monogram == MONOGRAM_OPT_YES && !foundItem.monogram) {
          continue;
        }
        if (filterState.monogram == MONOGRAM_OPT_NO && !!foundItem.monogram) {
          continue;
        }

        filtered.push({ item: foundItem, result: results[i] })
      }
    }
    setFilteredMiniatures(filtered);

    const suggestResult = searchIndex ? searchSuggest(searchIndex, searchTerm) : [];
    const suggest: { [key: string]: boolean } = {};
    suggestResult.forEach((result) => {
      const foundItem = miniatures[parseInt(result.ref)];
      if (foundItem && result.matchData.metadata) {
        try {
          Object.values(result.matchData.metadata).forEach(metadataMatch => {
            Object.keys(metadataMatch).forEach(metadataFieldKey => {
              //@ts-ignore
              let fieldValue = foundItem[metadataFieldKey].replace(suggestTextRegex, "").trim();
              suggest[fieldValue] = true;
            });
          });
        }
        catch (e: any) {

        }
      }
    });
    setSearchSuggestion(Object.keys(suggest));

    setLoading(false)
  }, [filterState])

  function onChangeSearchText(value: string) {
    const updatedFilter = {
      ...filterState,
      text: value
    }
    setFilterState(updatedFilter);
  }

  function onChangeDateStart(start: string) {
    const updatedFilter = {
      ...filterState,
      dateStart: start
    }
    setFilterState(updatedFilter);
  }

  function onChangeDateEnd(end: string) {
    const updatedFilter = {
      ...filterState,
      dateEnd: end
    }
    setFilterState(updatedFilter);
  }

  function onChangeMonogram(value: string) {
    const updatedFilter = {
      ...filterState,
      monogram: value
    }
    setFilterState(updatedFilter);
  }

  function addCompareItem(item: MiniatureGraphQLItem) {
    if (Object.keys(compare || {}).length >= 3) return;
    const updatedCompare = {
      ...compare,
      [item.id!!]: item
    }
    setCompare(updatedCompare);
  }

  function removeCompareItem(item: MiniatureGraphQLItem) {
    const updatedCompare = {
      ...compare,
    }
    delete updatedCompare[item.id!!];
    setCompare(updatedCompare);
  }

  return (
    <Layout displayLogo={true} additionalClasses={['standard-page']} dark={false}>
      <section>
        <FilterComponent
          filterValue={filterState}
          productionDateOptions={dateOptions}
          monogramOptions={monogramOptions}
          onChangeSearchText={onChangeSearchText}
          onChangeDateStart={onChangeDateStart}
          onChangeDateEnd={onChangeDateEnd}
          onChangeMonogram={onChangeMonogram}
          searchSuggestion={searchSuggestion}
        />
        <NoResultsComponent searchText={filterState.text} resultsCount={filteredMiniatures.length} />
        <div className="loading">{loading == true && <Loading />}</div>
        <ResultsComponent
          miniatures={filteredMiniatures}
          addCompareItem={addCompareItem}
          removeCompareItem={removeCompareItem}
          compareActive={compare || {}}
        />
      </section>
      <CompareComponent compareValues={Object.values(compare || {})} removeCompareItem={removeCompareItem} />
    </Layout>
  )
}

