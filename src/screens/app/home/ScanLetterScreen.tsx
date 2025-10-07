import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Alert,
  ScrollView,
  Image,
} from "react-native";
import * as Progress from "react-native-progress";
import {
  BLACK,
  BLACK_80,
  BLACK_SECONDARY,
  DARK_FOREST_GREEN,
  FOREST_GREEN,
  GRAY_SCALE_80,
  TRANSPARENT,
  WHITE,
  WHITE_10,
  WHITE_20,
  WHITE_30,
  WHITE_40,
  WHITE_5,
} from "../../../theme/Colors";
import {
  HEADER_MARGIN,
  IS_ANDROID,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  WRAPPED_SCREEN_WIDTH,
  WRAPPER_MARGIN,
} from "../../../theme/Layout";
import DynamicIcon from "../../../components/icons/DynamicIcon";
import TemplateBox from "../../../components/TemplateBox";
import TemplateText from "../../../components/TemplateText";
import Button from "../../../components/Button";
import ModalBase from "../../../components/modals/ModalBase";
//@ts-ignore
import fileImageIcon from "../../../../assets/images/file.png";
import { set } from "date-fns";
import { SUMMARY } from "../../../navigation/ScreenNames";

const TICK_MS = 80;
const STEP_PER_TICK = 1;

const GRID_GUTTER = 14;
const TILE_WIDTH = (SCREEN_WIDTH - WRAPPER_MARGIN * 2 - GRID_GUTTER) / 2;
const TILE_HEIGHT = 100;

type ScanLetterScreenProps = {
  navigation: any;
};

enum SummarizationSteps {
  DETECTING_TEXT = "DetectingText",
  EXTRACTING_TEXT = "ExtractingText",
  SUMMARIZING_DOCUMENT = "SummarizingDocument",
  GENERATING_PLAN = "GeneratingPlan",
}

interface ScanProgressModalProps {
  visible: boolean;
  onRequestClose: () => void;
  onDone?: () => void;
  autoStart?: boolean;
}

type Step = {
  key: SummarizationSteps;
  title: string;
  description: string;
  durationMs: number; // simulation duration
};

type ScannedDoc = {
  id: string;
  title: string;
  fileName: string;
  filePath: string;
};

const STEPS: Step[] = [
  {
    key: SummarizationSteps.DETECTING_TEXT,
    title: "Reading your scan",
    description: "We’re recognizing the text and cleaning the image…",
    durationMs: 1600,
  },
  {
    key: SummarizationSteps.EXTRACTING_TEXT,
    title: "Finding key details",
    description: "Names, addresses, dates, and reference numbers…",
    durationMs: 1400,
  },
  {
    key: SummarizationSteps.SUMMARIZING_DOCUMENT,
    title: "Drafting a plain-English summary",
    description: "Turning official language into clear, simple points…",
    durationMs: 1200,
  },
  {
    key: SummarizationSteps.GENERATING_PLAN,
    title: "Preparing your next-step checklist",
    description: "What to do, in what order, with helpful tips…",
    durationMs: 1200,
  },
];

const getStepFromProgress = (progress: number): Step => {
  if (progress < 25) return STEPS[0];
  if (progress < 50) return STEPS[1];
  if (progress < 80) return STEPS[2];
  if (progress < 100) return STEPS[3];
  return {
    key: SummarizationSteps.GENERATING_PLAN,
    title: "All set",
    description: "Your summary and action plan are ready.",
    durationMs: 0,
  };
};

