import { constant } from "@/utils/constant";
import { getLocalObject } from "@/utils/localHandler";


const useAuth = () => {
    const tokenStorage = getLocalObject(constant.STROAGE_TOKEN);
    if (!tokenStorage) return { auth: false };
    const { accessToken, isAuthenticated } = tokenStorage;
    return { auth: !!accessToken && isAuthenticated };
  };
  export default useAuth;