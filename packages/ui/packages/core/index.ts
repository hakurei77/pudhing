import { makeInstaller } from "@pudhing-ui/utils";
import components from "./components";
import "@pudhing-ui/theme/index.css"

const installer = makeInstaller(components);

export * from "@pudhing-ui/components";
export default installer;