import SafeArea from "@/components/safearea/safearea";
import { supabase } from "@/lib/supabase";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { decode } from "base64-arraybuffer";
import COLORS from "@/constants/colors";
import { useAuth } from "@/providers/AuthProvider";
import { useToast } from "react-native-toast-notifications";
import { Button } from "react-native-paper";
import BarContainer from "@/components/bar-container/bar-container";
import { router } from "expo-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addStudyMaterial } from "@/lib/apiStudyMaterial";
export default function AddStudyMaterialScreen() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [file, setFile] = useState("");
  const [url, setUrl] = useState("");
  const { session } = useAuth();
  const toast = useToast();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: addStudyMaterial,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["study_materials"] });
      setTitle("");
      setDescription("");
      setKeywords("");
      setFile("");
      toast.show("Study Material added successfully", {
        type: "success",
        placement: "top",
      });
    },
    onError: (error) => {
      console.log(error);
      toast.show("Error adding study material", {
        type: "danger",
        placement: "top",
      });
    },
  });

  const onSelectDocument = async () => {
    // TODO
    const document = await DocumentPicker.getDocumentAsync();
    // example {"assets": [{"mimeType": "application/pdf", "name": "SEN301previousexamquestions.pdf", "size": 1082521, "uri": "file:///data/user/0/com.anonymous.edusync/cache/DocumentPicker/f5c93cee-5f34-48d8-8899-3bada5d4e656.pdf"}], "canceled": false}
    if (!document.canceled) {
      const doc = document.assets[0];
      const base64 = await FileSystem.readAsStringAsync(doc.uri, {
        encoding: "base64",
      });
      const filePath = `${session?.user.id}_${doc.name}`;
      const contentType = doc.mimeType;
      const { data, error } = await supabase.storage
        .from("study_material")
        .upload(filePath, decode(base64), { contentType, upsert: true });
      if (error) {
        console.log(error);
        return;
      }
      if (data) {
        toast.show("Document uploaded successfully", {
          type: "success",
          placement: "top",
        });
      }
      setFile(document.assets[0].name);
      const {
        data: { publicUrl },
      } = supabase.storage
        .from("study_material")
        .getPublicUrl(`${session?.user.id}_${doc.name}`);
      console.log(publicUrl);
      setUrl(publicUrl);
    }
  };

  function handleAddStudyMaterial() {
    const newStudyMaterial = {
      title,
      description,
      keywords,
      url,
      created_by: 5,
    };
    mutate(newStudyMaterial);
  }
  return (
    <SafeArea>
      <View style={{ gap: 16 }}>
        <BarContainer
          title="Add Study Material"
          icon="chevron-back"
          onPress={() => router.back()}
        />
        <TextInput
          placeholder="Add Title"
          value={title}
          onChangeText={setTitle}
          style={{
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderColor: "gray",
            borderWidth: 1,
            borderRadius: 8,
          }}
        />
        <TextInput
          placeholder="Add Description"
          value={description}
          multiline
          onChangeText={setDescription}
          style={{
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderColor: "gray",
            borderWidth: 1,
            borderRadius: 8,
          }}
        />
        <TextInput
          placeholder="Add Keywords (Comma separated)"
          value={keywords}
          onChangeText={setKeywords}
          style={{
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderColor: "gray",
            borderWidth: 1,
            borderRadius: 8,
          }}
        />
        <Button
          style={{
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 8,
            backgroundColor: COLORS.purple,
          }}
          textColor={COLORS.white}
          onPress={handleAddStudyMaterial}
        >
          Add Study Material
        </Button>
      </View>
      <TouchableOpacity onPress={onSelectDocument} style={styles.fab}>
        <Ionicons name="file-tray-full" size={30} color={"#fff"} />
      </TouchableOpacity>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  fab: {
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    position: "absolute",
    bottom: 16,
    right: 16,
    height: 70,
    backgroundColor: COLORS.purple,
    borderRadius: 100,
  },
});
