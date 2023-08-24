import { AxiosError, AxiosResponse, AxiosRequestConfig } from "axios";
import useSWR from "swr";
import {
  HttpMethods,
  HttpMethodsFilteredByPath,
  RequestPathParameters,
  RequestData,
  RequestParameters,
  ResponseData,
  UrlPaths,
} from "@/lib/api/schemaHelper";
import { BackendApiClient } from "./clients";

export type AxiosConfigWrapper<
  Path extends UrlPaths,
  Method extends HttpMethods,
> = {
  url: Path;
  method: Method & HttpMethodsFilteredByPath<Path>;
  paths: RequestPathParameters<Path, Method>;
  params?: RequestParameters<Path, Method>;
  data?: RequestData<Path, Method>;
};

export function request<Path extends UrlPaths, Method extends HttpMethods>(
  config: AxiosConfigWrapper<Path, Method>,
) {
  const { url, paths, ...baseConfig } = config;
  const requestConfig: AxiosRequestConfig = {
    ...baseConfig,
    url: Object.entries(paths ?? {}).reduce(
      (previous, [key, value]) =>
        previous.replace(new RegExp(`\\{${key}\\}`), String(value)),
      url as string,
    ),
  };
  return BackendApiClient.request<
    ResponseData<Path, Method>,
    AxiosResponse<ResponseData<Path, Method>>,
    AxiosConfigWrapper<Path, Method>["data"]
  >(requestConfig);
}

const fetcher = <Path extends UrlPaths, Method extends HttpMethods>(
  config: AxiosConfigWrapper<Path, Method>,
) => {
  return request<Path, Method>(config).then((res) => res.data);
};

export const useAppSWR = <Path extends UrlPaths, Method extends HttpMethods>(
  config: AxiosConfigWrapper<Path, Method>,
) => useSWR<ResponseData<Path, Method>, AxiosError>(config, fetcher);
