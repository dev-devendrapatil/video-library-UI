import APIService from "./api.service";

const feedService = {
    getFeed:(pageNumber)=>APIService.get(`feed/${pageNumber}`)
}
export default  feedService