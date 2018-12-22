<script lang="ts">
import { Context } from "nuxt";
import { Component, Vue } from "nuxt-property-decorator";

@Component
export default class extends Vue {
  public async fetch({ params, redirect }: Context): Promise<void> {
    const { category } = params;
    redirect(`/archive/category/${encodeURIComponent(category)}`);
  }
}
</script>
