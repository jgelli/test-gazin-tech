import React from "react";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { LevelFormData } from "../../interfaces";

interface LevelFormDataProps {
  formData: LevelFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LevelForm: React.FC<LevelFormDataProps> = ({
  formData,
  handleChange,
}) => {
  return (
    <FormControl isRequired>
      <FormLabel>Nivel</FormLabel>
      <Input
        name="nivel"
        value={formData.nivel}
        onChange={handleChange}
        placeholder="Digite o Nivel"
      />
    </FormControl>
  );
};

export default LevelForm;
