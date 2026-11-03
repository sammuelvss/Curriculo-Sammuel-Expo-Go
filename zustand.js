import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useStore = create(
  persist(
    (set, get) => ({
      modoEscuro: false,
      toggleModoEscuro: () => set((state) => ({ modoEscuro: !state.modoEscuro })),
      setModoEscuro: (val) => set({ modoEscuro: val }),

      perfilAtivoId: "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d",
      setPerfilAtivoId: (id) => set({ perfilAtivoId: id }),

      projetosFavoritos: [],
      toggleFavorito: (projetoId) => {
        const favoritos = get().projetosFavoritos;
        if (favoritos.includes(projetoId)) {
          set({ projetosFavoritos: favoritos.filter((id) => id !== projetoId) });
        } else {
          set({ projetosFavoritos: [...favoritos, projetoId] });
        }
      },
      isFavorito: (projetoId) => get().projetosFavoritos.includes(projetoId),
    }),
    {
      name: "curriculo-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
