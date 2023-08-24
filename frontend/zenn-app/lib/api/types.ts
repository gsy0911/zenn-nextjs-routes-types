import { ApiParams } from "@/common/types/api";

type GetUserHandler = ApiParams<
  {},
  { id: string },
  {},
  { status: string; id: string; name: string }
>;

type PostUserHandler = ApiParams<
  {},
  {},
  { name: string },
  { status: string; id: string; name: string }
>;

type PutUserHandler = ApiParams<
  {},
  {},
  { id: string; name: string },
  { status: string; id: string; name: string }
>;

type DeleteUserHandler = ApiParams<
  {},
  {},
  { id: string },
  { status: string; id: string; name: string }
>;

type GetUserPathParamHandler = ApiParams<
  { userId: string },
  { id: string },
  {},
  { status: string; id: string; name: string }
>;

export interface paths {
  // これらのメソッドは、`/user`というパスに対応しているという想定
  "/user": {
    GET: GetUserHandler;
    POST: PostUserHandler;
    PUT: PutUserHandler;
    DELETE: DeleteUserHandler;
  };
  // 補完の例として適当なパスを追加（/v1/[...slug].tsで受ける）
  "/v1/user/book": {
    GET: GetUserHandler;
  };
  "/v1/user/payment": {
    GET: GetUserHandler;
  };
  "/v1/user/balance": {
    GET: GetUserHandler;
  };
  "/v1/user/{userId}/balance": {
    GET: GetUserPathParamHandler;
  };
}
