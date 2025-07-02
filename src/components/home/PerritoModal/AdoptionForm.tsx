//src/components/home/PerritoModal/AdoptionForm.tsx
import { useEffect, useRef } from "react";
import FormSuccessMessage from "./FormSuccessMessage";

interface Props {
  nombre: string;
  form: any;
  errors: any;
  onChange: React.ChangeEventHandler;
  onSubmit: React.FormEventHandler;
  loading: boolean;
  success: boolean;
}

const opcionesVivienda = ["CASA", "DEPARTAMENTO", "FINCA", "OTRO"] as const;
const opcionesTiempo = ["MUCHO", "MEDIO", "POCO"] as const;

export default function AdoptionForm({
  nombre,
  form,
  errors,
  onChange,
  onSubmit,
  loading,
  success,
}: Props) {
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (success && ref.current) {
      ref.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [success]);

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">
        Postulación para adoptar a:{" "}
        <span className="text-primary">{nombre}</span>
      </h2>

      {success && <FormSuccessMessage />}

      <form
        ref={ref}
        onSubmit={onSubmit}
        className="space-y-4 max-h-[80vh] overflow-y-auto pr-2"
      >
        <div>
          <label className="block font-medium mb-1">
            ¿Por qué te interesa este perrito?
          </label>
          <textarea
            name="comentario"
            value={form.comentario}
            onChange={onChange}
            disabled={success}
            className="w-full border rounded px-3 py-2"
            maxLength={500}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Nombre completo *</label>
          <input
            name="nombreCompleto"
            value={form.nombreCompleto}
            onChange={onChange}
            disabled={success}
            className="w-full border rounded px-3 py-2"
            maxLength={80}
          />
          {errors.nombreCompleto && (
            <p className="text-red-500 text-sm">{errors.nombreCompleto}</p>
          )}
        </div>

        <div>
          <label className="block font-medium mb-1">Teléfono *</label>
          <input
            name="telefono"
            value={form.telefono}
            onChange={onChange}
            disabled={success}
            className="w-full border rounded px-3 py-2"
            inputMode="numeric"
            maxLength={9}
            pattern="\d{9}"
          />
          {errors.telefono && (
            <p className="text-red-500 text-sm">{errors.telefono}</p>
          )}
        </div>

        <div>
          <label className="block font-medium mb-1">Dirección *</label>
          <textarea
            name="direccion"
            value={form.direccion}
            onChange={onChange}
            disabled={success}
            className="w-full border rounded px-3 py-2"
            maxLength={200}
          />
          {errors.direccion && (
            <p className="text-red-500 text-sm">{errors.direccion}</p>
          )}
        </div>

        <div>
          <label className="block font-medium mb-1">Tipo de vivienda</label>
          <select
            name="tipoVivienda"
            value={form.tipoVivienda}
            onChange={onChange}
            disabled={success}
            className="w-full border rounded px-3 py-2"
          >
            {opcionesVivienda.map((op) => (
              <option key={op} value={op}>
                {op}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap gap-4">
          <label>
            <input
              type="checkbox"
              name="tienePatios"
              checked={form.tienePatios}
              onChange={onChange}
              disabled={success}
            />{" "}
            ¿Tiene patios?
          </label>
          <label>
            <input
              type="checkbox"
              name="viveEnFamilia"
              checked={form.viveEnFamilia}
              onChange={onChange}
              disabled={success}
            />{" "}
            ¿Vive en familia?
          </label>
          <label>
            <input
              type="checkbox"
              name="otrasMascotas"
              checked={form.otrasMascotas}
              onChange={onChange}
              disabled={success}
            />{" "}
            ¿Tiene otras mascotas?
          </label>
        </div>

        <div>
          <label className="block font-medium mb-1">
            Tu experiencia con mascotas
          </label>
          <textarea
            name="experienciaMascotas"
            value={form.experienciaMascotas}
            onChange={onChange}
            disabled={success}
            className="w-full border rounded px-3 py-2"
            maxLength={300}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">
            Tiempo disponible para cuidar a una mascota
          </label>
          <select
            name="tiempoDisponible"
            value={form.tiempoDisponible}
            onChange={onChange}
            disabled={success}
            className="w-full border rounded px-3 py-2"
          >
            {opcionesTiempo.map((op) => (
              <option key={op} value={op}>
                {op}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">
            ¿Por qué deseas adoptar?
          </label>
          <textarea
            name="razonesAdopcion"
            value={form.razonesAdopcion}
            onChange={onChange}
            disabled={success}
            className="w-full border rounded px-3 py-2"
            maxLength={400}
          />
        </div>

        <button
          type="submit"
          disabled={loading || success}
          className="w-full bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition flex items-center justify-center gap-2"
        >
          {loading && (
            <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-white border-opacity-50" />
          )}
          {loading ? "Enviando..." : "Enviar solicitud"}
        </button>
      </form>
    </>
  );
}
