import { useRootStore } from "./useRootStore";

export const useUserStore = () => {
	const rootStore = useRootStore();

	return rootStore.userStore;
}
