export interface User {
  name: string;
  email: string;
  roles: string[];
  favorites: string[];
  readLater: string[];
}
export interface UserWithFL extends User {
  favoritesLinks: [
    {
      _id: string;
      technology: string;
      ref: string;
      name: string;
    }
  ];
  readLaterLinks: [
    {
      _id: string;
      technology: string;
      ref: string;
      name: string;
    }
  ];
}
