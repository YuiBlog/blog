// f**k JavaScript
import { parse, stringify } from "qs";
import * as _ from "lodash";

import { Nullable } from "./types";

export function single<T>(snapshot: FirebaseFirestore.QuerySnapshot): Nullable<T> {
  const doc = snapshot.docs.shift();
  return doc ? doc.data() as T : null;
}

export function pick<T, U, V extends keyof T>(object: T, ...params: V[]): U {
  return _.pick(object, params) as U;
}

export function asTyped(params: any): any {
  return parse(stringify(params), {
    // https://github.com/ljharb/qs/issues/91#issuecomment-348481496
    decoder: (value) => {
      value = value.replace(/\+/g, ' ');

      if (/^(\d+|\d*\.\d+)$/.test(value)) {
        return parseFloat(value);
      }
      const keywords: any = {
        true: true,
        false: false,
        null: null,
        undefined: undefined,
      };
      if (value in keywords) {
        return keywords[value];
      }

      try {
        return decodeURIComponent(value);
      } catch {
        return value;
      }
    }
  });
}