import dotenv from 'dotenv';
import Koa from 'koa';
import next from 'next';

import { verifyRequest } from '@shopify/koa-shopify-auth';
import createShopifyAuth from '@shopify/koa-shopify-auth/dist/src/auth';
import Shopify from '@shopify/shopify-api'
import {ApiVersion} from '@shopify/shopify-api';
import Router from 'koa-router';

dotenv.config();

Shopify.Context.initialize({
  API_KEY: process.env.SHOPIFY_API_KEY ?? '',
  API_SECRET_KEY: process.env.SHOPIFY_API_SECRET ?? '',
  SCOPES: process.env.SHOPIFY_API_SCOPES?.split(",") ?? [],
  HOST_NAME: process.env.SHOPIFY_APP_URL?.replace(/https:\/\//, "") ?? '',
  API_VERSION: ApiVersion.October20,
  IS_EMBEDDED_APP: true,
  SESSION_STORAGE: new Shopify.Session.MemorySessionStorage(),
})

const portFromEnv = process.env.PORT || '3000'
const port = parseInt(portFromEnv, 10);

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const ACTIVE_SHOPIFY_SHOPS: any = {}

app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();
  server.keys = [Shopify.Context.API_SECRET_KEY];

  server.use(
    createShopifyAuth({
      afterAuth(ctx) {
        const {shop, scope} = ctx.state.shopify;
        ACTIVE_SHOPIFY_SHOPS[shop] = scope;

        ctx.redirect(`/`)
      }
    })
  )
  
  const handleRequest = async (ctx: Koa.Context) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
    ctx.res.statusCode = 200;
  }

  router.get("/", async (ctx) => {
    const shop = ctx.query.shop as string; // FIX type assesion
    
    // if (shop === undefined) {
    //   ctx.redirect(`/`)
      // return;
    // }

    if (ACTIVE_SHOPIFY_SHOPS[shop] === undefined) {
      ctx.redirect(`/auth?shop=${shop}`);
    } else {
      await handleRequest(ctx);
    }
  })

  router.get("(/_next/static/.*)", handleRequest);
  router.get("/_next/webpack-hmr", handleRequest);
  router.get("(.*)", verifyRequest(), handleRequest);
  
  server.use(router.allowedMethods());
  server.use(router.routes());

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  })
})

