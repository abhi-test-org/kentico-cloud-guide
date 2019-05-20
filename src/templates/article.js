import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"

const Article = ({ data }) => {
  const item = data.kenticoCloudItemArticle.elements

  return (
    <Layout>
      <h1>{item.title.value}</h1>
      <div dangerouslySetInnerHTML={{ __html: item.body_copy.value }} />
    </Layout>
  )
}

export default Article

export const query = graphql`
  query articleQuery($slug: String!) {
    kenticoCloudItemArticle(fields: { slug: { eq: $slug } }) {
      fields {
        slug
      }
      elements {
        body_copy {
          value
        }
        title {
          value
        }
      }
    }
  }
`