const ScanLetterScreen = ({ navigation }: ScanLetterScreenProps) => {
  const [scannedDocuments, setScannedDocuments] = useState<Array<any>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scanCount, setScanCount] = useState(0);
  const [isScanCompletedModalVisible, setIsScanCompletedModalVisible] =
    useState(false);

  const addDummyScan = () => {
    const fileName = `finanzamt_letter_${scanCount}.pdf`;
    const filePath = `/Documents/Letters/${fileName}`;
    const newDoc: ScannedDoc = {
      id: String(Date.now()),
      title: `Letter ${scanCount} – Finanzamt`,
      fileName,
      filePath,
    };
    setScannedDocuments((prev) => [newDoc, ...prev]);
    setScanCount(scanCount + 1);
  };

  const removeScan = (id: string) => {
    setScannedDocuments((prev) => prev.filter((d) => d.id !== id));
  };

  const clearAll = () => setScannedDocuments([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TemplateBox
          mr={WRAPPER_MARGIN}
          onPress={() => {
            Alert.alert(
              "Scan Document",
              "Use this feature to scan physical documents and convert them into digital format for easy sharing and storage.",
              [{ text: "OK", onPress: () => {} }],
              { cancelable: true }
            );
          }}
        >
          <DynamicIcon name="Info" size={24} color={WHITE} />
        </TemplateBox>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    if (!isScanCompletedModalVisible) return;
    setProgress(1);

    const id = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(prev + STEP_PER_TICK, 100);
        return next;
      });
    }, TICK_MS);

    return () => clearInterval(id);
  }, [isScanCompletedModalVisible]);

  const currentStep = getStepFromProgress(progress);
  const isCompleted = progress >= 100;

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      style={{ flex: 1, backgroundColor: BLACK }}
    >
      <TemplateText semiBold size={20} mb={30}>
        Capture your letter
      </TemplateText>
      <TemplateText center mb={40} style={{ maxWidth: 300 }} size={14}>
        We will read it, explain it in plain language, and create a step-by-step
        plan.
      </TemplateText>

      {scannedDocuments.length === 0 ? (
        <TemplateBox alignItems="center">
          <TemplateBox
            pAll={40}
            borderRadius={24}
            borderWidth={StyleSheet.hairlineWidth}
            mb={24}
            borderColor={WHITE_20}
            backgroundColor={WHITE_10}
            onPress={addDummyScan}
          >
            <DynamicIcon name="Scan" size={60} color={FOREST_GREEN} />
          </TemplateBox>
          <TemplateText size={14}>Open scanner</TemplateText>
        </TemplateBox>
      ) : (
        <TemplateBox style={styles.grid} ph={WRAPPER_MARGIN} mb={24}>
          {scannedDocuments.map((document) => (
            <TemplateBox
              key={document.id}
              style={styles.tile}
              pAll={10}
              borderRadius={16}
              borderColor={WHITE_30}
              borderWidth={StyleSheet.hairlineWidth}
              alignItems="center"
              justifyContent="center"
            >
              <Image source={fileImageIcon} style={styles.fileIcon} />

              <TemplateText
                size={14}
                semiBold
                style={styles.fileName}
                numberOfLines={2}
              >
                {document.fileName}
              </TemplateText>

              <TemplateBox
                onPress={() => removeScan(document.id)}
                absolute
                left={10}
                top={10}
              >
                <DynamicIcon name="Close" size={18} color={WHITE} />
              </TemplateBox>
            </TemplateBox>
          ))}

          {/* Add tile keeps the grid even when the count is odd */}
          <TemplateBox
            style={[styles.tile, styles.addTile]}
            onPress={addDummyScan}
          >
            <DynamicIcon name="Add" size={24} color={WHITE} />
          </TemplateBox>
        </TemplateBox>
      )}
      {scannedDocuments?.length > 0 && (
        <Button
          title="Generate summary"
          onPress={() => {
            // setIsScanCompletedModalVisible(true);
            navigation.navigate(SUMMARY);
          }}
          loading={false}
          disabled={false}
          style={{ marginTop: 60, width: "80%" }}
        />
      )}

      {scannedDocuments?.length < 1 && (
        <Button
          title="Import from files"
          onPress={() => {
            // Handle open scanner action
          }}
          loading={false}
          disabled={false}
          style={{
            marginTop: 30,
            width: "80%",
            position: "absolute",
            bottom: 60,
          }}
          iconName="ImportFile"
          icon
        />
      )}
      <ModalBase
        isVisible={isScanCompletedModalVisible}
        onClose={() => setIsScanCompletedModalVisible(false)}
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TemplateBox
          backgroundColor={WHITE_20}
          width={WRAPPED_SCREEN_WIDTH}
          pAll={20}
          borderRadius={24}
          borderColor={WHITE_30}
          borderWidth={StyleSheet.hairlineWidth}
          justifyContent="center"
          alignItems="center"
        >
          <TemplateBox row mb={16} center selfCenter>
            <DynamicIcon
              name={isCompleted ? "Check" : "Loading"}
              size={24}
              color={isCompleted ? FOREST_GREEN : WHITE_40}
            />
            <TemplateText semiBold size={18} ml={10}>
              {isCompleted ? "Summary ready" : "Analyzing your letter"}
            </TemplateText>
          </TemplateBox>

          <TemplateText size={14} mb={16} style={{ opacity: 0.9 }} center>
            {isCompleted
              ? "We turned the official letter into a clear summary with a simple action plan."
              : "Sit tight for a moment. We’re extracting what matters and drafting your next steps."}
          </TemplateText>

          <TemplateText center size={12} mt={8}>
            {progress}%
          </TemplateText>
          <TemplateBox mt={16} mb={20}>
            <Progress.Bar
              width={WRAPPED_SCREEN_WIDTH - 80}
              progress={progress / 100}
              color={DARK_FOREST_GREEN}
              unfilledColor={WHITE_30}
              borderWidth={0}
              animated
            />
          </TemplateBox>

          {!isCompleted && (
            <TemplateBox mb={16}>
              <TemplateText semiBold size={15} mb={4}>
                {currentStep.title}
              </TemplateText>
              <TemplateText size={13} style={{ opacity: 0.9 }}>
                {currentStep.description}
              </TemplateText>
            </TemplateBox>
          )}

          {/* Actions */}
          {isCompleted ? (
            <Button
              title="View summary"
              onPress={() => {
                setIsScanCompletedModalVisible(false);
                navigation.navigate(SUMMARY);
              }}
              style={{ width: "90%", alignSelf: "center" }}
            />
          ) : (
            <Button
              title="Cancel"
              onPress={() => setIsScanCompletedModalVisible(false)}
              style={{ width: "90%", alignSelf: "center", marginTop: 20 }}
            />
          )}
        </TemplateBox>
      </ModalBase>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: BLACK,
  },
  contentContainer: {
    flexGrow: 1,
  },
  brandsListContentContainer: {
    alignSelf: "center",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between", // even columns
  },
  tile: {
    width: TILE_WIDTH,
    height: TILE_HEIGHT,
    marginBottom: GRID_GUTTER,
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: WHITE_30,
    backgroundColor: WHITE_10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    position: "relative",
  },
  fileIcon: {
    width: 30,
    height: 36,
  },
  fileName: {
    marginTop: 10,
    maxWidth: TILE_WIDTH - 24,
    textAlign: "center",
  },
  closeBtn: {
    top: 8,
    right: 8,
  },
  addTile: {
    borderStyle: "dashed",
    backgroundColor: WHITE_10,
    marginLeft: 8,
    width: 60,
    height: 60,
  },
});
export default ScanLetterScreen;
