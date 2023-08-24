import { paths } from "./types";
import { UnionToIntersection, Get } from "type-fest";
import {
  ExtractPathParams,
  ExtractReqQuery,
  ExtractReqData,
  ExtractResData,
} from "@/common/types/api";

export type UrlPaths = keyof paths;
export type HttpMethods = keyof UnionToIntersection<paths[keyof paths]>;
export type HttpMethodsFilteredByPath<Path extends UrlPaths> = HttpMethods &
  keyof UnionToIntersection<paths[Path]>;

export type RequestPathParameters<
  Path extends UrlPaths,
  Method extends HttpMethods,
> = ExtractPathParams<Get<paths, `${Path}.${Method}`>>;

export type RequestParameters<
  Path extends UrlPaths,
  Method extends HttpMethods,
> = ExtractReqQuery<Get<paths, `${Path}.${Method}`>>;

export type RequestData<
  Path extends UrlPaths,
  Method extends HttpMethods,
> = ExtractReqData<Get<paths, `${Path}.${Method}`>>;

export type ResponseData<
  Path extends UrlPaths,
  Method extends HttpMethods,
> = ExtractResData<Get<paths, `${Path}.${Method}`>>;
