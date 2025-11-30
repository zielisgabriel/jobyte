import { Enterprise } from "@/types/Enterprise";
import { create } from "zustand";

interface ProfileStore {
  profile: Enterprise | undefined;
  loading: boolean
  setProfile: (profile: Enterprise | null) => void;
  startLoading: () => void;
  clearProfile: () => void;
}

export const useProfileStore = create<ProfileStore>((set) => ({
  profile: undefined,
  loading: true,
  setProfile: profile => set({ profile: profile ?? undefined, loading: false }),
  startLoading: () => set({ loading: true, profile: undefined }),
  clearProfile: () => set({ profile: undefined, loading: false }),
}));