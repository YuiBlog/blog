<template lang="pug">
  .container-.p-4
    h2.mb-2
      i.fas.fa-cog.fa-fw.mr-2
      | ブログ設定

    tab-horizontal
      tab-pane(name="基本設定")
        row.py-4.mt-4(title="ブログ URL")
          | {{url}}
        row.py-4(title="ブログ名")
          input.py-2.px-1.w-full(v-model.trim="$v.title.$model" :class="{error: $v.title.$error}")
        row.py-4(title="ブログ説明")
            input.py-2.px-1.w-full(v-model.trim="$v.description.$model" :class="{error: $v.description.$error}")
      tab-pane(name="ユーザー設定")
        row.mt-4.py-4(title="ユーザー名")
          input.py-2.px-1.w-full(v-model.trim="$v.name.$model" :class="{error: $v.name.$error}")
        row.py-4(title="ユーザープロフィール")
          input.py-2.px-1.w-full(v-model.trim="$v.bio.$model" :class="{error: $v.bio.$error}")
        row.py-4(title="アイコン URL")
          input.py-2.px-1.w-full(v-model.trim="$v.iconUrl.$model" :class="{error: $v.iconUrl.$error}")

    .mt-2
      button.px-3.py-2.mr-2.bg-blue.text-white(@click.prevent="onClick")
        | 変更する
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { Action, State } from "vuex-class";
import { Settings as BlogSettings } from "@yuiblog/types";

import Row from "@/components/settings/Row.vue";
import TabHorizontal from "@/components/tabs/Horizontal.vue";
import TabPane from "@/components/tabs/Pane.vue";

@Component({
  components: {
    Row,
    TabHorizontal,
    TabPane
  },
  mixins: [validationMixin],
  validations: {
    title: {
      required
    },
    description: {
      required
    },
    name: {
      required
    },
    bio: {
      required
    },
    iconUrl: {
      required
    }
  }
})
export default class Settings extends Vue {
  public title: string = "";
  public description: string = "";
  public name: string = "";
  public bio: string = "";
  public iconUrl: string = "";

  @Action("settings/fetch")
  public fetch!: () => Promise<void>;

  @Action("settings/saveBlog")
  public saveBlog!: ({ blog }: { blog: BlogSettings.Blog }) => Promise<void>;

  @Action("settings/saveUser")
  public saveUser!: ({ user }: { user: BlogSettings.User }) => Promise<void>;

  @State((state, getters) => state.settings.blog)
  public blog!: BlogSettings.Blog;

  @State((state, getters) => state.settings.user)
  public user!: BlogSettings.User;

  public get url(): string {
    return `${location.protocol}//${location.host}`;
  }

  public async onClick(): Promise<void> {
    await this.saveBlog({
      blog: {
        name: this.title,
        description: this.description
      }
    });
    await this.saveUser({
      user: {
        name: this.name,
        bio: this.bio,
        icon: this.iconUrl
      }
    });
  }

  public async created(): Promise<void> {
    await this.fetch();
    if (this.blog && this.user) {
      this.title = this.blog.name;
      this.description = this.blog.description;
      this.name = this.user.name;
      this.bio = this.user.bio;
      this.iconUrl = this.user.icon;
    }
  }
}
</script>

<style lang="postcss" scoped>
.error {
  @apply border-red !important;
}
</style>
