import useStatusNetwork from "../customHooks/useStatusNetwork"



const Status = () => {
  const [getNetworkId, getChainId] = useStatusNetwork()

  return (
    <div>
      <button onClick={getNetworkId}> Network ID </button>
      <button onClick={getChainId}> Chain ID </button>
    </div>
  )
}

export default Status
