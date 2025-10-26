import { useEffect, useState } from "react";
import { InteractionManager } from "react-native";

const useInteraction = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      setReady(true);
    });
  }, []);

  return ready;
};

export default useInteraction;
