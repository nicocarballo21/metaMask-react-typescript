import { useState, FC } from "react";

import Card from "../styledComponents/card";
import { useWeb3 } from "../customHooks/useWeb3";

const SendEth: FC = () => {
  const web3 = useWeb3();
  const [value, setvalue] = useState("");

  const send_eth = async () => {
    const accounts = await web3.eth.getAccounts();
    web3.eth.sendTransaction(
      {
        from: accounts[0],
        to: "0x2f318C334780961FB129D2a6c30D0763d9a5C970", // random account
        value: web3.utils.toWei(value, "ether"), // used to set the eth amount
        gas: 21000,
        gasPrice: 20000000000,
      },
      (err, res) => {
        if (err) console.log(err);
        else {
          console.log(res);
          setvalue("");
        }
      }
    );
  };

  return (
    <Card>
      <div>
        <p>Here you can simulate eth transactions</p>
        <button onClick={send_eth}> Send eth </button>
        <input
          type="text"
          placeholder="Select a eth amount to send"
          onChange={({ target }) => setvalue(target.value)}
        />
      </div>
    </Card>
  );
};

export default SendEth;
