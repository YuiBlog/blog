// f**k JavaScript
import { parse, stringify } from "qs";

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