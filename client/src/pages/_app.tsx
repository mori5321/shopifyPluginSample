import React from "react";
import App, { AppContext } from "next/app";
import Head from "next/head";
import { AppProvider } from "@shopify/polaris";
import { Provider } from "@shopify/app-bridge-react";
// import { authenticatedFetch } from "@shopify/app-bridge-utils";
import translations from "@shopify/polaris/locales/ja.json";
import "@shopify/polaris/dist/styles.css";
import { AppConfigV2 } from "@shopify/app-bridge/client";
import ClientRouter from "@/router/clientRouter";
// import ApolloClient from "apollo-boost";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
// import { ApolloProvider } from "@apollo/react-hooks";
// import { Redirect } from "@shopify/app-bridge/actions";

// const userLoggedInfetch = (app) => {
//   const fetchFunction = authenticatedFetch(app);
//
//   return async (uri, options) => {
//     const response = await fetchFunction(uri, options);
//
//     if (
//       response.headers.get("X-Shopify-API-Request-Failure-Reauthorize-Url") ===
//       "1"
//     ) {
//       const authUrlHeader = response.headers.get(
//         "X-Shopify-API-Request-Failure-Reauthorize-Url"
//       );
//
//       const redirect = Redirect.create(app);
//       redirect.dispatch(Redirect.Action.APP, authUrlHeader || `/auth`);
//       return null;
//     }
//   };
// };
// const app = Context;
// const client = new ApolloClient({
//   fetch: authenticatedFetch(),
//   fetchOptions: {
//     credentials: "include",
//   },
// // });
// class MyProvider extends React.Component {
//   // static contextType = Context;
//
//   render() {
//     // const app = this.context;
//     // 認証を自前で実装する?
//     // https://shopify.dev/docs/admin-api/getting-started#authentication
//     //
//     // こっちのやりかたでも動きそう
//     // https://qiita.com/hal_256/items/07626bb0621bc6c8eef8
//     // const client = new ApolloClient({
//     //   fetch: authenticatedFetch(app),
//     //   fetchOptions: {
//     //     credentials: "include",
//     //   },
//     // });
//
//     const client = new ApolloClient({
//       cache: new InMemoryCache(),
//       uri:
//         "https://noiab-tasty-test.myshopify.com/admin/api/2021-04/graphql.json",
//     });
//
//     return (
//       <ApolloProvider client={client}>{this.props.children}</ApolloProvider>
//     );
//   }
// }

// Auth Sample
//
// https://community.shopify.com/c/%E6%8A%80%E8%A1%93%E7%9A%84%E3%81%AAQ-A/apollo-client%E3%82%92%E6%B4%BB%E7%94%A8%E3%81%97%E3%81%9Fstorefront-api%E3%81%AE%E6%8E%A5%E7%B6%9A%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6/td-p/742934
//
// https://www.apollographql.com/docs/react/networking/authentication/

type PageProps = { host: string };
class MyApp extends App<PageProps> {
  render() {
    const { Component, pageProps } = this.props;

    const config: AppConfigV2 = {
      apiKey: API_KEY,
      host: pageProps.host,
      forceRedirect: true,
    };

    console.log("Config", config);

    return (
      <React.Fragment>
        <Head>
          <title>Sample</title>
          <meta charSet="utf-8" />
        </Head>
        <Provider config={config}>
          <ClientRouter />
          <AppProvider i18n={translations}>
            <Component {...pageProps} />
          </AppProvider>
        </Provider>
      </React.Fragment>
    );
  }
}

MyApp.getInitialProps = async (context: AppContext) => {
  return {
    pageProps: {
      host: context.ctx.query.host,
      shopOrigin: context.ctx.query.shop,
    },
  };
};
// これだと動かない
// export const getServerSideProps: GetServerSideProps = async (context) => {
//   console.log("Ctx", context);
//   return {
//     props: {
//       host: context.query.host ?? "",
//     },
//   };
// };

export default MyApp;
