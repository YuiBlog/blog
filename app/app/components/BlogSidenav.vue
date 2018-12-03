<template lang="pug">
  div
    profile
    latest
    archive
    category
    happy-busy
    admin
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

import Admin from "components/blogparts/Admin.vue";
import Archive from "components/blogparts/Archive.vue";
import Category from "components/blogparts/Category.vue";
import Latest from "components/blogparts/Latest.vue";
import HappyBusy from "components/blogparts/HappyBusy.vue";
import Profile from "components/blogparts/Profile.vue";

@Component({
  components: {
    Admin,
    Archive,
    Category,
    Latest,
    HappyBusy,
    Profile
  }
})
export default class extends Vue {}
</script>

