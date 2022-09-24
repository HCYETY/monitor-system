import { userInform } from '@config';

export const getBasicParams = {
  appId: userInform.appId,
  userID: userInform.userId,
  startTime: new Date().getTime(),
  pageUrl: window.location.href,
}

export enum EntryTypes {
  paint = 'paint',
  navigation = 'navigation',
  resource = 'resource',
  LCP = 'largest-contentful-paint',
  FID = 'first-input',
  CLS = 'layout-shift',
}
export enum PerformanceInfoType {
  CLS = 'cumulative-layout-shift',
  NT = 'navigation-timing',
  FP = 'first-paint',
  FCP = 'first-contentful-paint',
  LCP = 'largest-contentful-paint',
  FID = 'first-input-delay',
  RF = 'resource-flow',
}
