export interface Developer {
  id: number;
  nome: string;
  sexo: string;
  datanascimento: string;
  hobby: string;
  nivel: {
    id: number;
    nivel: string;
  };
}

export interface DeveloperPaginate {
  page: number;
  hasNext: boolean;
  desenvolvedores: Developer[];
}

export interface Level {
  id: number;
  nivel: string;
}

export interface DeveloperFormData {
  nome: string;
  sexo: string;
  datanascimento: string;
  hobby: string;
  nivel: number;
}

export interface LevelFormData {
  nivel: string;
}
