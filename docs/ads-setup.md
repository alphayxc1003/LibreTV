# 竖向广告条幅配置指南

## 📋 概述

LibreTV 播放器页面支持在浏览器左右两侧显示竖向广告条幅，标准尺寸为 160x600 像素。广告仅在大屏幕设备（宽度 > 1400px）上显示，确保移动端用户体验不受影响。

## 🎯 支持的广告平台

### 1. Google AdSense
**推荐指数**: ⭐⭐⭐⭐⭐
- **优点**: 全球最大的广告平台，收益稳定，支持多种广告格式
- **缺点**: 审核严格，需要一定流量才能获得较好收益
- **竖向广告尺寸**: 160x600 (Wide Skyscraper)

### 2. 百度联盟
**推荐指数**: ⭐⭐⭐⭐
- **优点**: 中文网站首选，本土化程度高，审核相对宽松
- **缺点**: 主要面向中文用户，国际化程度较低
- **竖向广告尺寸**: 160x600

### 3. 360广告联盟
**推荐指数**: ⭐⭐⭐
- **优点**: 国内知名广告平台，与360产品生态结合
- **缺点**: 覆盖面相对较小

### 4. 搜狗广告联盟
**推荐指数**: ⭐⭐⭐
- **优点**: 搜索引擎背景，广告质量较好
- **缺点**: 市场份额相对较小

## ⚙️ 配置方法

### 步骤1: 编辑广告配置文件

打开 `js/ads.js` 文件，找到 `adConfig` 对象：

```javascript
this.adConfig = {
    enabled: true, // 设置为 false 可完全禁用广告
    providers: {
        // 在这里配置你的广告平台
    }
};
```

### 步骤2: 配置 Google AdSense

1. 注册 [Google AdSense](https://www.google.com/adsense/) 账户
2. 创建两个 160x600 的广告单元
3. 获取客户端ID和广告位ID
4. 更新配置：

```javascript
adsense: {
    enabled: true, // 启用 AdSense
    clientId: 'ca-pub-1234567890123456', // 你的客户端ID
    leftSlotId: '1234567890', // 左侧广告位ID
    rightSlotId: '0987654321', // 右侧广告位ID
},
```

### 步骤3: 配置百度联盟

1. 注册 [百度联盟](https://union.baidu.com/) 账户
2. 创建两个 160x600 的广告位
3. 获取广告位ID
4. 更新配置：

```javascript
baidu: {
    enabled: true, // 启用百度联盟
    leftSlotId: '12345678', // 左侧广告位ID
    rightSlotId: '87654321', // 右侧广告位ID
},
```

### 步骤4: 配置自定义广告

如果你有直接的广告商或想显示自定义内容：

```javascript
custom: {
    enabled: true,
    leftAd: {
        type: 'html', // 'html', 'image', 'iframe'
        content: `<div>你的HTML内容</div>`,
        url: 'https://example.com', // 点击跳转链接（可选）
    },
    rightAd: {
        type: 'image',
        content: 'https://example.com/ad-image.jpg',
        url: 'https://example.com',
    }
}
```

## 🎨 广告类型说明

### HTML 广告
```javascript
{
    type: 'html',
    content: `
        <div class="custom-ad">
            <h3>广告标题</h3>
            <p>广告内容</p>
            <button>点击按钮</button>
        </div>
    `,
    url: 'https://example.com'
}
```

### 图片广告
```javascript
{
    type: 'image',
    content: 'https://example.com/banner-160x600.jpg',
    url: 'https://example.com'
}
```

### iframe 广告
```javascript
{
    type: 'iframe',
    content: 'https://example.com/ad-frame.html'
}
```

## 📱 响应式设计

广告系统自动处理响应式显示：

- **大屏幕 (>1400px)**: 显示左右两侧广告
- **中小屏幕 (≤1400px)**: 自动隐藏广告，确保内容正常显示
- **用户关闭**: 记住用户偏好，下次访问时保持关闭状态

## 🔧 高级配置

### 禁用特定位置的广告

```javascript
// 只显示左侧广告
loadAdContent('left');

// 只显示右侧广告  
loadAdContent('right');
```

### 动态切换广告

```javascript
// 运行时切换广告提供商
window.adManager.adConfig.providers.adsense.enabled = false;
window.adManager.adConfig.providers.baidu.enabled = true;
window.adManager.loadAds();
```

### 广告加载优先级

系统按以下优先级加载广告：
1. Google AdSense
2. 百度联盟
3. 360广告联盟
4. 搜狗广告联盟
5. 自定义广告

## ⚠️ 注意事项

1. **合规性**: 确保广告内容符合当地法律法规
2. **用户体验**: 避免过于闪烁或干扰性的广告
3. **加载性能**: 广告加载不应影响视频播放性能
4. **广告屏蔽**: 考虑广告屏蔽器的影响，提供备用方案
5. **隐私政策**: 更新网站隐私政策，说明广告使用情况

## 🚀 最佳实践

1. **测试不同平台**: 比较不同广告平台的收益和用户体验
2. **A/B测试**: 测试不同广告位置和样式的效果
3. **监控性能**: 定期检查广告对页面加载速度的影响
4. **用户反馈**: 收集用户对广告的反馈，适时调整策略
5. **收益优化**: 根据数据分析优化广告配置

## 📊 收益预期

竖向广告条幅的收益取决于多个因素：

- **流量质量**: 用户停留时间、互动率
- **地理位置**: 不同地区的广告价值差异较大
- **内容类型**: 视频内容的受众群体
- **广告平台**: 不同平台的分成比例和竞价机制

一般来说，160x600 的竖向广告位是较为优质的广告位置，具有较好的可见性和点击率。

## 🛠️ 故障排除

### 广告不显示
1. 检查屏幕宽度是否大于1400px
2. 确认广告配置是否正确
3. 检查浏览器控制台是否有错误信息
4. 验证广告平台的审核状态

### 广告影响页面布局
1. 检查CSS样式是否正确加载
2. 确认响应式断点设置
3. 测试不同屏幕尺寸下的显示效果

### 广告加载缓慢
1. 优化广告代码，使用异步加载
2. 考虑使用CDN加速
3. 设置广告加载超时机制
