import { Suspense } from 'react';
import Loading from './Loading';

const AppSuspense = ({ children }: { children: JSX.Element }) => {
    return <Suspense fallback={<Loading />}>{children}</Suspense>;
};

export default AppSuspense;
