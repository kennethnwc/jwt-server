import { MiddlewareFn } from "type-graphql";
import { MyContext } from "./MyContext";
import { verify } from "jsonwebtoken";

// beaer 231312322222

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  const authorization = context.req.headers["authorization"];

  if (!authorization) {
    throw new Error("not authorized");
  }

  try {
    const token = authorization.split(" ")[1];
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    context.payload = payload as any;
  } catch (err) {
    console.log(err);
    throw new Error("not authorized");
  }

  return next();
};
