import { useState, FC } from "react"
import Card from '../styledComponents/card'

import useEncrypt from "../customHooks/useEncrypt"

interface props {
  web3: any;
}

const Encrypt: FC<props> = ({ web3 }) => {
  const [toEncrypt, settoEncrypt] = useState("")
  const [publicKey, err, decryptedWord, encrypted, functions] = useEncrypt(
    web3,
    toEncrypt
  )

  return (
    <Card >
      <div>
        <p style={{ color: "white" }}>Here you can Encrypt / Decrypt</p>
        <button onClick={functions.getPublicKey} disabled={publicKey ? true : false}> Get encryption key </button>

        {/* error message */}
        {err && <p>Sorry! We can't encrypt anything without the key</p>}

        {publicKey && (
          <div>
            <p>Your encrypt key is: {publicKey}</p>
            <input
              placeholder="To encrypt.."
              onChange={({ target }) => settoEncrypt(target.value)}>
            </input>

            <button onClick={functions.encryptF}> Encrypt </button>
          </div>
        )}

        {encrypted && (
          <div>
            <p>Your encrypted word is: {encrypted} </p>
            <hr />
            <p style={{ color: "white" }}>Decrypt action:</p>

            <button onClick={functions.decrypt}> Decrypt </button>

            {decryptedWord && <p> Your word decrypted is: {decryptedWord}</p>}

          </div>
        )}
      </div>
    </Card>
  )
}

export default Encrypt
