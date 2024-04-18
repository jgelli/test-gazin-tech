import { Desenvolvedor } from '@prisma/client';

export class DesenvolvedorEntity implements Desenvolvedor {
    id: number;
    nome: string;
    sexo: string;
    datanascimento: Date;
    hobby: string;
    nivelId: number;
}
