export interface Student {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  created_at?: Date;
}

export interface StudentInput {
  nom: string;
  prenom: string;
  email: string;
}
