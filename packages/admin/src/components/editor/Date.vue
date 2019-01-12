<template lang="pug">
  div
    .bg-grey-light.p-2.my-2
      h4 投稿日時
    .pl-2
      small.text-grey-dark.text-sm
        | 記事の投稿日時を編集できます。省略した場合は公開時点の日時になります。
      .py-2
        input.w-full.py-2.px-1(v-model="$v.date.$model" :class="{error: $v.date.$error}" :placeholder="current")
</template>

<script lang="ts">
import dayjs from "dayjs";
import { Component, Prop, Vue } from "vue-property-decorator";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

const datetime = (value: string) => value === "" || new Date(value).toString() !== "Invalid Date";

const validations = {
  date: {
    datetime
  }
};

@Component({
  mixins: [validationMixin],
  validations
})
export default class EditorDate extends Vue {
  @Prop({ required: true })
  public value!: string;

  public model: string = this.value;

  public get date(): string {
    return this.model;
  }

  public set date(value: string) {
    this.model = value;

    if (this.value === value || (this.$v.date && this.$v.date.$error)) {
      return;
    }
    this.$emit("input", value);
  }

  public get current(): string {
    return dayjs(new Date()).format("YYYY/MM/DD HH:mm:ss");
  }
}
</script>

<style lang="postcss" scoped>
.error {
  @apply border-red !important;
}
</style>
