import { useCallback, useState } from 'react';

const useSetState = (defaultState = {}) => {
	const [state, set] = useState(defaultState)
	const setState = useCallback(
		patch => {
			set(prevState => ({
				...prevState,
				...(patch instanceof Function ? patch(prevState) : patch),
			}));
		},
		[set],
	)
	return [state, setState]
}

export default useSetState;
