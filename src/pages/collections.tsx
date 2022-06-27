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


const CollectionsPage = ({data}: PageProps<Queries.SiteDataQuery>) => {

  const footerData: FooterProps = {
    content: {
      quickLinks: data.site?.siteMetadata?.quickLinks ? data.site?.siteMetadata?.quickLinks as Array<any> : [],
      socialMedia: data.site?.siteMetadata?.socialMedia ? data.site?.siteMetadata?.socialMedia as Array<SocialMedia> : [],
      contact: data.site?.siteMetadata?.contact ? data.site?.siteMetadata?.contact as Array<any> : [],
      footerLogos: data.site?.siteMetadata?.footerLogos ? data.site?.siteMetadata?.footerLogos as Array<FooterLogo> : []
    }
  }
  const [miniatures, setMiniatures] = useState<Array<MiniatureItemInterface>>([])
  const [filteredMiniatures, setFilteredMiniatures] = useState<Array<MiniatureItemInterface>>([])
  useEffect(() => {
    // get data from GitHub api
    fetch(`https://rlq782oa.directus.app/items/miniatures?fields[]=title&fields[]=artist_text&fields[]=sitter_text&fields[]=image_normal_light&fields[]=id`)
      .then(response => response.json()) // parse JSON from request
      .then(resultData => {
        setMiniatures(resultData.data)
        setFilteredMiniatures(resultData.data)
      })
  }, [])

    function handleSearchKeywords(event: React.ChangeEvent<HTMLInputElement>) {
      const searchText = event.target.value
      // Find any matching miniatures via the text in their fields
      const filtered = miniatures.filter(item => {
        return Object.entries(item).some((value, key) => {
          const v = JSON.stringify(Array.isArray(value) && value[1] ? value[1] : '')
          return v.toLowerCase().includes(searchText.toLowerCase())
        })
      })
      setFilteredMiniatures(filtered)
    }
   
    
    return (
      <Layout displayLogo={false} menu={data.site?.siteMetadata?.mainMenu} footer={footerData} additionalClasses={['standard-page']}>
        {/* <Head title={post.frontmatter.title} description={post.excerpt} /> */}
        <section>
          <div className={`miniature-items-search`}>
            <div className="search-label">Search for an item</div>
            <input name="searchKeywords" onChange={handleSearchKeywords} placeholder="Search"/>
          </div>
          <div className={`miniature-items`}>
            {Array.isArray(filteredMiniatures) && filteredMiniatures.map(item => {
              return (<MiniatureItem item={item}/>)
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

