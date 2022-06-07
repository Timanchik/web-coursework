import React from 'react';
import RootStoreContext from '../contexts/RootStoreContext';

export const useRootStore = () => {
	const rootStore = React.useContext(RootStoreContext)

	if (!rootStore) {
		throw new Error('useRootStore should be used inside of RootStoreContextProvider')
	}

	return rootStore
};
