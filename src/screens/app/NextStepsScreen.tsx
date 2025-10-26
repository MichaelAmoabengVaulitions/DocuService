import { FC } from "react";
import { View, Text, StyleSheet } from "react-native";

interface NextStepsScreenProps {}

const NextStepsScreen: FC<NextStepsScreenProps> = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>NextSteps</Text>
    </View>
  );
};

export default NextStepsScreen;

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
