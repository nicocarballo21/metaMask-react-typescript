
declare let window: any;
const useStatusNetwork = () => {
  const getNetworkId = async () => {
    try {
      const _id = await window.ethereum.request({
        method: "net_version"
      })
      window.alert(`Your network id is: --> ${_id}`)
    } catch (err) {
      console.log(err)
    }
  }
  const getChainId = async () => {
    try {
      const _id = await window.ethereum.request({
        method: "eth_chainId"
      })
      window.alert(`Your currently configured chain id is: --> ${_id}`)
    } catch (err) {
      console.log(err)
    }
  }

  return [getNetworkId, getChainId]
}

export default useStatusNetwork
