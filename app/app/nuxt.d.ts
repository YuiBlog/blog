import Vue from "vue";
import VueRouter from "vue-router";
import { Request } from "express";

import * as firebase from "firebase-admin";

declare module "vue/types/vue" {
  interface Vue {
    $firebase: typeof firebase;
  }
}
// https://nuxtjs.org/api/context
export declare class Context {
  app: Vue;
  isClient: boolean;
  isServer: boolean;
  isStatic: boolean;
  isDev: boolean;
  isHMR: boolean;
  router: VueRouter;
  store: any;
  env: any;
  params: any;
  query: any;
  req: Request;
  res: Response;
  redirect: Function;
  error: Function;
  nuxtState: any;
}

