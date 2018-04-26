// noinspection JSAnnotator
/**
 * API接口
 */
export const apiUtil = {
      /**
       * 获取头像图片地址
       */
      HEAD_IMG_URL:"http://api.nbcei.cn:8002/api/Nbcei.Framework.Api.Impl/v1/avater/user/",

      /**
       * 用户详细信息的接口：
       */
      UserDtoQueryUrl: "api/Nbcei.Framework.Api.Impl/v1/user/details",

      /**
       * 合同，发票接口
       */
      ContractDataUrl: "api/Nbcei.Plugin.PM.Api.Impl/v1/Contract/contractinfos",

      /**
       * 项目预警 接口
       */
      LightCountUrl: "api/Nbcei.Plugin.PM.Api.Impl/v1/projectlight/LightCount",

      /**
       * 通知公告列表
       */
      ContentListQueryUrl: "api/Nbcei.Plugin.OACms.Api.Impl/v1/Content/query",

      /**
       * 常用应用接口
       */
      AppModuleCommonUrl: "api/Nbcei.Framework.Api.Impl/v1/appmodule/querycommon",

      /**
       * 所有应用接口
       */
      AppModuleAllUrl: "api/Nbcei.Framework.Api.Impl/v1/appmodule/queryall",

      /**
       * 本月寿星接口
       */
      UserHolidayUrl: "api/Nbcei.Framework.Api.Impl/v1/user/query/user/holiday",
}