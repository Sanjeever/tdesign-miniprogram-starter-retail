// export enum CouponCardStatus {
//   /** 普通 */
//   default = "default",
//   /** 不可用 */
//   useless = "useless",
//   /** 禁用 */
//   disabled = "disabled",
// }
// export enum CouponCardType {
//   /** 折扣 */
//   discount = "discount",
//   /** 满减（其他） */
//   price = "price",
// }
// export interface CouponCard {
//   /** key */
//   key: string;
//   /** 优惠券状态 */
//   status: CouponCardStatus;
//   /** 优惠券类型 */
//   type: CouponCardType;
//   /** 折扣或者满减值 */
//   value: string;
//   /** 标签 */
//   tag: string;
//   /** 描述 */
//   desc: string;
//   /** 标题 */
//   title: string;
//   /** 有效时间限制 */
//   timeLimit: string;
//   /** 货币符号 */
//   currency: string;
// }

/**
 * 优惠券
 *
 * @typedef {'default'|'useless'|'disabled'} CouponCardStatus
 * @typedef {'discount'|'price'} CouponCardType
 *
 * @param {number} [id]
 * @param {CouponCardStatus} [status]
 * @param {CouponCardType} [type]
 */
export function getCoupon(
  id = 0,
  status = 'default',
  type = id % 2 === 1 ? 'discount' : 'price',
) {
  return {
    /** key */
    key: `${id}`,
    /** 优惠券状态 */
    status,
    /** 优惠券类型 */
    type,
    /** 折扣或者满减值 */
    value: type === 'discount' ? 5.5 : 18,
    /** 标签 */
    tag: '',
    /** 描述 */
    desc: parseInt(id) > 0 ? `满${parseInt(id) * 100}元可用` : '无门槛使用',
    /** 订单底价,满n元 */
    base: 1000 * (parseInt(id) || 0),
    /** 标题 */
    title: type === 'discount' ? `生鲜折扣券 - ${id}` : `生鲜满减券 - ${id}`,
    /** 有效时间限制 */
    timeLimit: '2019.11.18至2038.12.18',
    /** 货币符号 */
    currency: '¥',
  };
}

/** 优惠券列表 */
export function getCouponList(status = 'default', length = 10) {
  return new Array(length).fill(0).map((_, idx) => getCoupon(idx, status));
}
