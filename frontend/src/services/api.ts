import axios, { HttpStatusCode } from "axios";
import {
  Developer,
  DeveloperPaginate,
  Level,
  DeveloperFormData,
  LevelFormData,
} from "../interfaces";

const api = axios.create({ baseURL: "http://localhost:3000/" });

const DEVELOPERS_PER_PAGE = 5;

export class DeveloperService {
  static async getDevelopers(page: number = 1): Promise<DeveloperPaginate> {
    try {
      const response = await api.get<DeveloperPaginate>("desenvolvedor", {
        params: { page, perPage: DEVELOPERS_PER_PAGE },
      });
      return response.data;
    } catch (error) {
      console.error("Error ao buscar desenvolvedores", error);
      throw error;
    }
  }

  static async getDeveloperById(id: number): Promise<Developer> {
    try {
      const response = await api.get<Developer>(`desenvolvedor/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error ao buscar desenvolvedor", error);
      throw error;
    }
  }

  static async createDeveloper(data: DeveloperFormData) {
    try {
      const developerPayload = {
        nome: data.nome,
        sexo: data.sexo,
        datanascimento: data.datanascimento,
        hobby: data.hobby,
        nivelId: Number(data.nivel),
      };
      const response = await api.post("desenvolvedor", developerPayload);
      const createdSuccess = response?.status == HttpStatusCode.Created;
      return createdSuccess;
    } catch (error) {
      console.error("Error ao cadastrar desenvolvedor", error);
      return false;
    }
  }

  static async updateDeveloper(id: number, data: DeveloperFormData) {
    try {
      const developerPayload = {
        nome: data.nome,
        sexo: data.sexo,
        datanascimento: data.datanascimento,
        hobby: data.hobby,
        nivelId: Number(data.nivel),
      };
      const response = await api.patch(`desenvolvedor/${id}`, developerPayload);
      const updatedSuccess = response?.status == HttpStatusCode.Ok;
      return updatedSuccess;
    } catch (error) {
      console.error("Error ao cadastrar desenvolvedor", error);
      return false;
    }
  }

  static async deleteDeveloper(id: number) {
    try {
      const response = await api.delete(`desenvolvedor/${id}`);
      const deletedSuccess = response?.status == HttpStatusCode.NoContent;
      return deletedSuccess;
    } catch (error) {
      console.error("Error ao deletar desenvolvedores", error);
      return false;
    }
  }
}

export class LevelService {
  static async getLevels(): Promise<Level[]> {
    try {
      const response = await api.get<Level[]>("nivel");
      return response.data;
    } catch (error) {
      console.error("Error ao buscar niveis", error);
      throw error;
    }
  }

  static async getLevelById(id: number): Promise<Level> {
    try {
      const response = await api.get<Level>(`nivel/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error ao buscar nivel", error);
      throw error;
    }
  }

  static async createLevel(data: LevelFormData) {
    try {
      const levelPayload = {
        nivel: data.nivel,
      };
      const response = await api.post("nivel", levelPayload);
      const createdSuccess = response?.status == HttpStatusCode.Created;
      return createdSuccess;
    } catch (error) {
      console.error("Error ao cadastrar nivel", error);
      return false;
    }
  }

  static async updateLevel(id: number, data: LevelFormData) {
    try {
      const levelPayload = {
        nivel: data.nivel,
      };
      const response = await api.patch(`nivel/${id}`, levelPayload);
      const updatedSuccess = response?.status == HttpStatusCode.Ok;
      return updatedSuccess;
    } catch (error) {
      console.error("Error ao cadastrar nivel", error);
      return false;
    }
  }

  static async deleteLevel(id: number) {
    try {
      const response = await api.delete(`nivel/${id}`);
      const deletedSuccess = response?.status == HttpStatusCode.NoContent;
      return deletedSuccess;
    } catch (error) {
      console.error("Error ao deletar nivel", error);
      return false;
    }
  }
}
