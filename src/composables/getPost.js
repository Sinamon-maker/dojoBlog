import { ref } from "vue";
import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

const getPost = (id) => {
  const post = ref(null);
  const error = ref(null);

  const load = async () => {
    try {
      const colRef = doc(db, "posts", id);
      const docSnap = await getDoc(colRef);
      if (!docSnap.exists()) {
        throw Error("this post does not exist");
      }
      if (!docSnap) {
        throw Error("this post does not exist");
      }

      post.value = docSnap.data();
    } catch (err) {
      console.log(err);
    }
  };

  return { post, error, load };
};
export default getPost;
