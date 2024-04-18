import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  RadioGroup,
  HStack,
  Radio,
  Select,
} from "@chakra-ui/react";
import { Level, DeveloperFormData } from "../../interfaces";

interface DeveloperFormProps {
  formData: DeveloperFormData;
  levels: Level[];
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
}

const DeveloperForm: React.FC<DeveloperFormProps> = ({
  formData,
  levels,
  handleChange,
}) => {
  return (
    <FormControl isRequired>
      <FormLabel>Nome</FormLabel>
      <Input
        name="nome"
        value={formData.nome}
        onChange={handleChange}
        placeholder="Digite o nome do Desenvolvedor"
      />
      <FormLabel as="legend">Sexo</FormLabel>
      <RadioGroup
        name="sexo"
        value={formData.sexo}
        onChange={(value) =>
          handleChange({
            target: { name: "sexo", value: value },
          } as React.ChangeEvent<HTMLInputElement>)
        }
      >
        <HStack spacing="24px">
          <Radio value="M">Masculino</Radio>
          <Radio value="F">Feminino</Radio>
          <Radio value="O">Outro</Radio>
        </HStack>
      </RadioGroup>
      <FormLabel>Data de Nascimento</FormLabel>
      <Input
        name="datanascimento"
        value={formData.datanascimento}
        onChange={handleChange}
        type="date"
      />
      <FormLabel>Hobby</FormLabel>
      <Input
        name="hobby"
        value={formData.hobby}
        onChange={handleChange}
        placeholder="Digite seu hobby"
      />
      <FormLabel>Nível</FormLabel>
      <Select
        name="nivel"
        value={formData.nivel}
        onChange={handleChange}
        placeholder="Selecione o Nível do Desenvolvedor"
      >
        {levels.map((level) => (
          <option key={level.id} value={level.id}>
            {level.nivel}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};

export default DeveloperForm;
