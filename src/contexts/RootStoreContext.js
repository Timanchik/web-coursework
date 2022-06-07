import { createContext } from 'react';
import RootStore from '../stores/RootStore';

const RootStoreContext = createContext(null)

export const createRootStore = () => {
    const rootStore = new RootStore()

    return rootStore
}

export default RootStoreContext
