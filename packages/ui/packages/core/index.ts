import { makeInstaller } from "@pudhing-ui/utils";
import components from "./components";
import "@pudhing-ui/theme/index.css";

const installer = makeInstaller(components);

export * from "../components";
export default installer;