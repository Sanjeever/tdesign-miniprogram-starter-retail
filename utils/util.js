import dayjs from 'dayjs';

const formatTime = (date, template) => dayjs(date).format(template);

/**
 * 格式化价格数额为字符串
 * 可对小数部分进行填充，默认不填充
 * @param price 价格数额，以分为单位!
 * @param fill 是否填充小数部分 0-不填充 1-填充第一位小数 2-填充两位小数
 */
function priceFormat(price, fill = 0) {
  if (isNaN(price) || price === null || price === Infinity) {
    return price;
  }
  price = Math.round(parseFloat(price + '') * 10 ** 8) / 10 ** 8; // 恢复精度丢失
  price = Math.ceil(price) / 100 + ''; // 向上取整，单位转换为元，转换为字符串
  if (fill > 0) {
    // 补充小数位数
    if (price.indexOf('.') == -1) {
      price = price + '.';
    }
    const n = fill - price.split('.')[1].length;
    for (let i = 0; i < n; i++) {
      price = price + '0';
    }
  }
  return price;
}

/**
 * 获取cdn裁剪后链接
 *
 * @param {string} url 基础链接
 * @param {number} width 宽度，单位px
 * @param {number} [height] 可选，高度，不填时与width同值
 */
const cosThumb = (url, width, height = width) => {
  if (url.indexOf('?') > -1) {
    return url;
  }

  if (url.indexOf('http://') === 0) {
    url = url.replace('http://', 'https://');
  }

  return url + '?imageMogr2/thumbnail/' + ~~width + 'x' + ~~height;
};

const get = (source, paths, defaultValue) => {
  if (typeof paths === 'string') {
    paths = paths
      .replace(/\[/g, '.')
      .replace(/\]/g, '')
      .split('.')
      .filter(Boolean);
  }
  const { length } = paths;
  let index = 0;
  while (source != null && index < length) {
    source = source[paths[index++]];
  }
  return source === undefined || index === 0 ? defaultValue : source;
};
let systemWidth = 0;
let pixelRatio = 0;
/** 获取系统宽度，为了减少启动消耗所以在函数里边做初始化 */
export const loadSystemWidth = () => {
  if (systemWidth) {
    return systemWidth;
  }

  try {
    ({ screenWidth: systemWidth, pixelRatio } = wx.getSystemInfoSync());
  } catch (e) {
    systemWidth = 0;
  }
  return systemWidth;
};

/**
 * 转换rpx为px
 *
 * @description
 * 什么时候用？
 * - 布局(width: 172rpx)已经写好, 某些组件只接受px作为style或者prop指定
 *
 */
const rpx2px = (rpx, round = false) => {
  loadSystemWidth();

  // px / systemWidth = rpx / 750
  const result = (rpx * systemWidth) / 750;

  if (round) {
    return Math.floor(result);
  }

  return result;
};

module.exports = {
  formatTime,
  priceFormat,
  cosThumb,
  get,
  rpx2px,
};
