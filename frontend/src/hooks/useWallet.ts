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
    const isMainnet = import.meta.env.VITE_NETWORK === "mainnet";
    return isMainnet
      ? userData.profile.stxAddress.mainnet
      : userData.profile.stxAddress.testnet;
  }, [isConnected]);

  return { isConnected, connect, disconnect, getAddress, userSession };
}

export function getStxBalance(address: string): Promise<number> {
  const isMainnet = import.meta.env.VITE_NETWORK === "mainnet";
  const baseUrl = isMainnet
    ? "https://api.mainnet.hiro.so"
    : "https://api.testnet.hiro.so";
  return fetch(`${baseUrl}/extended/v1/address/${address}/balances`)
    .then(res => res.json())
    .then(data => parseInt(data.stx?.balance || '0'))
    .catch(() => 0);
}
