import useFetch from "../hooks/useFetch";
import useSendData from "../hooks/useSendData";

export const useGetLinks = (key) =>
  useFetch(`${process.env.REACT_APP_BACKEND}/links`, key);

export const useGetMyLinks = () =>
  useFetch(`${process.env.REACT_APP_BACKEND}/mylinks`);

export const useGetSearch = (params, order, direction, key) =>
  useFetch(
    `${process.env.REACT_APP_BACKEND}/links?search=${params}&order=${order}&direction=${direction}`,
    key
  );

export const useLogin = () =>
  useSendData(`${process.env.REACT_APP_BACKEND}/users/login`);
export const useNewLink = () =>
  useSendData(`${process.env.REACT_APP_BACKEND}/links/`);
export const useEditLink = (id) =>
  useSendData(`${process.env.REACT_APP_BACKEND}/links/${id}`);
export const useDeleteUser = (id) =>
  useSendData(`${process.env.REACT_APP_BACKEND}/users/${id}`);
export const useEditPass = (id) =>
  useSendData(`${process.env.REACT_APP_BACKEND}/users/${id}/password`);

export const useDeleteLink = (id) =>
  useSendData(`${process.env.REACT_APP_BACKEND}/links/${id}`);
