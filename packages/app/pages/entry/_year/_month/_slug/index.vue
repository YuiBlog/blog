<template lang="pug">
  .pb-10
    template(v-if="entry")
      entry-header(:entry="entry")

      markdown-renderer(:markdown="body")

      hr.border.my-4

      .flex
        .flex-1.pr-4.truncate
          .truncate.previous(v-if="previous != null")
            nuxt-link(:to="`/entry/${previous.url}`") {{previous.title}}
        .flex-1.pl-6.truncate
          .truncate.next(v-if="next != null")
            nuxt-link(:to="`/entry/${next.url}`") {{next.title}}
    template(v-else)
      error(title="Entry Not Found" description="お探しのエントリーは見つかりませんでした。")
</template>

<script lang="ts">
import { Entry, EntryMinified, Settings } from "@yuiblog/types";
import MarkdownRenderer from "@yuiblog/markdown";
import axios from "axios";
import dayjs from "dayjs";
import { Context } from "nuxt";
import { Component, Vue } from "nuxt-property-decorator";
import { Getter } from "vuex-class";

import EntryHeader from "components/EntryHeader.vue";
import Error from "components/presentationals/Error.vue";

@Component({
  components: {
    EntryHeader,
    Error,
    MarkdownRenderer
  }
})
export default class extends Vue {
  public entry!: Entry;
  public next!: Entry;
  public previous!: Entry;

  @Getter("title")
  public title!: (str: string) => string;

  public head(): any {
    return {
      title: this.title(this.entry ? this.entry.title : "")
    };
  }

  public async asyncData({ app, params }: Context): Promise<any> {
    const { year, month, slug } = params;
    return await axios.get(`${process.env.FIREBASE_HOSTING_URL}/api/entries/${year}/${month}/${slug}`).then(w => w.data);
  }

  public get body(): string {
    return this.entry.body.replace(/\\r/g, "\n");
  }

  public asEntryUrl(entry: EntryMinified): string {
    return `/entry/${entry.url}`;
  }
}
</script>

<style lang="scss" scoped>
.next::before {
  content: "\00BB";
  padding-left: 0.5rem;
  float: right;
}

.previous::before {
  content: "\00AB";
  padding-right: 0.5rem;
}
</style>
