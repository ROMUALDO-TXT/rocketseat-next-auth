import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

type UseCanParams = {
    permissions?:string[];
    roles?:string[];
}

export default function useCan({permissions, roles}: UseCanParams){
    const {user, isAuthenticated} = useContext(AuthContext);

    if(!isAuthenticated){
        return false;
    }

    if(permissions && permissions?.length > 0){
        const hasAllPermissions = permissions?.some(permission => {
            return user?.permissions?.includes(permission);
        })

        if(!hasAllPermissions){
            return false;
        }
    }

    if(roles && roles?.length > 0){
        const hasAllRoles = roles?.every(role => {
            return user?.roles?.includes(role);
        })
        if(!hasAllRoles){
            return false;
        }
    }
    return true;
}