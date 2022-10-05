import useFetch from "../hooks/useFetch";
import useSendData from "../hooks/useSendData";

export const useGetLinks = (key) => useFetch('http://127.0.0.1:3000/links',key);
export const useGetMyLinks = () => useFetch('http://127.0.0.1:3000/mylinks');
export const useGetSearch = (params,order,direction,key) => useFetch(`http://127.0.0.1:3000/links?search=${params}&order=${order}&direction=${direction}`,key);

export const useLogin = () => useSendData('http://127.0.0.1:3000/users/login')
export const useNewLink = () => useSendData(`http://127.0.0.1:3000/links/`);
export const useEditLink = (id) => useSendData(`http://127.0.0.1:3000/links/${id}`);