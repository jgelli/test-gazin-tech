import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Flex,
  Spacer,
  Button,
  Container,
} from "@chakra-ui/react";
import { Level, DeveloperFormData, Developer } from "../../interfaces";
import { DeveloperService, LevelService } from "../../services/api";
import { useNavigate, useParams, Link } from "react-router-dom";
import DeveloperForm from "../../components/Developer/DeveloperForm";

const UpdateDeveloper: React.FC = () => {
  const [levels, setLevels] = useState<Level[]>([]);
  const [formData, setFormData] = useState<DeveloperFormData>({
    nome: "",
    sexo: "O",
    datanascimento: "",
    hobby: "",
    nivel: 0,
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchDeveloper = async () => {
      const developerData: Developer = await DeveloperService.getDeveloperById(
        Number(id)
      );
      const { nome, sexo, datanascimento, hobby, nivel } = developerData;
      setFormData({ nome, sexo, datanascimento, hobby, nivel: nivel.id });
    };

    const fetchLevels = async () => {
      const levelsData = await LevelService.getLevels();
      setLevels(levelsData);
    };

    fetchDeveloper();
    fetchLevels();
  }, [id]);

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
      const updatedSuccess = await DeveloperService.updateDeveloper(
        Number(id),
        formData
      );
      const message = updatedSuccess
        ? "Desenvolvedor criado com sucesso!"
        : "Erro ao cadastrar desenvolvedor.";
      navigate("/", { state: { status: updatedSuccess, message } });
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
    }
  };

  return (
    <Container>
      <Box p={4}>
        <Heading as="h1" mb={4}>
          Atualização de Desenvolvedor
        </Heading>
        <form onSubmit={handleSubmit}>
          <DeveloperForm
            formData={formData}
            levels={levels}
            handleChange={handleChange}
          />
          <Flex p={3}>
            <Button colorScheme="green" type="submit">
              Atualizar
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

export default UpdateDeveloper;
