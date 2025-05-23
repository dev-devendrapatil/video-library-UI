import APIService from "./api.service"

const subscriptionAPI = {
      toggleChannelSubscribe:(videoId)=>APIService.post(`subscription/${videoId}`)

}
export default subscriptionAPI