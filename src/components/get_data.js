let AV = require("leancloud-storage");
let query = new AV.Query('backstage_username');
let business_data = new AV.Query('business_data');

export {
  query,AV,business_data
}
