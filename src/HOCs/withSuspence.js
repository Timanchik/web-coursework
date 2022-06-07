import { LinearProgress } from '@mui/material';
import { Suspense } from 'react';

const withSuspense = (Component) => (props) => (
	<Suspense fallback={<LinearProgress />}>
		<Component {...props}/>
	</Suspense>
)

export default withSuspense
