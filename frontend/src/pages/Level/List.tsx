import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
  Button,
  useDisclosure,
  Stack,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon, AddIcon, ArrowLeftIcon } from "@chakra-ui/icons";
import { LevelService } from "../../services/api";
import { Level } from "../../interfaces";
import AlertMessage, { Message } from "../../components/AlertMessage";

const ListLevel: React.FC = () => {
  const [levels, setLevels] = useState<Level[]>([]);
  const [alertMessage, setAlertMessage] = useState<Message>();

  const location = useLocation();
  const { state } = location;
  console.log(location);

  useEffect(() => {
    const fetchLevels = async () => {
      const levels = await LevelService.getLevels();
      setLevels(levels);
    };

    if (state) {
      const message: Message = state.status
        ? {
            message: state.message,
          }
        : { type: "error", message: state.message };
      setAlertMessage(message);
      onOpen();
      window.history.replaceState({}, "");
    }

    fetchLevels();
  }, []);

  const handleDeleteLevel = async (id: number) => {
    const deletedSuccess = await LevelService.deleteLevel(id);
    const deletedAlert: Message = deletedSuccess
      ? {
          message: "Nivel deletado com sucesso.",
        }
      : {
          type: "error",
          message: "Ocorreu um erro ao excluir o nivel.",
        };
    setAlertMessage(deletedAlert);
    onOpen();

    if (deletedSuccess) {
      const updatedLevels = levels.filter((level) => level.id !== id);
      setLevels(updatedLevels);
    }
  };

  const {
    isOpen: isVisible,
    onClose,
    onOpen,
  } = useDisclosure({ defaultIsOpen: false });

  return (
    <Box className="wrapper">
      <Heading as="h1" mb={4} p={4} w="100%" bgColor="teal">
        Lista de Niveis
      </Heading>
      <Stack direction="row" spacing={3}>
        <Link to="/">
          <Button leftIcon={<ArrowLeftIcon />} colorScheme="blue">
            Desenvolvedor
          </Button>
        </Link>
        <Link to="/nivel/criar">
          <Button rightIcon={<AddIcon />} colorScheme="green">
            Cadastrar
          </Button>
        </Link>
      </Stack>
      {isVisible && (
        <AlertMessage
          type={alertMessage?.type || "success"}
          message={alertMessage?.message || ""}
          onClose={onClose}
        />
      )}
      <div className="tableContainer">
        <Table variant="striped" colorScheme="gray" className="tableResponsive">
          <Thead>
            <Tr>
              <Th>Nivel</Th>
              <Th>Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            {levels.map((level) => (
              <Tr key={level.id}>
                <Td>{level.nivel}</Td>
                <Td>
                  <Button
                    m={2}
                    colorScheme="red"
                    onClick={() => handleDeleteLevel(level.id)}
                  >
                    <DeleteIcon />
                  </Button>
                  <Link to={`atualizar/${level.id}`}>
                    <Button colorScheme="blue">
                      <EditIcon />
                    </Button>
                  </Link>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>
    </Box>
  );
};

export default ListLevel;
