import React, { useState, useEffect } from "react"
import Layout from '../components/layout'
import config from "../../gatsby-config";

export default function CollectionsComparePage() {

  const params = new URLSearchParams(document.location.search);
  const queryItems = params.get("items");

  const [items, setItems] = useState<Array<MiniatureItemInterface>>([]);

  useEffect(() => {
    const url = config.siteMetadata.api.url + `items/miniatures/?filter=${JSON.stringify({
      "id": {
        "_in": queryItems?.split(",")
      }
    })}`
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setItems(data.data);
      });
  }, [])

  return (
    <Layout displayLogo={false}>
      <section className="collections-compare--section">
        <table>
          <thead>
            <th ></th>
            {items?.map(item => (
              <th>{item.title}</th>
            ))}
          </thead>
          <tbody>
            <tr>
              <td>ID</td>
              {Object.values(items || []).map(item => (
                <td>{item.id}</td>
              ))}
            </tr>
            <tr>
              <td>Artist</td>
              {Object.values(items || []).map(item => (
                <td>{item.artist_text}</td>
              ))}
            </tr>
            <tr>
              <td>Sitter</td>
              {Object.values(items || []).map(item => (
                <td>{item.sitter_text}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </section>

    </Layout>
  )
}

