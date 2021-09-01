import { useState } from "react";
import { encrypt as ethEncrypt } from "eth-sig-util";
import { useWeb3 } from "./useWeb3";
import { createNoSubstitutionTemplateLiteral } from "typescript";

// export default function useEncrypt(web3: any, toEncrypt: string) {
//   const [publicKey, setPublickey] = useState("");
//   const [err, seterr] = useState(false);
//   const [accounts, setaccounts] = useState([]);
//   const [encrypted, setencrypted] = useState("");
//   const [decryptedWord, setdecryptedWord] = useState("");

//   const getPublicKey = async () => {
//     try {
//       let key = await window.ethereum.request({
//         method: "eth_getEncryptionPublicKey",
//         params: [accounts[0]],
//       });
//       setPublickey(key);
//     } catch (err) {
//       seterr(true);
//     }
//   };

//   const encryptF = async () => {
//     try {
//       const encrypted = web3.utils.toHex(
//         JSON.stringify(
//           encrypt(publicKey, { data: toEncrypt }, "x25519-xsalsa20-poly1305")
//         )
//       );
//       setencrypted(encrypted);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const decrypt = async () => {
//     try {
//       const decrypted = await window.ethereum.request({
//         method: "eth_decrypt",
//         params: [encrypted, accounts[0]],
//       });
//       setdecryptedWord(decrypted);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return [publicKey, err, decryptedWord, encrypted, functions];
// }

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
