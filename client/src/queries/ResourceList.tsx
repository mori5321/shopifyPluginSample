import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import Shopify from "@shopify/shopify-api";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
// export const GET_PRODUCTS_BY_ID = gql`
//   query getProducts($ids: [ID!]!) {
//     nodes(ids: $ids) {
//       ... on Product {
//         title
//         handle
//         descriptionHtml
//         id
//         images(first: 1) {
//           edges {
//             node {
//               originalSrc
//               altText
//             }
//           }
//         }
//         variants(first: 1) {
//           edges {
//             node {
//               price
//               id
//             }
//           }
//         }
//       }
//     }
//   }
// `;

// const client = new ApolloClient({
//   cache: new InMemoryCache(),
//   uri: "https://noiab-tasty-test.myshopify.com/admin/api/2021-04/graphql.json",
// });
//
// const client = new Shopify.Clients.Graphql("", "");

export const GET_PRODUCTS = gql`
  query GET_PRODUCTS {
    products(first: 10) {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`;

// // 型は本来自動生成できる。
// // type Product = {
// //   id: string;
// //   title: string;
// // };
// //
// // type GetProductsData = {
// //   products: Product[];
// // };
//
// export const ResourceListWithProducts = () => {
//   const { data, loading, refetch } = useQuery(GET_PRODUCTS, {
//     client: client,
//   });
//
//   if (loading || data?.products) {
//     return <div>Loading...</div>;
//   }
//
//   const products = data?.products.edges.map((productEdge) => (
//     <div key={productEdge.node.id}>
//       <p>id: {productEdge.node.id}</p>
//       <p>title:{productEdge.node.title}</p>
//     </div>
//   ));
//   return (
//     <div>
//       {products}
//       <button
//         onClick={() => {
//           refetch();
//         }}
//       >
//         refetch
//       </button>
//     </div>
//   );
// };
