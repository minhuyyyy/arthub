import { Suspense } from 'react';
import Loading from './Loading';

const AppSuspense = ({ children }) => {
    return <Suspense fallback={<Loading />}>{children}</Suspense>;
};

export default AppSuspense;
