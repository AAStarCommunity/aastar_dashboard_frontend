// 管理接口
enum API {
  /**
   * 获取今日房屋概述数据
   * api:/api/house/getSummaryData
   * method： get
   * 参数：null
   * 返回值： code   message   data
   * 返回值说明:
   * addToday: 今日新增 | houseSum: 房屋总数 | rented: 已出租 | notLet: 未出租
   */ GET_HOUSE_SUMMARYDATA_API = "/api/house/getSummaryData",
}
export default API;
