import { defineComponent, onMounted } from "vue";
import Home  from "@/pages/home";

export default defineComponent({
  name: "App",
  setup() {
    onMounted(() => {});
    return () => (
      <>
        <Home />
      </>
    );
  },
});
