import APIService from "./api.service"

const subscriptionAPI = {
      toggleChannelSubscribe:(videoId)=>APIService.post(`subscription/${videoId}`),
      getAllSubscribedChannel:()=>APIService.get('subscription/subscribedChannels'),
      isUserSubscribed:(channelId)=>APIService.get(`subscription/isSubscribed/${channelId}`),


}
export default subscriptionAPI