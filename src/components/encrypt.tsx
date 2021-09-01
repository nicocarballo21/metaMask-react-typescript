import { useState, FC } from "react";
import Card from "../styledComponents/card";

import {
  useDecrypt,
  useEncryptt,
  usePublicKey,
} from "../customHooks/useEncrypt";

const Encrypt: FC = () => {
  const [toEncrypt, settoEncrypt] = useState("");

  const { getKey, publicKey, err } = usePublicKey();

  const encrypt = useEncryptt(publicKey);

  const decrypt = useDecrypt();
  
  const [state, set] = useState({
    encrypted: "",
    decrypted: "",
    error: "",
    publicKey: "",
  });

  async function handleEncrypt() {
    const value = await encrypt(toEncrypt);
    if (value === null) return;

    set({ ...state, encrypted: value });
  }

  async function handleDecrypt() {
    const value = await decrypt(state.encrypted);
    if (value === null) return;

    set({ ...state, decrypted: value });
  }

  return (
    <Card>
      <div>
        <p style={{ color: "white" }}>Here you can Encrypt / Decrypt</p>
        <button onClick={getKey} disabled={publicKey ? true : false}>
          {" "}
          Get encryption key{" "}
        </button>

        {/* error message */}
        {err && <p>Sorry! We can't encrypt anything without the key</p>}

        {publicKey && (
          <div>
            <p>Your encrypt key is: {publicKey}</p>
            <input
              placeholder="To encrypt.."
              onChange={({ target }) => settoEncrypt(target.value)}
            ></input>

            <button onClick={handleEncrypt}> Encrypt </button>
          </div>
        )}

        {state.encrypted && (
          <div>
            <p>Your encrypted word is: {state.encrypted} </p>
            <hr />
            <p style={{ color: "white" }}>Decrypt action:</p>

            <button onClick={handleDecrypt}> Decrypt </button>

            {state.decrypted && (
              <p> Your word decrypted is: {state.decrypted}</p>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

export default Encrypt;
