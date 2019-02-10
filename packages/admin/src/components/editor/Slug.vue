<template lang="pug">
  div
    .bg-grey-light.p-2.my-2
      h4 URL
    .pl-2
      small.text-grey-dark.text-sm
        code /entry/yyyy/mm/
        | 以下の URL を編集できます。 省略した場合は記事 ID になります。
      
      .py-2
        input.w-full.py-2.px-1(v-model.trim="$v.slug.$model" :class="{error: $v.slug.$error}" placeholder="about-yui")

      .py-2
        | プレビュー
        small.block.break-all
          | {{location}}
</template>

<script lang="ts">
import dayjs from "dayjs";
import { Component, Prop, Vue } from "vue-property-decorator";
import { validationMixin } from "vuelidate";
import { helpers } from "vuelidate/lib/validators";

const alphaNumWithHyphen = helpers.regex("alhaNumWithHyphen", /^[A-Za-z0-9\-_]+$/);

const validations = {
  slug: {
    alphaNumWithHyphen
  }
};

@Component({
  mixins: [validationMixin],
  validations
})
export default class EditorSlug extends Vue {
  @Prop({ required: true })
  public date!: string;

  @Prop({ required: true })
  public value!: string;

  public model: string = this.value;

  public get slug(): string {
    return this.model;
  }

  public set slug(value: string) {
    this.model = value;

    if (this.value === value || (this.$v.slug && this.$v.slug.$error)) {
      return;
    }
    this.$emit("input", value);
  }

  public get location(): string {
    const date = dayjs(this.date || new Date()).format("YYYY/MM");
    return `https://${location.host}/entry/${date}/${this.value}`;
  }
}
</script>

<style lang="postcss" scoped>
.break-all {
  word-break: break-all;
}

.error {
  @apply border-red !important;
}
</style>
