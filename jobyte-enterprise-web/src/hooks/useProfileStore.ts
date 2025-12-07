import { Enterprise } from "@/types/Enterprise";
import { SimpleProfile } from "@/types/SimpleProfile";
import { create } from "zustand";

interface ProfileStore {
  profileSimple: SimpleProfile | undefined;
  loading: boolean
  setProfile: (profile: Enterprise | null) => void;
  startLoading: () => void;
  clearProfile: () => void;
}

export const useProfileStore = create<ProfileStore>((set) => ({
  profileSimple: undefined,
  loading: true,
  setProfile: profileSimple => set({ profileSimple: profileSimple ?? undefined, loading: false }),
  startLoading: () => set({ loading: true, profileSimple: undefined }),
  clearProfile: () => set({ profileSimple: undefined, loading: false }),
}));