import { useState, useEffect } from "react"
import { encrypt } from "eth-sig-util"


declare let window: any;


export default function useEncrypt( web3: any, toEncrypt: string ) {
    const [publicKey, setPublickey] = useState("")
    const [err, seterr] = useState(false)
    const [accounts, setaccounts] = useState([])
    const [encrypted, setencrypted] = useState("")
    const [decryptedWord, setdecryptedWord] = useState("")
    let functions: any = {}
    
  
 

  useEffect(() => {
    const init = async () => {
      const accounts_res = await web3.eth.getAccounts()
      setaccounts(accounts_res)
    }
    init()
  }, [web3.eth])

  const getPublicKey = async () => {
    try {
      let key = await window.ethereum.request({
        method: "eth_getEncryptionPublicKey",
        params: [accounts[0]]
      })
      setPublickey(key)

    } catch (err) {
        seterr(true)
    }
  }

  

  const encryptF = async () => {
    try {
      const encrypted = web3.utils.toHex(
        JSON.stringify(encrypt(publicKey, { data: toEncrypt }, "x25519-xsalsa20-poly1305"))
      )
      setencrypted(encrypted)
    } catch (err) {
      console.log(err)
    }
  }

  const decrypt = async () => {
    try {
      const decrypted = await window.ethereum.request({
        method: "eth_decrypt",
        params: [encrypted, accounts[0]]
      })
      setdecryptedWord(decrypted)
    } catch (err) {
        console.log(err)
    }
  }

  functions.getPublicKey = getPublicKey
  functions.encryptF = encryptF
  functions.decrypt = decrypt

  return [
    publicKey,
    err,
    decryptedWord,
    encrypted,
    functions
  ]
}
