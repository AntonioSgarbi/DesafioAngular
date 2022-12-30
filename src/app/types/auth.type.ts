export type AuthRequest = {
  email: string;
  senha: string;
}

export type AuthResponse = {
  result: {
    token: string;
  }
}
