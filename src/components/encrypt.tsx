import { useState, FC} from "react"


import Card from '../styledComponents/card'
import Button from '../styledComponents/button'
import Input from '../styledComponents/input'
import P from '../styledComponents/p'

import useEncrypt from "../customHooks/useEncrypt"

interface props {
    web3: any;
}

const Encrypt: FC<props> = ({ web3 }) => {
  const [toEncrypt, settoEncrypt] = useState("")
  const [publicKey, err, decryptedWord, encrypted, functions ] = useEncrypt(
    web3,
    toEncrypt
  )
  

  return (
    <Card >
      <div>
        <P style={{ color: "white" }}>Here you can Encrypt / Decrypt</P>
        <Button onClick={functions.getPublicKey} disabled={publicKey? true: false}> Get encryption key </Button>

        {/* error message */}
        {err && <P>Sorry! We can't encrypt anything without the key</P>}

        {publicKey && (
          <div>
            <P>Your encrypt key is: {publicKey}</P>
            <Input
              placeholder="To encrypt.."
              onChange={({ target }) => settoEncrypt(target.value)}>
            </Input>

            <Button onClick={functions.encryptF}> Encrypt </Button>
          </div>
        )}

        {encrypted && (
          <div>
            <P>Your encrypted word is: {encrypted} </P>
            <hr />
            <P style={{ color: "white" }}>Decrypt action:</P>

            <Button onClick={functions.decrypt}> Decrypt </Button>

            {decryptedWord && <P> Your word decrypted is: {decryptedWord}</P> }

          </div>
        )}
      </div>
    </Card>
  )
}

export default Encrypt
