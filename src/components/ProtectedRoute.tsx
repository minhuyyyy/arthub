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
    userInfo.role, role;

    if (isAuthenticated && userInfo.role === role) return <>{children}</>;
    return <div>Unauthorized</div>;
}

export default ProtectedRoute;
