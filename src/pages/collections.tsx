import React, { useState, useEffect } from "react"
import Layout from '../components/layout'
import MiniatureItem from "../components/miniatureItem"
import { buildDirectusRequestUrl, createSearchIndex } from "../util/search"
import { Index } from "lunr"
import Loading from '../images/loading-spin.svg'
import { Link } from 'gatsby'
import ViewerIcon from "../assets/svg/viewer-icon.svg"
import config from "../../gatsby-config";

type Compare = {
  [id: string]: MiniatureItemInterface;
}

export default function CollectionsPage() {

  const [loading, setLoading] = useState(1)
  const [searchText, setSearchText] = useState('')
  const [miniatures, setMiniatures] = useState<Map<string, MiniatureItemInterface>>()
  const [searchIndex, setSearchIndex] = useState<Index>()
  const [filteredMiniatures, setFilteredMiniatures] = useState<Array<MiniatureItemWithSearchResultInterface>>([])
  const [compare, setCompare] = useState<Compare>()

  useEffect(() => {
    // get data from GitHub api
    fetch(buildDirectusRequestUrl())
      .then(response => response.json()) // parse JSON from request
      .then(resultData => {
        const m = new Map<string, MiniatureItemInterface>()
        const filtered: Array<MiniatureItemWithSearchResultInterface> = []
        resultData.data.forEach((item: any) => {
          m.set(String(item.id), item)
          filtered.push({ item, result: null })
        })
        setMiniatures(m)
        setFilteredMiniatures(filtered)
        const idx = createSearchIndex(resultData.data)
        setSearchIndex(idx)
        setLoading(0)
      })
  }, [])

  function handleSearchKeywords(event: React.ChangeEvent<HTMLInputElement>) {
    setLoading(1)
    const searchText = event.target.value
    setSearchText(searchText)
    const results = searchIndex?.search(searchText)
    const filtered: Array<MiniatureItemWithSearchResultInterface> = []
    results?.forEach((result) => {
      const i = miniatures?.get(result.ref)
      if (i) {
        filtered.push({ item: i, result })
      }
    })
    setFilteredMiniatures(filtered)
    setLoading(0)
  }

  function onClickCompareItem(item: MiniatureItemInterface) {
    const updatedCompare = {
      ...compare,
    }
    if (updatedCompare[item.id!!]) {
      delete updatedCompare[item.id!!];
    }
    else {
      updatedCompare[item.id!!] = item;
    }
    setCompare(updatedCompare)
  }

  return (
    <Layout displayLogo={true} additionalClasses={['standard-page']}>
      {/* <Head title={post.frontmatter.title} description={post.excerpt} /> */}
      <section>
        <div className={`miniature-items-search`}>
          <div className="search-label">Search for artist, sitter or pigment</div>
          <input name="searchKeywords" onChange={handleSearchKeywords} placeholder="Search" />
        </div>
        {(searchText && filteredMiniatures.length == 0) && (<div className={`no-search-results`}>
          <span className="no-search-results--text">Searching for <span className="search-text">{searchText}</span>.    No results yet.   Please keep typing or search another term.</span>
        </div>)}
        <div className="loading">
          {loading != 0 && <Loading />}
        </div>
        <div className={`miniature-items`}>
          {Array.isArray(filteredMiniatures) && filteredMiniatures.map(item => (
            <MiniatureItem
              item={item.item}
              result={item.result}
              onClickCompare={() => onClickCompareItem(item.item)}
              compareActive={!!compare?.[item.item.id!!]}
            />
          ))}
        </div>
      </section>
      {(Object.keys(compare || {}).length > 0) && <div className="miniature-collection--compare">
        {Object.values(compare || {}).map(compareItem => (
          <div>{compareItem.title}</div>
        ))}
        <div className="miniature-items">
          <Link
            className="miniature-item__button"
            to={`/collections-compare?items=${Object.keys(compare || {}).join(",")}`}>
            Compare
          </Link>
          <a
            className="miniature-item__button"
            href={`/view/?${Object.values(compare || {}).map(item => `manifestId[]=${config.siteMetadata.iiif.url + item.accession_number}/manifest.json`).join("&")}`}>
            <span className="icon"><ViewerIcon /></span><span>View all</span>
          </a>
        </div>
      </div>}
    </Layout>
  )
}

