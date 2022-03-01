import onGrouponShare from '../components/groupon-card/onGrouponShare';

Page({
  data: {
    totalPaid: 0,
    orderNo: '',
    groupId: '',
    groupon: null,
    spu: null,
    adUrl: '',
  },

  onLoad(options) {
    const {
      totalPaid = 0,
      orderNo = '',
      groupId = '',
      promotionId = '',
    } = options;
    this.setData({
      totalPaid,
      orderNo,
      groupId,
    });

    this.loadGroupon({ groupId, promotionId });
  },

  onTapReturn(e) {
    const target = e.currentTarget.dataset.type;
    const { orderNo } = this.data;
    if (target === 'home') {
      wx.switchTab({ url: '/pages/home/home' });
    } else if (target === 'orderList') {
      wx.navigateTo({
        url: `/pages/order/order-list/index?orderNo=${orderNo}`,
      });
    } else if (target === 'order') {
      wx.navigateTo({
        url: `/pages/order/order-detail/index?orderNo=${orderNo}`,
      });
    }
  },

  loadGroupon(params) {
    if (!params.groupId || !params.promotionId) {
      return;
    }
    /* httpClient
      .post(api.activity.grouponDetail, params, {
        level: EnumRequestLevel.Negligible,
      })
      .then((res) => {
        const { groups, spu } = res.data;
        this.setData({
          spu,
          groupon: groups,
        });
      }); */
  },

  onShareAppMessage: onGrouponShare,
});
