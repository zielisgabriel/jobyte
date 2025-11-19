export interface Enterprise {
  id: string;
  companyName: string;
  cnpj: string;
  address: string;
  phone: string;
  createdAt: string;
  updatedAt?: string;
  keycloakUserId: string;
}