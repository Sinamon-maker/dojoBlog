<template>
  <div class="tag">
    <div v-if="error">{{ error }}</div>
    <div v-if="posts.length" class="layout">
      <PostList :posts="filteredPosts" />
      <TagCloud :posts="posts" />
    </div>
    <div v-else>
      <SpinnerComponent />
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
import PostList from "../components/PostList.vue";
import TagCloud from "../components/TagCloud.vue";
import SpinnerComponent from "../components/SpinnerComponent.vue";
import getPosts from "../composables/getPosts";

export default {
  name: "Tag",
  components: { PostList, SpinnerComponent, TagCloud },
  setup() {
    const { error, posts, load } = getPosts();
    load();

    const route = useRoute();
    console.log(route);
    const filterBy = route.params.tag;

    const filteredPosts = computed(() => {
      return posts.value.filter((item) => {
        return item.tags.includes(filterBy);
      });
    });
    console.log(filterBy, filteredPosts);
    return { error, posts, filteredPosts };
  },
};
</script>
<style>
.tag {
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px;
}
</style>
