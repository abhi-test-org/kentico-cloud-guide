/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require(`path`);

exports.onCreateNode = ({ node, actions: { createNodeField } }) => {
  if (node.internal.type === `KenticoCloudItemArticle`) {
    createNodeField({
      node,
      name: `slug`,
      value: node.elements.url_pattern.value,
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    graphql(`
      {
        allKenticoCloudItemArticle {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `).then(result => {
      result.data.allKenticoCloudItemArticle.edges.forEach(({ node }) => {
        console.log(node.fields.slug)
        createPage({
          path: node.fields.slug,
          component: path.resolve(`src/templates/article.js`),
          context: {
            slug: node.fields.slug,
          },
        })
      })
      resolve()
    })
  })
}
