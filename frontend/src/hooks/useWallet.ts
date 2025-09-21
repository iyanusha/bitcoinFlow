import { useState, useCallback } from "react";
import { AppConfig, showConnect, UserSession } from "@stacks/connect";

const appConfig = new AppConfig(["store_write", "publish_data"]);
const userSession = new UserSession({ appConfig });

export function useWallet() {
  const [isConnected, setIsConnected] = useState(
    userSession.isUserSignedIn()
  );

  const connect = useCallback(() => {
    showConnect({
      appDetails: {
        name: "BitcoinFlow",
        icon: "/vite.svg",
      },
      onFinish: () => {
        setIsConnected(true);
      },
      userSession,
    });
  }, []);

  const disconnect = useCallback(() => {
    userSession.signUserOut();
    setIsConnected(false);
  }, []);

  const getAddress = useCallback(() => {
    if (!isConnected) return null;
    const userData = userSession.loadUserData();
    return userData.profile.stxAddress.testnet;
  }, [isConnected]);

  return { isConnected, connect, disconnect, getAddress, userSession };
}
