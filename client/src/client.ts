import { createThirdwebClient } from "thirdweb";

export const client = createThirdwebClient({
  clientId: import.meta.env.VITE_THIRDWEB_CLIENT_ID!,
});
import { polygon, sepolia } from "thirdweb/chains";
export const chain = sepolia;