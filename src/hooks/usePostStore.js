import { useRootStore } from "./useRootStore";

export const usePostStore = () => {
	const rootStore = useRootStore();

	return rootStore.postStore;
}
