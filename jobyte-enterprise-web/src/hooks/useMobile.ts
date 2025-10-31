"use client";

import { useEffect, useState } from "react";

/**
 * Hook para detectar se o dispositivo é mobile com base na largura da tela
 * @param breakpoint A largura em pixels abaixo da qual é considerado mobile (padrão: 768px)
 * @returns Objeto contendo isMobile (boolean)
 */
export function useMobile(breakpoint: number = 768) {
  // Inicializar como undefined para evitar incompatibilidade com SSR
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    // Função para atualizar o estado baseado no tamanho da tela
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    // Verificação inicial
    handleResize();

    // Adiciona listener para redimensionamento da janela
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return { isMobile };
}