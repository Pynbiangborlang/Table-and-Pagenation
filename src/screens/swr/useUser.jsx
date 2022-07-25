import useSwr from "swr";
import axios from "axios";

const fetcher = (args) => axios.get(args).then((res) => res.data);
export const useFetch = (url) => {
  const { data, error } = useSwr(url, fetcher);

  return { data, error };
};
