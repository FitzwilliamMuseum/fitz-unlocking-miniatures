import * as React from "react"
import {Link, graphql, PageProps} from 'gatsby'
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from '../components/layout'
import Logo from '../assets/svg/logo.svg'
import { isExternalUrl } from "../util"
import FeatureBox, { FeatureBoxItem, FeatureBoxProps } from "../components/featureBox"
import Supporter, { SupporterProps } from "../components/supporter"
import { FooterLogo, FooterProps, SocialMedia } from "../components/footer"


const StandardTemplate = ({data}: PageProps<Queries.StandardTemplateQuery>) => {

  const footerData: FooterProps = {
    content: {
      quickLinks: data.site?.siteMetadata?.quickLinks ? data.site?.siteMetadata?.quickLinks as Array<any> : [],
      socialMedia: data.site?.siteMetadata?.socialMedia ? data.site?.siteMetadata?.socialMedia as Array<SocialMedia> : [],
      contact: data.site?.siteMetadata?.contact ? data.site?.siteMetadata?.contact as Array<any> : [],
      footerLogos: data.site?.siteMetadata?.footerLogos ? data.site?.siteMetadata?.footerLogos as Array<FooterLogo> : []
    }
  }
   
    return (
      <Layout displayLogo={false} menu={data.site?.siteMetadata?.mainMenu} footer={footerData}>
        {/* <Head title={post.frontmatter.title} description={post.excerpt} /> */}
        <article>
          <div className={`page-content`}>
          { data.markdownRemark?.frontmatter?.sections && data.markdownRemark?.frontmatter?.sections.map(section => {
              if (section?.type == 'banner') {
                const image = section.image_src?.childImageSharp?.gatsbyImageData
                return (
                  <div className="section--main background--black row">
                    <div className="col-6 col--sm-12">
                    { image && <GatsbyImage image={image} alt={section.image_alt ? section.image_alt : 'Placeholder'} /> }
                    </div>
                    <div className="col-6 col--sm-12">
                      { section.logo && (<div className="logo"><Logo/></div>) }
                      { section.title && (<h2>{section.title}</h2>)}
                      { section.content && (<div className="section--content"><div dangerouslySetInnerHTML={{__html: section.content}} /></div>)}
                    </div>
                  </div>
                )
              } else if (section?.type == 'feature_box') {
                if (section?.fb_type == 'double') {
                  let count = -1;
                  return (<div className="section--fb double">
                      {section?.items && section?.items.map(item => {
                        count++
                        const image = item.image_src?.childImageSharp?.gatsbyImageData
                        const linkUri = item.link && item?.link.url ? item.link.url : ''
                        const linkExternal = isExternalUrl(linkUri)
                        const linkInternal = !linkExternal && linkUri
                        const fbItem = item as FeatureBoxItem
                        if (count % 2 == 0) {
                          return (<FeatureBox item={fbItem} direction="left"/>)
                        } else {
                          return (<FeatureBox item={fbItem} direction="right"/>)
                        }
                      })
                    }
                  </div>)
                } else {
                  return(
                  <div className="section--fb single">
                    {
                      section?.items && section?.items.map(item => {
                        const image = item.image_src?.childImageSharp?.gatsbyImageData
                        return (<div className="section--fb-item"> 
                          <div className="section--fb-item--left">
                            <div className="fb--content">
                              <h2>{item.title}</h2>
                              <div className="text" dangerouslySetInnerHTML={ {__html: item.content }}></div>
                            </div>
                          </div>
                          <div className="section--fb-item--right">
                            <div className="fb--image">
                              { image && <GatsbyImage image={image} alt={item.image_alt ? item.image_alt : 'Placeholder'} /> }
                            </div>
                          </div>
                        </div>)
                      })
                    }
                  </div>)
                }
              } else if (section?.type == 'supporters') {
                const supporters: Array<any> = [];
                section?.items && section?.items.map((item: any) => {
                  const supporterItem = item as SupporterProps
                  supporters.push(<Supporter link={item?.link} image_src={item?.image_src}/>)
                })
                return (
                  <div className="section--supporters row">
                    {section?.title && <h3>{section?.title}</h3>}
                    <div className="items">
                      {supporters}
                    </div>
                  </div>
                  )
              }
            })
            
          }
          </div>
        </article>
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
    query StandardTemplate($slug: String) {
        markdownRemark(frontmatter: {slug: {eq: $slug}}) {
        id
        html
        frontmatter {
          sections {
            image_src {
              childImageSharp {
                gatsbyImageData(layout: FULL_WIDTH)
              }
            }
            image_alt
            title
            content
            fb_type
            logo
            type
            link {
              title
              url
            }
            items {
              title
              content
              link {
                url
                title
              }
              image_alt
              image_src {
                childImageSharp {
                  gatsbyImageData(layout: FULL_WIDTH)
                }
              }
            }
          }
        }
      }
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

export default StandardTemplate

