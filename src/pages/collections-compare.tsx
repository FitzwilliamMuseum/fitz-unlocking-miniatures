import React, { useState, useEffect } from "react"
import Layout from '../components/layout';
import config from "../../gatsby-config";
import { Link } from 'gatsby';
import { urlSafeString } from '../util';

const isBrowser = typeof window !== "undefined"

export default function CollectionsComparePage() {

  let queryItems = "";
  if (isBrowser) {
    const params = new URLSearchParams(document.location.search);
    queryItems = params.get("items") || "";
  }

  const [items, setItems] = useState<Array<MiniatureItemInterface>>([]);

  const fields = [
    {
      field: "accession_number",
      lable: "Accession number",
      type: "string"
    },
    {
      field: "production_date_text",
      lable: "Production date",
      type: "string"
    },
    {
      field: "artist_text",
      lable: "Artist",
      type: "string"
    },
    {
      field: "sitter_text",
      lable: "Sitter",
      type: "string"
    },
    {
      field: "monogram",
      lable: "Monogram",
      type: "boolean"
    },
    {
      field: "dimensions_unframed_height",
      lable: "Dimensions height mm",
      type: "string"
    },
    {
      field: "dimensions_unframed_width",
      lable: "Dimensions width mm",
      type: "string"
    },
    {
      field: "pigments_background",
      lable: "Pigments background",
      type: "string"
    },
    {
      field: "pigments_costume",
      lable: "Pigments costume",
      type: "string"
    },
    {
      field: "pigments_jewellery",
      lable: "Pigments jewellery",
      type: "string"
    },
    {
      field: "pigments_flesh_tones_and_lips",
      lable: "Pigments flesh tones and lips",
      type: "string"
    },
    {
      field: "pigments_hair_and_beard",
      lable: "Pigments hair and beard",
      type: "string"
    },
    {
      field: "materials_supports",
      lable: "Materials supports",
      type: "string"
    },
    {
      field: "analytical_techniques_used",
      lable: "Analytical techniques used",
      type: "list"
    },
    {
      field: "image_normal_light",
      lable: "Image Normal light",
      type: "boolean"
    },
    {
      field: "image_raking_light",
      lable: "Image Raking light",
      type: "boolean"
    },
    {
      field: "image_infrared",
      lable: "Image Infrared",
      type: "boolean"
    },
    {
      field: "image_uv",
      lable: "Image Ultraviolet",
      type: "boolean"
    },
    {
      field: "image_xray",
      lable: "Image X-Ray",
      type: "boolean"
    },
  ];

  useEffect(() => {
    const filterQuery = JSON.stringify({
      "accession_number": {
        "_in": queryItems?.split(",")
      }
    });
    // @ts-ignore
    const url = `${config.siteMetadata.api.url}items/miniatures/?filter=${filterQuery}`
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setItems(data.data);
      });
  }, [])

  function objectImageElement(miniature: MiniatureItemInterface) {
    // @ts-ignore
    const imageUrl = `${config.siteMetadata.api.url}/assets/${miniature.image_normal_light}?&height=200&quality=80`;
    const imageAlt = miniature.title || "";
    return <img src={imageUrl} alt={imageAlt} />
  }

  function objectLinkElement(miniature: MiniatureItemInterface) {
    // @ts-ignore
    const manifestUrl = config.siteMetadata.iiif.url + urlSafeString(miniature.accession_number) + '/manifest.json';
    // @ts-ignore
    const viewerUrl = `${config.siteMetadata.viewer.url}?manifestId[]=${manifestUrl}`;
    return <span>
      <Link to={`/object/${miniature.slug}`} >Information</Link>
      <a href={viewerUrl}>Viewer</a>
    </span>
  }

  return (
    <Layout displayLogo={false}>
      <section className="collections-compare--section">
        <div className="miniature-items">
          <Link className="miniature-item__button" to="/collections">Back</Link>
        </div>
        <table>
          <thead>
            <th ></th>
            {items?.map(item => (
              <th>{item.title}</th>
            ))}
          </thead>
          <tbody>
            <tr>
              <td></td>
              {Object.values(items || []).map(item => (<td>{objectImageElement(item)}</td>))}
            </tr>
            <tr>
              <td></td>
              {Object.values(items || []).map(item => (<td>{objectLinkElement(item)}</td>))}
            </tr>
            {fields.map(fieldItem => (
              <tr>
                <td>{fieldItem.lable}</td>
                {Object.values(items || []).map(item => (
                  <td>
                    {
                      // @ts-ignore
                      fieldItem.type == "boolean" && ((!!item[fieldItem.field]) ? 'Yes' : 'No')
                    }
                    {
                      // @ts-ignore
                      fieldItem.type == "string" && item[fieldItem.field]
                    }
                    {
                      // @ts-ignore
                      fieldItem.type == "list" && item[fieldItem.field].join(', ')
                    }
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </Layout>
  )
}
