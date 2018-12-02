import Vue from "vue";
import VueRouter from "vue-router";
import { Request } from "express";

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

