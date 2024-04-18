import React, { useState } from "react";
import {
  Box,
  Heading,
  Flex,
  Spacer,
  Button,
  Container,
} from "@chakra-ui/react";
import { LevelFormData } from "../../interfaces";
import { LevelService } from "../../services/api";
import { useNavigate, Link } from "react-router-dom";
import LevelForm from "../../components/Level/LevelForm";

const CreateLevel: React.FC = () => {
  const [formData, setFormData] = useState<LevelFormData>({
    nivel: "",
  });

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const createdSuccess = await LevelService.createLevel(formData);
      const message = createdSuccess
        ? "Nivel criado com sucesso!"
        : "Erro ao cadastrar nivel.";
      navigate("/nivel", { state: { status: createdSuccess, message } });
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
    }
  };

  return (
    <Container>
      <Box p={4}>
        <Heading as="h1" mb={4}>
          Cadastro de Nivel
        </Heading>
        <form onSubmit={handleSubmit}>
          <LevelForm formData={formData} handleChange={handleChange} />
          <Flex p={3}>
            <Button colorScheme="green" type="submit">
              Cadastrar
            </Button>
            <Spacer />
            <Link to="/nivel">
              <Button colorScheme="red">Cancelar</Button>
            </Link>
          </Flex>
        </form>
      </Box>
    </Container>
  );
};

export default CreateLevel;
