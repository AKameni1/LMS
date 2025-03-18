import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="text-red-500">Edit app/index.tsx to edit this screen.</Text>
      <div className="w-10 h-10 bg-red-500" />
    </View>
  );
}
