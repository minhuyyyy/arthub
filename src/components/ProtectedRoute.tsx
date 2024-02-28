import useAuth from '../hooks/useAuth';
import { Roles } from '../types/user';

function ProtectedRoute({
    role,
    children,
}: {
    role: Roles;
    children: unknown;
}) {
    const { isAuthenticated, userInfo } = useAuth();
    if (isAuthenticated) return <>{children}</>;
    return <div>Unauthorized</div>;
}

export default ProtectedRoute;
