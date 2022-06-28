import React, { useState, useEffect } from "react"
import {Link, graphql, PageProps} from 'gatsby'
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from '../components/layout'
import Logo from '../assets/svg/logo.svg'
import { isExternalUrl } from "../util"
import FeatureBox, { FeatureBoxItem, FeatureBoxProps } from "../components/featureBox"
import Supporter, { SupporterProps } from "../components/supporter"
import { FooterLogo, FooterProps, SocialMedia } from "../components/footer"
import MiniatureItem, { MiniatureItemInterface } from "../components/miniatureItem"
import { buildDirectusRequestUrl, createSearchIndex } from "../util/search"
import { Index } from "lunr"
import Loading from '../images/loading-spin.svg'


interface MiniatureItemWithSearchResultInterface {
  item: MiniatureItemInterface
  result: Index.Result | null
}

const CollectionsPage = ({data}: PageProps<Queries.SiteDataQuery>) => {

  const footerData: FooterProps = {
    content: {
      quickLinks: data.site?.siteMetadata?.quickLinks ? data.site?.siteMetadata?.quickLinks as Array<any> : [],
      socialMedia: data.site?.siteMetadata?.socialMedia ? data.site?.siteMetadata?.socialMedia as Array<SocialMedia> : [],
      contact: data.site?.siteMetadata?.contact ? data.site?.siteMetadata?.contact as Array<any> : [],
      footerLogos: data.site?.siteMetadata?.footerLogos ? data.site?.siteMetadata?.footerLogos as Array<FooterLogo> : []
    }
  }
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
          filtered.push({item, result: null})
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
          filtered.push({item: i, result})
        }
      })
      setFilteredMiniatures(filtered)
      setLoading(0)
    }
   
    
    return (
      <Layout displayLogo={false} menu={data.site?.siteMetadata?.mainMenu} footer={footerData} additionalClasses={['standard-page']}>
        {/* <Head title={post.frontmatter.title} description={post.excerpt} /> */}
        <section>
          <div className={`miniature-items-search`}>
            <div className="search-label">Search for artist, sitter or pigment</div>
            <input name="searchKeywords" onChange={handleSearchKeywords} placeholder="Search"/>
          </div>
          {(searchText && filteredMiniatures.length == 0) && (<div className={`no-search-results`}>
            <span className="no-search-results--text">Searching for <span className="search-text">{searchText}</span>.    No results yet.   Please keep typing or search another term.</span>
          </div>)}
          <div className="loading">
            {loading !=0 && <Loading/>}
          </div>
          <div className={`miniature-items`}>
            {Array.isArray(filteredMiniatures) && filteredMiniatures.map(item => {
              return (<MiniatureItem item={item.item} result={item.result}/>)
            })}
          </div>
        </section>
      </Layout>
    )
  }

interface PageQueryData {
    site: {
      siteMetadata: {
        title: string
      }
    }
    markdownRemark: {
      id?: string
      excerpt?: string
      html: string
      frontmatter: {
        title: string
        date: string
      }
    }
}


export const query = graphql`
    query SiteData {
      site {
        siteMetadata {
            title
            mainMenu {
              link
              title
            }
            quickLinks {
              link
              title
            }
            contact {
              line
            }
            footerLogos {
              image_src
              image_alt
            }
            socialMedia {
              type
              url
              title
            }
        }
    }
  }
`


export default CollectionsPage

