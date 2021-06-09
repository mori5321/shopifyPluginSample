import React from "react";
import App, { AppContext } from "next/app";
import Head from "next/head";
import { AppProvider } from "@shopify/polaris";
import { Provider } from "@shopify/app-bridge-react";
import translations from "@shopify/polaris/locales/ja.json";
import "@shopify/polaris/dist/styles.css";
import { AppConfigV2 } from "@shopify/app-bridge/client";
import { GetServerSideProps } from "next";
// import { GetServerSideProps } from "next";

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
