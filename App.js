import { useState } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView, View, Pressable } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function App() {
  const [date, setDate] = useState(new Date());
  const [toggle, setToggle] = useState(false);

  const height = useSharedValue(150);

  const style = useAnimatedStyle(() => {
    return {
      height: withTiming(height.value),
    };
  });

  const onDateChange = (_, selectedDate) => {
    setDate(selectedDate);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View style={{ flex: 1, paddingHorizontal: 20, marginTop: 60 }}>
        <Pressable
          onPress={() => {
            setToggle((toggle) => !toggle);
            if (height.value === 150) {
              height.value = 300;
            } else {
              height.value = 150;
            }
          }}
        >
          <Animated.View style={[{ backgroundColor: "orange" }, style]}>
            {toggle && (
              <DateTimePicker
                value={date}
                mode="date"
                is24Hour={true}
                onChange={onDateChange}
              />
            )}
          </Animated.View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
