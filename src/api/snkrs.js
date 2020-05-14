import axios from 'axios'

const api = {
  launch: 'https://api.nike.com/product_feed/threads/v2/?anchor=0&count=36&filter=marketplace%28CN%29&filter=language%28zh-Hans%29&filter=inStock%28true%29&filter=productInfo.merchPrice.discounted%28false%29&filter=channelId%28010794e5-35fe-4e32-aaff-cd2c74f89d61%29&filter=exclusiveAccess%28true%2Cfalse%29&fields=active%2Cid%2ClastFetchTime%2CproductInfo%2CpublishedContent.nodes%2CpublishedContent.properties.coverCard%2CpublishedContent.properties.productCard%2CpublishedContent.properties.products%2CpublishedContent.properties.publish.collections%2CpublishedContent.properties.relatedThreads%2CpublishedContent.properties.seo%2CpublishedContent.properties.threadType%2CpublishedContent.properties.custom%2CpublishedContent.properties.title'
}
export function getLaunch (id) {
  return axios({
    url: api.launch,
    method: 'get'
  })
}
