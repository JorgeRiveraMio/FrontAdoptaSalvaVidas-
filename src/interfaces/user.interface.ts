export interface Usuario {
    id: number;
    name: string;
    email: string;
    username: string;
    rol: {
      id: number;
      name: string;
    };
}
