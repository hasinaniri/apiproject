export interface Etudiant {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  created_at?: Date;
}

export interface EtudiantInput {
  nom: string;
  prenom: string;
  email: string;
}
