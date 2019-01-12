<template lang="pug">
  navigation
    router-view
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import Navigation from "@/components/Navigation.vue";

@Component({
  components: {
    Navigation
  }
})
export default class Dashboard extends Vue {}
</script>
