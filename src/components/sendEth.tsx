import { useState, FC} from "react"

import Card from '../styledComponents/card'
import P from '../styledComponents/p'
import Button from '../styledComponents/button'
import Input from '../styledComponents/input'

interface props {
  web3: any;
}

const SendEth: FC<props> = ({ web3 }) => {
  const [value, setvalue] = useState('')

  const send_eth = async () => {
    const accounts = await web3.eth.getAccounts()
    web3.eth.sendTransaction(
      {
        from: accounts[0],
        to: "0x2f318C334780961FB129D2a6c30D0763d9a5C970", // random account
        value: web3.utils.toWei(value, "ether"), // used to set the eth amount
        gas: 21000,
        gasPrice: 20000000000
      },
      (err: any, res: any) => {
        if (err) console.log(err)
        else {
          console.log(res)
          setvalue('')
        }
      }
    )
  }

  return (
    <Card >
      <div>
        <P>Here you can simulate eth transactions</P>
        <Button  onClick={send_eth}> Send eth </Button>
        <Input 
            type='text' 
            placeholder="Select a eth amount to send" 
            onChange={({target}) => setvalue(target.value)}>
        </Input>
      </div>
    </Card>
  )
}

export default SendEth
