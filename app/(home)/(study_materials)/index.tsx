import SafeArea from "@/components/safearea/safearea";
import COLORS from "@/constants/colors";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { FAB, Searchbar } from "react-native-paper";
import { FONT_SIZE, FONT_WEIGHT } from "@/constants/fonts";
import { useQuery } from "@tanstack/react-query";
import { getStudyMaterials } from "@/lib/apiStudyMaterial";
import { StudyMaterial } from "@/type-declarations";
import IconContainer from "@/components/iconContainer/icon-container";
import { downloadFromUrl } from "@/lib/utils-functions";
import { useState } from "react";

export default function StudyMaterialsScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { data: studyMaterials, error: FetchStudyMaterialError } = useQuery({
    queryKey: ["study_materials"],
    queryFn: getStudyMaterials,
  });
  if (FetchStudyMaterialError) {
    console.log(FetchStudyMaterialError);
  }
  return (
    <SafeArea>
      <View style={{ gap: 20 }}>
        <Searchbar
          placeholder="Search Study Materials"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Text
          style={{ fontSize: FONT_SIZE.large, fontWeight: FONT_WEIGHT.bold }}
        >
          Study Materials
        </Text>
        <View style={{ gap: 12 }}>
          {studyMaterials
            ?.filter((studyMaterial: StudyMaterial) =>
              studyMaterial.title
                .toLowerCase()
                .startsWith(searchQuery.toLowerCase()),
            )
            .map((studyMaterial: StudyMaterial) => {
              return (
                <TouchableOpacity
                  onPress={async () =>
                    downloadFromUrl(studyMaterial.url, studyMaterial.title)
                  }
                  key={studyMaterial.sm_id}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <IconContainer icon="folder" />
                  <Text style={{ fontWeight: FONT_WEIGHT.bold }}>
                    {studyMaterial.title}
                  </Text>
                  <IconContainer icon="download-outline" />
                </TouchableOpacity>
              );
            })}
        </View>
      </View>
      <FAB
        color={COLORS.white}
        icon="plus"
        style={{
          position: "absolute",
          margin: 16,
          right: 0,
          bottom: 0,
          backgroundColor: COLORS.purple,
        }}
        onPress={() => router.push("(study_materials)/add")}
      />
    </SafeArea>
  );
}
