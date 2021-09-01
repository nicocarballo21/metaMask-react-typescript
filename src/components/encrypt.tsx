import { useState, FC } from "react";
import Card from "../styledComponents/card";
import Button from "../styledComponents/button";
import Input from "../styledComponents/input";
import P from "../styledComponents/p";

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
        <P style={{ color: "white" }}>Here you can Encrypt / Decrypt</P>
        <Button onClick={getKey} disabled={publicKey ? true : false}>
          {" "}
          Get encryption key{" "}
        </Button>

        {/* error message */}
        {err && <P>Sorry! We can't encrypt anything without the key</P>}

        {publicKey && (
          <div>
            <P>Your encrypt key is: {publicKey}</P>
            <Input
              placeholder="To encrypt.."
              onChange={({ target }) => settoEncrypt(target.value)}
            ></Input>

            <Button onClick={handleEncrypt}> Encrypt </Button>
          </div>
        )}

        {state.encrypted && (
          <div>
            <P>Your encrypted word is: {state.encrypted} </P>
            <hr />
            <P style={{ color: "white" }}>Decrypt action:</P>

            <Button onClick={handleDecrypt}> Decrypt </Button>

            {state.decrypted && (
              <P> Your word decrypted is: {state.decrypted}</P>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

export default Encrypt;
