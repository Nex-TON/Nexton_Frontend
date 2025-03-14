import "styled-components";
import { FontsTypes } from "./theme";

declare module "styled-components" {
  export interface DefaultTheme {
    fonts:FontsTypes;
  }
}
