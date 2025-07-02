// src/shared/TableGeneralCustom.jsx
import { useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell
} from "@heroui/react";

interface TableGeneralCustomProps {
  master: {
    data: any[];
    columns: { name: string; uid: string; weight?: number }[]; // 👈 agregado weight
  };
  renderCellPadre: (item: any, columnKey: string) => React.ReactNode;
  emptyContent?: string;
  selectionColor?: string;
  minColWidth?: number;
}

// Adaptación final: usar tipo Selection de HeroUI para máxima compatibilidad
// @ts-ignore para forzar compatibilidad si es necesario
export default function TableGeneralCustom({
  master,
  renderCellPadre,
  emptyContent = "No hay registros para mostrar.",
  selectionColor = "success",
  minColWidth = 150
}: TableGeneralCustomProps) {
  const { data = [], columns = [] } = master;
  const [selectedKeys, setSelectedKeys] = useState<any>(new Set());

  const totalMinWidth = columns.length * minColWidth;

  // 👉 Nuevo cálculo proporcional según weight
  const heroColumns = useMemo(() => {
    const totalWeight = columns.reduce((sum, col) => sum + (col.weight ?? 1), 0);
    return columns.map((col) => ({
      key: col.uid,
      label: col.name,
      pct: `${((col.weight ?? 1) / totalWeight) * 100}%` as const
    }));
  }, [columns]);

  const handleSelectionChange = (keys: any) => {
    setSelectedKeys(keys);
  };

  return (
    <div className="tableWrapper">
      <Table
        removeWrapper
        aria-label="Tabla personalizada"
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={handleSelectionChange}
        color={selectionColor as any}
        className="responsiveTable"
        style={{
          tableLayout: "fixed",
          width: "auto",
          minWidth: `${totalMinWidth}px`
        }}
      >
        <TableHeader columns={heroColumns}>
          {column => (
            <TableColumn
              key={column.key}
              width={column.pct as any}
              style={{ width: column.pct }}
            >
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={data} emptyContent={emptyContent}>
          {item => (
            <TableRow key={String(item.id ?? JSON.stringify(item))}>
              {columnKey => (
                <TableCell>
                  <div className="cellContent break-words whitespace-normal max-w-full text-sm">
                    {renderCellPadre(item, String(columnKey))}
                  </div>
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
