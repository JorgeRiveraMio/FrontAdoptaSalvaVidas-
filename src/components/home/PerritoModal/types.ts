//src/components/home/PerritoModal/types.ts
export interface PerritoModalProps {
  isOpen?: boolean;
  onClose: () => void;
  id: number;
  nombre: string;
  usuarioId?: number | null;
}
