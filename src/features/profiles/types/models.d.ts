export interface IProfile {
  id: string;

  name: string;
  description: string;

  createdAt: Date;
  updatedAt: Date;
}

export interface ListProfile {
  id: string;

  name: string;
  description: string;
}
