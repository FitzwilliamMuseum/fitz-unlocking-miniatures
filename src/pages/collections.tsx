import React, { useState, useEffect } from "react"
import Layout from '../components/layout'
import MiniatureItem from "../components/miniatureItem"
import Loading from '../images/loading-spin.svg'
import { Link } from 'gatsby'
import ViewerIcon from "../assets/svg/viewer-icon.svg"
import config from "../../gatsby-config";
import CompareRemoveIcon from "../assets/svg/remove-icon.svg"
import lunr from "lunr"

type Compare = {
  [id: string]: MiniatureItemInterface;
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
  compareValues: MiniatureItemInterface[]
  removeCompareItem: (item: MiniatureItemInterface) => void
}

function CompareComponent({ compareValues, removeCompareItem }: CompareComponentProps) {
  return <>{(compareValues.length > 0) && <div className="miniature-collection--compare">
    <h3>Compare objects</h3>
    <p>Select up to 3 objects using the 'plus compare' button on other objects</p>
    {compareValues.map(compareItem => (
      <div className="miniature-items">
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
}

function FilterComponent(props: FilterComponentProps) {
  const {
    filterValue,
    productionDateOptions,
    monogramOptions,
    onChangeSearchText,
    onChangeDateStart,
    onChangeDateEnd,
    onChangeMonogram
  } = props;
  const productionDateOptionsHTML = productionDateOptions.map((item, index) => <option key={item + index} value={item}>{item}</option>)
  return <div className="miniature-items-search">
    <input name="searchKeywords" onChange={(event) => onChangeSearchText(event.target.value)} placeholder="Search for artist, sitter or pigment" />
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
}

type ResultsComponentProps = {
  miniatures: MiniatureItemWithSearchResultInterface[]
  addCompareItem: (item: MiniatureItemInterface) => void
  removeCompareItem: (item: MiniatureItemInterface) => void
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
    miniatures: { [id: number]: MiniatureItemInterface }
    serialisedSearchIndex: lunr.Index
  }
}

const MONOGRAM_OPT_ANY = "Monogram";
const MONOGRAM_OPT_YES = "Yes";
const MONOGRAM_OPT_NO = "No";

export default function CollectionsPage({ pageContext: { miniatures, serialisedSearchIndex } }: CollectionPageProps) {

  const [loading, setLoading] = useState(true)
  const [filteredMiniatures, setFilteredMiniatures] = useState<MiniatureItemWithSearchResultInterface[]>([])
  const [compare, setCompare] = useState<Compare>({})

  const dateOptions = [
    "1500", "1510", "1520", "1530", "1540", "1550", "1560", "1570", "1580", "1590",
    "1600", "1610", "1620", "1630", "1640", "1650", "1660", "1670", "1680", "1690",
    "1700"
  ];
  const monogramOptions = [MONOGRAM_OPT_ANY, MONOGRAM_OPT_YES, MONOGRAM_OPT_NO];

  let searchIndex = lunr.Index.load(serialisedSearchIndex);

  const [filterState, setFilterState] = useState<FilterState>({
    text: "",
    dateStart: dateOptions[0],
    dateEnd: dateOptions[dateOptions.length - 1],
    monogram: MONOGRAM_OPT_ANY
  });

  useEffect(() => {
    setLoading(true)
    const results = searchIndex.search(filterState.text)
    const filtered: MiniatureItemWithSearchResultInterface[] = []
    results?.forEach((result) => {
      const foundItem = miniatures[parseInt(result.ref)]
      if (foundItem) {

        let foundItemFilterMatch = true;
        if (typeof foundItem.production_date == "string") {
          const itemDate = foundItem.production_date.slice(0, 4);
          //filter production start date
          if (itemDate < filterState.dateStart) {
            foundItemFilterMatch = false;
          }
          //filter production end date
          if (itemDate > filterState.dateEnd) {
            foundItemFilterMatch = false;
          }
        }
        if (filterState.monogram == MONOGRAM_OPT_YES && !foundItem.monogram) {
          foundItemFilterMatch = false;
        }
        if (filterState.monogram == MONOGRAM_OPT_NO && !!foundItem.monogram) {
          foundItemFilterMatch = false;
        }
        if (foundItemFilterMatch) {
          filtered.push({ item: foundItem, result })
        }
      }
    })
    setFilteredMiniatures(filtered)
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

  function addCompareItem(item: MiniatureItemInterface) {
    if (Object.keys(compare || {}).length >= 3) return;
    const updatedCompare = {
      ...compare,
      [item.id!!]: item
    }
    setCompare(updatedCompare);
  }

  function removeCompareItem(item: MiniatureItemInterface) {
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

