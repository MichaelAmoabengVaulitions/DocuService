import { Appearance, Dimensions, Platform } from "react-native";
import { wp } from "@/utils/getResponsiveSize";

const deviceVersion = Platform.Version;
export const IS_ANDROID: boolean = Platform.OS === "android";
export const IS_IOS: boolean = Platform.OS === "ios";
export const IS_DARK: boolean = Appearance.getColorScheme() === "dark";

export const SCREEN_HEIGHT: number = Dimensions.get("screen").height;
export const SCREEN_WIDTH: number = Dimensions.get("screen").width;
export const WRAPPER_MARGIN = wp(16);
export const WRAPPED_SCREEN_WIDTH: number =
  SCREEN_WIDTH - wp(WRAPPER_MARGIN * 2);

export const IS_SMALL_DEVICE: boolean = SCREEN_WIDTH <= 375;
export const IS_SHORT_DEVICE: boolean = SCREEN_HEIGHT < 700;

export const RADIUS_XSMALL = 5;
export const RADIUS_SMALL = 10;
export const RADIUS_MEDIUM = 15;
export const RADIUS_LARGE = 20;
export const RADIUS_XLARGE = 25;
export const RADIUS_XXLARGE = 30;

export const SPACE_XSMALL = 5;
export const SPACE_SMALL = 10;
export const SPACE_MEDIUM = 16;
export const SPACE_LARGE = 20;
export const SPACE_XLARGE = 25;
export const SPACE_XXLARGE = 35;

export const BORDER_XXSMALL = 0.4;
export const BORDER_XSMALL = 1;
export const BORDER_SMALL = 2;
export const BORDER_MEDIUM = 3;
export const BORDER_LARGE = 4;
export const BORDER_XLARGE = 5;
export const BORDER_XXLARGE = 6;
export const HEADER_MARGIN = IS_ANDROID ? 30 : 20;
