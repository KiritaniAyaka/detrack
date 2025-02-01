// @ts-types="npm:@types/user-agents@1.0.4"
import UserAgent from "user-agents";
import { FetchaBuilder } from "@kiritaniayaka/fetcha";

export const fetcha = new FetchaBuilder()
  .useRequestInterceptor((info, init) => {
    init ??= {};

    // use random user agent
    init.headers ??= new Headers({
      "User-Agent": new UserAgent().toString(),
    });

    // default not follow redirect
    init.redirect ??= "manual";

    console.log(init)

    return [info, init];
  })
  .build();
