import type { NextApiRequest, NextApiResponse } from "next";
export interface Data<T> {
  data: T;
}

export interface Error {
  error: {
    httpStatus: number;
    message: string;
  };
}

export type ApiParams<P = any, Q = any, B = any, R = any> = (
  // 正確には`path`をOmitする必要はないですが、今後のことも考えてこうしています。
  req: Omit<NextApiRequest, "body" | "query" | "path"> & {
    query: Partial<Q>;
    body?: B;
    path?: P;
  },
  res: NextApiResponse<Data<R> | Error>,
) => void | Promise<void>;

export type ExtractReqQuery<T> = T extends ApiParams<any, infer I, any, any>
  ? I
  : never;
export type ExtractReqData<T> = T extends ApiParams<any, any, infer I, any>
  ? I
  : never;
export type ExtractResData<T> = T extends ApiParams<any, any, any, infer I>
  ? I
  : never;
export type ExtractPathParams<T> = T extends ApiParams<infer I, any, any, any>
  ? I
  : never;
