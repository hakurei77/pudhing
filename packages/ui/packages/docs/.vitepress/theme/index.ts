import DefaultTheme from "vitepress/theme";
import { type App } from "vue";
import PudhingUI from "pudhing-ui";
import { ElementPlusContainer } from "@vitepress-demo-preview/component";

import "@vitepress-demo-preview/component/dist/style.css";
import "pudhing-ui/dist/index.css";

export default {
  ...DefaultTheme,
  enhanceApp({ app }: { app: App }) {
    app.component("demo-preview", ElementPlusContainer);
    app.use(PudhingUI);
  },
};
