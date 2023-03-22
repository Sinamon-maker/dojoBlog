<template>
  <div class="create">
    <form @submit.prevent="handleSubmit">
      <label>Title</label>
      <input v-model="title" type="text" required />
      <label>Content:</label>
      <textarea v-model="body" required></textarea>
      <label>Tags (hit enter to add a tag)</label>
      <input v-model="tag" type="text" @keydown.enter.prevent="handleKeydown" />
      <div class="pill" v-for="tag in tags" :key="tag">#{{ tag }}</div>
      <button>Add Post</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { db } from "../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default {
  setup() {
    const title = ref("");
    const body = ref("");
    const tag = ref("");
    const tags = ref([]);

    const router = useRouter();

    const handleKeydown = () => {
      if (!tags.value.includes(tag.value)) {
        tags.value.push(tag.value.replace(/\s/, ""));
      }
      tag.value = "";
    };
    const handleSubmit = async () => {
      try {
        const post = {
          title: title.value,
          body: body.value,
          tags: tags.value,
          createdAt: serverTimestamp(),
        };
        const dbRef = collection(db, "posts");
        await addDoc(dbRef, post);

        router.push({ name: "Home" });
      } catch (err) {
        console.log(err);
      }
    };
    return { title, body, tag, tags, handleKeydown, handleSubmit };
  },
};
</script>

<style>
form {
  max-width: 480px;
  margin: 0 auto;
  text-align: left;
}
input,
textarea {
  display: block;
  margin: 10px 0;
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  border: 1px solid #eee;
}
textarea {
  height: 160px;
}
label {
  display: inline-block;
  margin-top: 30px;
  position: relative;
  font-size: 20px;
  color: white;
  margin-bottom: 10px;
}
label::before {
  content: "";
  display: block;
  width: 100%;
  height: 100%;
  background-color: #ff8800;
  position: absolute;
  z-index: -1;
  padding-right: 40px;
  left: -30px;
  transform: rotate(-1.2deg);
}
button {
  display: block;
  margin-top: 30px;
  background-color: #ff8800;
  color: white;
  border: none;
  padding: 8px 16px;
  font-size: 18px;
}
.pill {
  display: inline-block;
  margin: 10px 10px 0 0;
  color: #444;
  background-color: #ddd;
  padding: 8px;
  border-radius: 20px;
  font-size: 14px;
}
</style>
