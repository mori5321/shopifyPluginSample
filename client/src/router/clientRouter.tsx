import { withRouter } from "next/router";
import {
  History,
  ClientRouter as AppBridgeClientRouter,
} from "@shopify/app-bridge-react";

type Props = { router: History };
const ClientRouter = (props: Props) => {
  const { router } = props;
  return <AppBridgeClientRouter history={router} />;
};

export default withRouter(ClientRouter);
