package br.com.gabriel.jobyte_api.enterprise.application.dtos.request;

public record FillEnterpriseProfileRequest(
  String companyName,
  String cnpj,
  String address,
  String phone
) {}
