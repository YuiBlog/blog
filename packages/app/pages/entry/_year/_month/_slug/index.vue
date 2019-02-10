<template lang="pug">
  .pb-10
    template(v-if="entry")
      entry-header(:entry="entry")

      template(v-if="isProtectedByPassphrase")
        // verify passphrase
        .text-center.py-2
          h3 合言葉を入力してください

          template(v-if="isVerifyFailed")
            p
              small 認証に失敗しました。合言葉が間違えています。

          input.mt-4(v-model.trim="passphrase")
          button.px-3.py-2.my-1.bg-blue.text-white(@click.prevent="onClick")
            | 送信する


      template(v-else)
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
  public passphrase: string = "";
  public isVerifyFailed: boolean = false;

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
    return this.isProtectedByPassphrase ? "" : this.entry.body.replace(/\\r/g, "\n");
  }

  public get isProtectedByPassphrase(): boolean {
    return this.entry.has_passphrase && !this.entry.body;
  }

  public asEntryUrl(entry: EntryMinified): string {
    return `/entry/${entry.url}`;
  }

  public async onClick(): Promise<void> {
    const { year, month, slug } = this.$route.params;
    this.entry = await axios.post(`${process.env.FIREBASE_HOSTING_URL}/api/entries/${year}/${month}/${slug}`, { passphrase: this.passphrase }).then(w => w.data);
    this.isVerifyFailed = !this.entry.body;
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

input {
  @apply appearance-none;
  // @apply block;
  // @apply w-full;
  @apply text-grey-darkest;
  @apply border border-grey;
  @apply py-2 px-1;
  @apply leading-tight;

  &:focus {
    @apply outline-none;
    @apply border-grey-darker;
  }
}

button {
  @apply leading-tight;
  @apply border border-blue;
}
</style>
