import React from 'react';
import RootStoreContext, { createRootStore } from '../contexts/RootStoreContext'

const StoresProvider = ({ children }) => {
	return <RootStoreContext.Provider value={createRootStore()}>{children}</RootStoreContext.Provider>
}

export default StoresProvider
