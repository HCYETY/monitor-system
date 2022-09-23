import { lazyReport } from "./index";

// 手动上报错误
export default function tracker(actionType, data) {
  lazyReport('action', {
    actionType,
    data,
  })
};
