<template>
  <div v-if="error">{{ error }}</div>
  <div v-if="post" class="post">
    <h3>{{ post.title }}</h3>
    <p class="pre">{{ post.body }}</p>
    <button class="delete" @click="handleClick">Delete Post</button>
  </div>
  <div v-else>
    <SpinnerComponent />
  </div>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import SpinnerComponent from "../components/SpinnerComponent.vue";
import getPost from "../composables/getPost";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/config";
export default {
  name: "Details",
  props: ["id"],
  components: { SpinnerComponent },
  setup(props) {
    const route = useRoute();
    const router = useRouter();

    const { post, error, load } = getPost(route.params.id);
    load();

    const handleClick = async () => {
      await deleteDoc(doc(db, "posts", route.params.id));
      router.push({ name: "Home" });
    };

    return { post, error, handleClick };
  },
};
</script>

<style>
.post {
  max-width: 1200px;
  margin: 0 auto;
}
.post p {
  color: #444;
  line-height: 1.5em;
  margin-top: 40px;
}
.pre {
  white-space: pre-wrap;
}
button.delete {
  margin: 10px auto;
}
</style>
