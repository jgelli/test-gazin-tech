import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Flex,
  Spacer,
  Button,
  Container,
} from "@chakra-ui/react";
import { Level, DeveloperFormData } from "../../interfaces";
import { DeveloperService, LevelService } from "../../services/api";
import { useNavigate, Link } from "react-router-dom";
import DeveloperForm from "../../components/Developer/DeveloperForm";

const CreateDeveloper: React.FC = () => {
  const [levels, setLevels] = useState<Level[]>([]);
  const [formData, setFormData] = useState<DeveloperFormData>({
    nome: "",
    sexo: "O",
    datanascimento: "",
    hobby: "",
    nivel: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchLevels = async () => {
      const levelsData = await LevelService.getLevels();
      setLevels(levelsData);
    };

    fetchLevels();
  }, []);

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
      const createdSuccess = await DeveloperService.createDeveloper(formData);
      const message = createdSuccess
        ? "Desenvolvedor criado com sucesso!"
        : "Erro ao cadastrar desenvolvedor.";
      navigate("/", { state: { status: createdSuccess, message } });
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
    }
  };

  return (
    <Container>
      <Box p={4}>
        <Heading as="h1" mb={4}>
          Cadastro de Desenvolvedor
        </Heading>
        <form onSubmit={handleSubmit}>
          <DeveloperForm
            formData={formData}
            levels={levels}
            handleChange={handleChange}
          />
          <Flex p={3}>
            <Button colorScheme="green" type="submit">
              Cadastrar
            </Button>
            <Spacer />
            <Link to="/">
              <Button colorScheme="red">Cancelar</Button>
            </Link>
          </Flex>
        </form>
      </Box>
    </Container>
  );
};

export default CreateDeveloper;
