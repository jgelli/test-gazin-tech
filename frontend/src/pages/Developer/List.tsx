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
import {
  DeleteIcon,
  EditIcon,
  AddIcon,
  ArrowRightIcon,
} from "@chakra-ui/icons";
import { DeveloperService } from "../../services/api";
import { Developer } from "../../interfaces";
import AlertMessage, { Message } from "../../components/AlertMessage";

const formatDate = (dateString: string): string => {
  return dateString.replace(/(\d{4})-(\d{2})-(\d{2})/, "$3/$2/$1");
};

const ListDeveloper: React.FC = () => {
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [alertMessage, setAlertMessage] = useState<Message>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);

  const location = useLocation();
  const { state } = location;

  useEffect(() => {
    const fetchDevelopers = async () => {
      const developersPaginate = await DeveloperService.getDevelopers(
        currentPage
      );
      setDevelopers(developersPaginate.desenvolvedores);
      setHasNextPage(developersPaginate.hasNext);
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

    fetchDevelopers();
  }, [currentPage]);

  const handleDeleteDeveloper = async (id: number) => {
    const deletedSuccess = await DeveloperService.deleteDeveloper(id);
    const deletedAlert: Message = deletedSuccess
      ? {
          message: "Desenvolvedor deletado com sucesso.",
        }
      : {
          type: "error",
          message: "Ocorreu um erro ao excluir o desenvolvedor.",
        };
    setAlertMessage(deletedAlert);
    onOpen();

    if (deletedSuccess) {
      const updatedDevelopers = developers.filter(
        (developer) => developer.id !== id
      );
      setDevelopers(updatedDevelopers);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const {
    isOpen: isVisible,
    onClose,
    onOpen,
  } = useDisclosure({ defaultIsOpen: false });

  return (
    <Box className="wrapper">
      <Heading as="h1" mb={4} p={4} w="100%" bgColor="teal">
        Lista de Desenvolvedores
      </Heading>
      <Stack direction="row" spacing={3}>
        <Link to="/desenvolvedor/criar">
          <Button leftIcon={<AddIcon />} colorScheme="green">
            Cadastrar
          </Button>
        </Link>
        <Link to="/nivel">
          <Button rightIcon={<ArrowRightIcon />} colorScheme="blue">
            Niveis
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
              <Th>Nome</Th>
              <Th>Sexo</Th>
              <Th>Data de Nascimento</Th>
              <Th>Hobby</Th>
              <Th>Nível</Th>
              <Th>Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            {developers.map((developer) => (
              <Tr key={developer.id}>
                <Td>{developer.nome}</Td>
                <Td>{developer.sexo}</Td>
                <Td>{formatDate(developer.datanascimento)}</Td>
                <Td>{developer.hobby}</Td>
                <Td>{developer.nivel.nivel}</Td>
                <Td>
                  <Button
                    m={2}
                    colorScheme="red"
                    onClick={() => handleDeleteDeveloper(developer.id)}
                  >
                    <DeleteIcon />
                  </Button>
                  <Link to={`desenvolvedor/atualizar/${developer.id}`}>
                    <Button colorScheme="blue">
                      <EditIcon />
                    </Button>
                  </Link>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          {currentPage > 1 && (
            <Button onClick={() => handlePageChange(currentPage - 1)} mx={1}>
              Anterior
            </Button>
          )}
          <Button mx={1}>{currentPage}</Button>
          {hasNextPage && (
            <Button onClick={() => handlePageChange(currentPage + 1)} mx={1}>
              Próxima
            </Button>
          )}
        </div>
      </div>
    </Box>
  );
};

export default ListDeveloper;
