import type { paths } from "./openapi.d.ts"

export namespace api {
  export type Path =
    keyof paths
  export type Method =
    | "get"
    | "post"
    | "put"
    | "delete"
  export type Req<
    M extends Method,
    P extends Path,
  > =
    & (paths[P][M] extends (
      infer Operation
        extends {
          requestBody: {
            content: {
              "application/json":
                Record<
                  string,
                  unknown
                >
            }
          }
        }
    ) ? {
        body: Operation[
          "requestBody"
        ][
          "content"
        ][
          "application/json"
        ]
      }
      : {
        body?: never
      })
    & (paths[P][M] extends (
      infer Operation
        extends {
          parameters: {
            header?: Record<
              string,
              unknown
            >
          }
        }
    ) ? Required<
        Operation[
          "parameters"
        ][
          "header"
        ]
      > extends undefined
        ? { headers?: never }
      : {
        headers: Required<
          Operation[
            "parameters"
          ][
            "header"
          ]
        >
      }
      : { headers?: never })
    & (paths[P][M] extends (
      infer Operation
        extends {
          parameters: {
            path: Record<
              string,
              unknown
            >
          }
        }
    ) ? {
        params: Operation[
          "parameters"
        ][
          "path"
        ]
      }
      : { params?: never })
    & (paths[P][M] extends (
      infer Operation
        extends {
          parameters: {
            query: Record<
              string,
              unknown
            >
          }
        }
    ) ? {
        qs: Operation[
          "parameters"
        ][
          "query"
        ]
      }
      : { qs?: never })
    & (paths[P][M] extends
      undefined | never ? {
        ERROR:
          `${M} ${P} DOES NOT EXIST!!!`
        method?: never
        endpoint?: never
      }
      : {
        method: M
        endpoint: P
      })
}