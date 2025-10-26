import { FC } from "react";
import { View, Text, StyleSheet } from "react-native";

interface AllDocumentsScreenProps {}

const AllDocumentsScreen: FC<AllDocumentsScreenProps> = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>AllDocumentsScreen</Text>
    </View>
  );
};

export default AllDocumentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111",
  },
});
