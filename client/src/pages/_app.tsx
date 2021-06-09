import React from "react";
import App, { AppContext } from "next/app";
import Head from "next/head";
import { AppProvider } from "@shopify/polaris";
import { Provider } from "@shopify/app-bridge-react";
import translations from "@shopify/polaris/locales/ja.json";
import "@shopify/polaris/dist/styles.css";
import { AppConfigV2 } from "@shopify/app-bridge/client";
// import { GetServerSideProps } from "next";

class MyApp extends App<{ shopOrigin: string; host: string }> {
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
//
// MyApp.getServerSideProps = async ({ ctx }) => {
//   return {
//     shopOrigin: ctx.query.shop,
//   };
// };
//
// export const getServerSideProps: GetServerSideProps = async (context) => {
//   console.log("Ctx", context);
//   return {
//     props: {
//       shopOrigin: context.query.shop ?? "",
//     },
//   };
// };
//
// export const getInitialProps: GetInitialProps

export default MyApp;
