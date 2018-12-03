import * as query from "shared/query";

declare module 'vue/types/vue' {
  interface Vue {
    $firebase: typeof query;
  }
}