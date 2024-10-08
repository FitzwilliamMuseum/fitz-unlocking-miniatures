import * as React from "react"
import { graphql, PageProps } from 'gatsby'
import { GatsbyImage, StaticImage } from "gatsby-plugin-image"
import { Link } from 'gatsby'
import Layout from '../components/layout'
import FeatureBox, { FeatureBoxItem } from "../components/featureBox"
import Supporter from "../components/supporter"

const StandardTemplate = ({ data }: PageProps<Queries.StandardTemplateQuery>) => {

  return (
    <Layout
      displayLogo={data.markdownRemark?.frontmatter?.displayLogo !== false}
      dark={data.markdownRemark?.frontmatter?.dark !== false}>
      <article>
        <div className={`page-content`}>
          {data.markdownRemark?.frontmatter?.displayTitle !== false && (
            <div className="page-title"><h1>{data.markdownRemark?.frontmatter?.title}</h1></div>
          )}
          {data.markdownRemark?.frontmatter?.sections && data.markdownRemark?.frontmatter?.sections.map((section, index) => {
            if (section?.type == 'banner') {
              const image = section.image_src?.childImageSharp?.gatsbyImageData
              return (
                <div key={section.link?.url || '' + index} className="section--main background--black row">
                  <div className="col-6 col--sm-12">
                    {image && <GatsbyImage image={image} alt={section.image_alt ? section.image_alt : 'Placeholder'} />}
                  </div>
                  <div className="col-6 col--sm-12">
                    {section.logo && (<StaticImage className="logo" src="../assets/svg/logo.png" alt="logo" />)}
                    {section.title && (<h2>{section.title}</h2>)}
                    {section.content && (<div className="section--content"><div dangerouslySetInnerHTML={{ __html: section.content }} /></div>)}
                  </div>
                </div>
              )
            } else if (section?.type == 'feature_box') {
              if (section?.fb_type == 'double') {
                let count = -1;
                return (<div key={section.link?.url || '' + index} className="section--fb double">
                  {section?.items && section?.items.map((item, index) => {
                    count++
                    const fbItem = item as FeatureBoxItem
                    if (count % 2 == 0) {
                      return (<FeatureBox key={fbItem.title || '' + index} item={fbItem} direction="left" />)
                    } else {
                      return (<FeatureBox key={fbItem.title || '' + index} item={fbItem} direction="right" />)
                    }
                  })
                  }
                </div>)
              } else {
                return (
                  <div key={section.link?.url || '' + index} className="section--fb single">
                    {
                      section?.items && section?.items.map((item, index) => {
                        const image = item?.image_src?.childImageSharp?.gatsbyImageData
                        return (
                          <Link key={item?.title || '' + index} className="section--fb-item" to={item?.link?.url || ''}>
                            <div className="section--fb-item--left">
                              <div className="fb--content">
                                <h2>{item?.title}</h2>
                                <div className="text" dangerouslySetInnerHTML={{ __html: item?.content || '' }}></div>
                              </div>
                            </div>
                            <div className="section--fb-item--right">
                              <div className="fb--image">
                                {image && <GatsbyImage image={image} alt={item.image_alt ? item.image_alt : 'Placeholder'} />}
                              </div>
                            </div>
                          </Link>)
                      })
                    }
                  </div>)
              }
            } else if (section?.type == 'supporters') {
              const supporters: Array<any> = [];
              section?.items && section?.items.map((item: any, index: number) => {
                supporters.push(<Supporter key={index} link={item?.link} image_src={item?.image_src} />)
              })
              return (
                <div key={section.link?.url || '' + index} className="section--supporters row">
                  {section?.title && <h3>{section?.title}</h3>}
                  <div className="items">
                    {supporters}
                  </div>
                </div>
              )
            }
            else if (section?.type == 'paragraph') {
              return (
                <div className="section--paragraph">
                  {section?.title && <h3>{section?.title}</h3>}
                  <p>{section.content}</p>
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

export const query = graphql`
query StandardTemplate($slug: String) {
	markdownRemark(frontmatter: { slug: { eq: $slug } }) {
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
            publicURL
					}
				}
			}
      displayLogo
      displayTitle
      title
      dark
		}
	}
}
`

export default StandardTemplate
