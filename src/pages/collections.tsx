import React, { useState, useEffect } from "react"
import Layout from '../components/layout'
import MiniatureItem, { MiniatureItemInterface } from "../components/miniatureItem"
import { buildDirectusRequestUrl, createSearchIndex } from "../util/search"
import { Index } from "lunr"
import Loading from '../images/loading-spin.svg'


interface MiniatureItemWithSearchResultInterface {
  item: MiniatureItemInterface
  result: Index.Result | null
}

export default function CollectionsPage() {

  const [loading, setLoading] = useState(1)
  const [searchText, setSearchText] = useState('')
  const [miniatures, setMiniatures] = useState<Map<string, MiniatureItemInterface>>()
  const [searchIndex, setSearchIndex] = useState<Index>()
  const [filteredMiniatures, setFilteredMiniatures] = useState<Array<MiniatureItemWithSearchResultInterface>>([])

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
          {Array.isArray(filteredMiniatures) && filteredMiniatures.map(item => {
            return (<MiniatureItem item={item.item} result={item.result} />)
          })}
        </div>
      </section>
    </Layout>
  )
}

