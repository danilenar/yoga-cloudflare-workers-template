import { YogaInitialContext } from "graphql-yoga";
import { fetchAdminApi } from "../helpers";

//yoga context plus extended context via useExtendedContext plugin
export type Context = YogaInitialContext & {
  fetchAdminApi: ReturnType<typeof fetchAdminApi>;
};
