import { useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, Alert, ScrollView } from "react-native";
import * as Progress from "react-native-progress";
import { SUMMARY } from "@/navigation/screenNames";
import {
  SCREEN_WIDTH,
  WRAPPED_SCREEN_WIDTH,
  WRAPPER_MARGIN,
} from "@/constants/Layout";
import Box from "@/components/Box";
import DynamicIcon from "@/components/icons/DynamicIcon";
import { Colors } from "@/constants/Colors";
import TemplateText from "@/components/TemplateText";
import Button from "@/components/Button";
import ModalBase from "@/components/modals/ModalBase";
import * as DocumentPicker from "expo-document-picker";
import { Directory, File, Paths } from "expo-file-system";
import { Camera } from "expo-camera";
import DocumentScanner from "react-native-document-scanner-plugin";

type ScannedDoc = {
  id: string;
  title: string;
  fileName: string;
  filePath: string;
};
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

const ScanDocumentScreen = ({ navigation }: ScanLetterScreenProps) => {
  const [scannedDocuments, setScannedDocuments] = useState<Array<any>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scanCount, setScanCount] = useState(0);
  const [isScanCompletedModalVisible, setIsScanCompletedModalVisible] =
    useState(false);

  const toTitle = (name: string) =>
    name
      .replace(/\.[^.]+$/, "")
      .replace(/[_-]+/g, " ")
      .replace(/\b\w/g, (m) => m.toUpperCase());

  const handleImportFromFiles = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        multiple: true,
        copyToCacheDirectory: true, // ensures immediate FS read access
        type: [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "text/plain",
          "image/*",
          "*/*",
        ],
      }); // returns { canceled, assets: [...] } on native
      if (result.canceled || !result.assets?.length) return;

      // Ensure persistent folder: <app>/Documents/Letters
      const docsDir = new Directory(Paths.document, "Letters");
      try {
        docsDir.create(); // creates if missing
      } catch {
        /* no-op if it already exists */
      }

      const imported: ScannedDoc[] = result.assets.map((asset) => {
        // Build persistent destination path: <Documents>/Letters/<original-name>
        const src = new File(asset?.uri); // File can be constructed from DocumentPickerAsset
        const dest = new File(docsDir, asset.name || `file-${Date.now()}`);
        try {
          src.copy(dest); // copy from cache/provider into our app's documents dir
        } catch (e) {
          // Fallback: keep the original file if copy fails for any reason
          return {
            id: String(Date.now() + Math.random()),
            title: toTitle(asset.name || "Document"),
            fileName: asset.name || "document",
            filePath: src.uri,
          };
        }
        return {
          id: String(Date.now() + Math.random()),
          title: toTitle(dest.name),
          fileName: dest.name,
          filePath: dest.uri,
        };
      });

      setScannedDocuments((prev) => [...imported, ...prev]);
    } catch (err) {
      Alert.alert(
        "Import failed",
        "Could not import document(s). Please try again."
      );
      console.warn("Import error", err);
    }
  };

  const handleScanDocument = async () => {
    // 1) Ask for camera permission (good hygiene; iOS will prompt on first access)
    const { granted } = await Camera.requestCameraPermissionsAsync(); // Expo camera permissions
    if (!granted) {
      Alert.alert(
        "Camera permission required",
        "Enable camera permission to scan documents."
      );
      return;
    }

    try {
      // 2) Launch native scanner UI
      const { scannedImages } = await DocumentScanner.scanDocument(); // returns string[] paths

      if (!scannedImages || scannedImages.length === 0) return; // user canceled

      // 3) Ensure persistent folder: <app>/Documents/Letters
      const lettersDir = new Directory(Paths.document, "Letters");
      try {
        lettersDir.create(); // no-op if exists
      } catch {}

      // 4) Copy scans into our app docs and add to UI list
      const imported = scannedImages.map((srcPath, idx) => {
        const src = new File(srcPath);
        const fileName = `scan_${Date.now()}_${idx + 1}.jpg`;
        const dest = new File(lettersDir, fileName);

        try {
          src.copy(dest);
          return {
            id: String(Date.now() + Math.random()),
            title: toTitle(fileName),
            fileName,
            filePath: dest.uri,
          };
        } catch {
          // Fallback: keep original path if copy fails
          const base = srcPath.split("/").pop() ?? fileName;
          return {
            id: String(Date.now() + Math.random()),
            title: toTitle(base),
            fileName: base,
            filePath: srcPath,
          };
        }
      });

      setScannedDocuments((prev) => [...imported, ...prev]);
    } catch (e) {
      // The plugin throws on errors; user cancel usually returns empty array above
      console.warn("scanDocument error", e);
      Alert.alert(
        "Scan failed",
        "Could not complete the scan. Please try again."
      );
    }
  };

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
        <Box
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
          <DynamicIcon name="Info" size={24} color={Colors.WHITE} />
        </Box>
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
      style={{ flex: 1, backgroundColor: Colors.BLACK }}
    >
      <TemplateText semiBold size={20} mb={30}>
        Capture your letter
      </TemplateText>
      <TemplateText center mb={40} style={{ maxWidth: 300 }} size={14}>
        We will read it, explain it in plain language, and create a step-by-step
        plan.
      </TemplateText>

      {scannedDocuments.length === 0 ? (
        <Box alignItems="center">
          <Box
            pAll={40}
            borderRadius={24}
            borderWidth={StyleSheet.hairlineWidth}
            mb={24}
            borderColor={Colors.WHITE_20}
            backgroundColor={Colors.WHITE_10}
            onPress={handleScanDocument}
          >
            <DynamicIcon name="Scan" size={60} color={Colors.WHITE_60} />
          </Box>
          <TemplateText size={14}>Open scanner</TemplateText>
        </Box>
      ) : (
        <Box style={styles.grid} ph={WRAPPER_MARGIN} mb={24}>
          {scannedDocuments.map((document) => (
            <Box
              key={document.id}
              style={styles.tile}
              pAll={10}
              borderRadius={16}
              borderColor={Colors.WHITE_30}
              borderWidth={StyleSheet.hairlineWidth}
              alignItems="center"
              justifyContent="center"
            >
              <DynamicIcon name={"File"} color={Colors.WHITE} size={26} />

              <TemplateText
                size={14}
                semiBold
                style={styles.fileName}
                numberOfLines={2}
              >
                {document.fileName}
              </TemplateText>

              <Box
                onPress={() => removeScan(document.id)}
                absolute
                left={10}
                top={10}
              >
                <DynamicIcon name="Close" size={18} color={Colors.WHITE} />
              </Box>
            </Box>
          ))}
        </Box>
      )}
      {scannedDocuments?.length > 0 && (
        <Box>
          <Box
            onPress={handleScanDocument}
            ph={24}
            pv={14}
            borderRadius={16}
            borderWidth={1}
            borderColor={Colors.WHITE_30}
            mb={10}
            justifyContent="center"
            alignItems="center"
            row
          >
            <DynamicIcon name="Scan" size={24} color={Colors.WHITE} />
            <TemplateText color={Colors.WHITE} size={16} medium ml={10}>
              Scan Another Document
            </TemplateText>
          </Box>
          <TemplateText size={14} semiBold center mb={10}>
            OR
          </TemplateText>
          <Box
            ph={24}
            pv={14}
            borderRadius={16}
            borderWidth={1}
            borderColor={Colors.WHITE_30}
            mb={20}
            justifyContent="center"
            alignItems="center"
            row
            onPress={handleImportFromFiles}
          >
            <DynamicIcon name="ImportFile" size={24} color={Colors.WHITE} />
            <TemplateText color={Colors.WHITE} size={16} medium ml={10}>
              Upload from Device
            </TemplateText>
          </Box>
        </Box>
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
          onPress={handleImportFromFiles}
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
        <Box
          backgroundColor={Colors.WHITE_20}
          width={WRAPPED_SCREEN_WIDTH}
          pAll={20}
          borderRadius={24}
          borderColor={Colors.WHITE_30}
          borderWidth={StyleSheet.hairlineWidth}
          justifyContent="center"
          alignItems="center"
        >
          <Box row mb={16} center selfCenter>
            <DynamicIcon
              name={isCompleted ? "Check" : "Loading"}
              size={24}
              color={isCompleted ? Colors.WHITE : Colors.WHITE_40}
            />
            <TemplateText semiBold size={18} ml={10}>
              {isCompleted ? "Summary ready" : "Analyzing your letter"}
            </TemplateText>
          </Box>

          <TemplateText size={14} mb={16} style={{ opacity: 0.9 }} center>
            {isCompleted
              ? "We turned the official letter into a clear summary with a simple action plan."
              : "Sit tight for a moment. We’re extracting what matters and drafting your next steps."}
          </TemplateText>

          <TemplateText center size={12} mt={8}>
            {progress}%
          </TemplateText>
          <Box mt={16} mb={20}>
            <Progress.Bar
              width={WRAPPED_SCREEN_WIDTH - 80}
              progress={progress / 100}
              color={Colors.WHITE}
              unfilledColor={Colors.WHITE_30}
              borderWidth={0}
              animated
            />
          </Box>

          {!isCompleted && (
            <Box mb={16}>
              <TemplateText semiBold size={15} mb={4}>
                {currentStep.title}
              </TemplateText>
              <TemplateText size={13} style={{ opacity: 0.9 }}>
                {currentStep.description}
              </TemplateText>
            </Box>
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
        </Box>
      </ModalBase>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.BLACK,
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
    borderColor: Colors.WHITE_30,
    backgroundColor: Colors.WHITE_10,
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
    backgroundColor: Colors.WHITE_10,
    marginLeft: 8,
    width: 60,
    height: 60,
  },
});
export default ScanDocumentScreen;
