import { ref } from "vue";
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";
const getPosts = () => {
  const posts = ref([]);
  const error = ref(null);

  const load = async () => {
    const colRef = collection(db, "posts");
    getDocs(colRef)
      .then((snapshot) => {
        let docs = [];
        snapshot.docs.forEach((doc) => {
          console.log(doc.id);
          docs.push({ ...doc.data(), id: doc.id });
          console.log(docs);
        });
        posts.value = docs;
      })
      .catch((er) => (error.value = er.message));
  };
  return { posts, error, load };
};
export default getPosts;
