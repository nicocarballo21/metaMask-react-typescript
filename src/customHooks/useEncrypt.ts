import { useState } from "react";
import { encrypt as ethEncrypt } from "eth-sig-util";
import { useWeb3 } from "./useWeb3";



export function usePublicKey(): {
  publicKey: string;
  getKey: () => void;
  err: boolean;
} {
  const web3 = useWeb3();
  const [publicKey, setPublickey] = useState("");
  const [err, seterr] = useState(false);

  async function getKey() {
    try {
      const accounts = await web3.eth.getAccounts();
      const key = await window.ethereum.request<string>({
        method: "eth_getEncryptionPublicKey",
        params: [accounts[0]],
      });
      setPublickey(key);
    } catch (err) {
      seterr(true);
    }
  }

  return {
    getKey,
    publicKey,
    err,
  };
}

export function useEncryptt(publicKey: string) {
  const web3 = useWeb3();

  async function encrypt(str: string): Promise<string | null> {
    console.log(publicKey);
    try {
      return web3.utils.toHex(
        JSON.stringify(
          ethEncrypt(publicKey, { data: str }, "x25519-xsalsa20-poly1305")
        )
      );
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  return encrypt;
}

export function useDecrypt() {
  const web3 = useWeb3();

  return async (encrypted: string) => {
    try {
      const accounts = await web3.eth.getAccounts();
      return await window.ethereum.request<string>({
        method: "eth_decrypt",
        params: [encrypted, accounts[0]],
      });
    } catch (err) {
      console.log(err);
      return null;
    }
  };
}
