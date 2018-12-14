<script lang="ts">
import { Context } from "nuxt";
import { Component, Vue } from "nuxt-property-decorator";

@Component
export default class extends Vue {
  public async fetch({ redirect }: Context): Promise<void> {
    redirect("/");
  }
}
</script>
