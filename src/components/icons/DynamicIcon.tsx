import React from "react";
import { IconProps } from "./IconProps";
import Chat from "./Chat";
import Home from "./Home";
import Saved from "./Saved";
import Profile from "./Profile";
import Bell from "./Bell";
import Social from "./Social";
import House from "./House";
import Work from "./Work";
import Health from "./Health";
import ImportFileIcon from "./ImportFileIcon";
import Language from "./Language";
import Transport from "./Transport";
import Shopping from "./Shopping";
import DoubleArrowRight from "./DoubleArrowRight";
import Scan from "./Scan";
import InfoIcon from "./InfoIcon";
import Loading from "./Loading";
import CheckIcon from "./CheckIcon";
import Close from "./Close";
import Add from "./Add";
import Share from "./Share";
import PdfIcon from "./PdfIcon";
import Calendar from "./Calendar";
import ExportFile from "./ExportFile";
import TextToSpeech from "./TextToSpeech";
import ArrowRight from "./ArrowRight";
import Tick from "./Tick";
import Filter from "./Filter";
import CircleIcon from "./CircleIcon";
import FileIcon from "./FileIcon";
import { Colors } from "@/constants/Colors";

export type DynamicIconName =
  | "Chat"
  | "Home"
  | "Saved"
  | "Profile"
  | "Bell"
  | "Social"
  | "Immigration"
  | "House"
  | "Work"
  | "Health"
  | "Finance"
  | "Language"
  | "Transport"
  | "Family"
  | "Shopping"
  | "DoubleArrowRight"
  | "Scan"
  | "Info"
  | "ImportFile"
  | "Loading"
  | "Check"
  | "Add"
  | "Close"
  | "Share"
  | "Pdf"
  | "Calendar"
  | "ExportFile"
  | "TextToSpeech"
  | "ArrowRight"
  | "Tick"
  | "Filter"
  | "Circle"
  | "File"
  | null;

export interface DynamicIconProps extends IconProps {
  name: DynamicIconName;
}

interface IconListItem {
  name: string;
  icon: React.FC<IconProps>;
}

const IconList: IconListItem[] = [
  {
    name: "Chat",
    icon: Chat,
  },
  {
    name: "Home",
    icon: Home,
  },
  {
    name: "Saved",
    icon: Saved,
  },

  {
    name: "Profile",
    icon: Profile,
  },
  {
    name: "Bell",
    icon: Bell,
  },
  {
    name: "Social",
    icon: Social,
  },
  {
    name: "House",
    icon: House,
  },
  {
    name: "Work",
    icon: Work,
  },
  {
    name: "Health",
    icon: Health,
  },
  {
    name: "ImportFile",
    icon: ImportFileIcon,
  },
  {
    name: "Language",
    icon: Language,
  },
  {
    name: "Transport",
    icon: Transport,
  },
  {
    name: "Shopping",
    icon: Shopping,
  },
  {
    name: "DoubleArrowRight",
    icon: DoubleArrowRight,
  },
  {
    name: "Scan",
    icon: Scan,
  },
  {
    name: "Info",
    icon: InfoIcon,
  },
  {
    name: "Loading",
    icon: Loading,
  },
  {
    name: "Check",
    icon: CheckIcon,
  },
  {
    name: "Close",
    icon: Close,
  },
  { name: "Add", icon: Add },
  { name: "Share", icon: Share },
  { name: "Pdf", icon: PdfIcon },
  { name: "Calendar", icon: Calendar },
  { name: "ExportFile", icon: ExportFile },
  { name: "TextToSpeech", icon: TextToSpeech },
  { name: "ArrowRight", icon: ArrowRight },
  { name: "Tick", icon: Tick },
  { name: "Filter", icon: Filter },
  { name: "Circle", icon: CircleIcon },
  { name: "File", icon: FileIcon },
];

const DynamicIcon: React.FC<DynamicIconProps> = ({
  name,
  style,
  color = Colors.BLACK,
  size = 20,
  active,
}) => {
  if (name === null) return null;

  const Content: React.FC<IconProps> | undefined = IconList.find(
    (el: IconListItem) =>
      el?.name.toLowerCase() === (name as string).toLowerCase()
  )?.icon;

  if (Content) {
    return <Content style={style} size={size} color={color} active={active} />;
  }
  const IconStringList: string[] = IconList.map((el) => el?.name);
  console.warn(
    `[Template icon] - name: ${name} must only equal one of:${IconStringList}`
  );
  return null;
};

export default DynamicIcon;
