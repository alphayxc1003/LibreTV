// 广告配置和管理
class AdManager {
    constructor() {
        this.adConfig = {
            enabled: true,
            providers: {
                // Google AdSense 配置
                adsense: {
                    enabled: false,
                    clientId: 'ca-pub-XXXXXXXXXXXXXXXX', // 替换为你的 AdSense 客户端ID
                    leftSlotId: 'XXXXXXXXXX', // 左侧广告位ID
                    rightSlotId: 'XXXXXXXXXX', // 右侧广告位ID
                },
                
                // 百度联盟配置
                baidu: {
                    enabled: false,
                    leftSlotId: 'XXXXXXXX', // 左侧广告位ID
                    rightSlotId: 'XXXXXXXX', // 右侧广告位ID
                },
                
                // 360广告联盟配置
                qihoo360: {
                    enabled: false,
                    leftSlotId: 'XXXXXXXX',
                    rightSlotId: 'XXXXXXXX',
                },
                
                // 搜狗广告联盟配置
                sogou: {
                    enabled: false,
                    leftSlotId: 'XXXXXXXX',
                    rightSlotId: 'XXXXXXXX',
                },
                
                // 自定义广告配置
                custom: {
                    enabled: true,
                    leftAd: {
                        type: 'html', // 'html', 'image', 'iframe'
                        content: `
                            <div class="w-full h-full bg-gradient-to-b from-blue-900 to-purple-900 flex items-center justify-center text-white">
                                <div class="text-center p-4">
                                    <div class="text-lg font-bold mb-2">广告位</div>
                                    <div class="text-sm mb-4">左侧竖向广告</div>
                                    <div class="text-xs text-gray-300">160x600 像素</div>
                                </div>
                            </div>
                        `,
                        url: '', // 点击跳转链接
                    },
                    rightAd: {
                        type: 'html',
                        content: `
                            <div class="w-full h-full bg-gradient-to-b from-green-900 to-teal-900 flex items-center justify-center text-white">
                                <div class="text-center p-4">
                                    <div class="text-lg font-bold mb-2">广告位</div>
                                    <div class="text-sm mb-4">右侧竖向广告</div>
                                    <div class="text-xs text-gray-300">160x600 像素</div>
                                </div>
                            </div>
                        `,
                        url: '',
                    }
                }
            }
        };
    }

    // 初始化广告
    init() {
        if (!this.adConfig.enabled) return;
        
        // 检查屏幕宽度，只在大屏幕上显示广告
        if (window.innerWidth <= 1400) return;
        
        this.loadAds();
        this.bindEvents();
    }

    // 加载广告
    loadAds() {
        const leftClosed = localStorage.getItem('adClosed_left') === 'true';
        const rightClosed = localStorage.getItem('adClosed_right') === 'true';
        
        if (!leftClosed) {
            this.loadAdContent('left');
        }
        
        if (!rightClosed) {
            this.loadAdContent('right');
        }
    }

    // 加载具体广告内容
    loadAdContent(position) {
        const contentDiv = document.getElementById(position + 'AdContent');
        if (!contentDiv) return;

        // 按优先级尝试加载不同广告平台
        if (this.adConfig.providers.adsense.enabled) {
            this.loadAdSenseAd(position, contentDiv);
        } else if (this.adConfig.providers.baidu.enabled) {
            this.loadBaiduAd(position, contentDiv);
        } else if (this.adConfig.providers.qihoo360.enabled) {
            this.load360Ad(position, contentDiv);
        } else if (this.adConfig.providers.sogou.enabled) {
            this.loadSogouAd(position, contentDiv);
        } else if (this.adConfig.providers.custom.enabled) {
            this.loadCustomAd(position, contentDiv);
        }
    }

    // 加载 Google AdSense 广告
    loadAdSenseAd(position, contentDiv) {
        const config = this.adConfig.providers.adsense;
        const slotId = position === 'left' ? config.leftSlotId : config.rightSlotId;
        
        contentDiv.innerHTML = `
            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${config.clientId}" crossorigin="anonymous"></script>
            <ins class="adsbygoogle"
                 style="display:inline-block;width:160px;height:600px"
                 data-ad-client="${config.clientId}"
                 data-ad-slot="${slotId}"></ins>
            <script>
                 (adsbygoogle = window.adsbygoogle || []).push({});
            </script>
        `;
    }

    // 加载百度联盟广告
    loadBaiduAd(position, contentDiv) {
        const config = this.adConfig.providers.baidu;
        const slotId = position === 'left' ? config.leftSlotId : config.rightSlotId;
        
        contentDiv.innerHTML = `
            <script type="text/javascript">
                (window.slotbydup=window.slotbydup || []).push({
                    id: '${slotId}',
                    container: '${position}AdContent',
                    size: '160,600',
                    display: 'inlay-fix'
                });
            </script>
            <script type="text/javascript" src="//dup.baidustatic.com/js/os.js"></script>
        `;
    }

    // 加载360广告
    load360Ad(position, contentDiv) {
        const config = this.adConfig.providers.qihoo360;
        const slotId = position === 'left' ? config.leftSlotId : config.rightSlotId;
        
        // 360广告代码示例（需要根据实际情况调整）
        contentDiv.innerHTML = `
            <script type="text/javascript">
                // 360广告代码
                // 请根据360广告联盟提供的代码进行调整
            </script>
        `;
    }

    // 加载搜狗广告
    loadSogouAd(position, contentDiv) {
        const config = this.adConfig.providers.sogou;
        const slotId = position === 'left' ? config.leftSlotId : config.rightSlotId;
        
        // 搜狗广告代码示例（需要根据实际情况调整）
        contentDiv.innerHTML = `
            <script type="text/javascript">
                // 搜狗广告代码
                // 请根据搜狗广告联盟提供的代码进行调整
            </script>
        `;
    }

    // 加载自定义广告
    loadCustomAd(position, contentDiv) {
        const config = this.adConfig.providers.custom;
        const adData = position === 'left' ? config.leftAd : config.rightAd;
        
        if (adData.type === 'html') {
            contentDiv.innerHTML = adData.content;
            
            // 如果有点击链接，添加点击事件
            if (adData.url) {
                contentDiv.style.cursor = 'pointer';
                contentDiv.addEventListener('click', () => {
                    window.open(adData.url, '_blank');
                });
            }
        } else if (adData.type === 'image') {
            contentDiv.innerHTML = `<img src="${adData.content}" alt="广告" style="width:100%;height:100%;object-fit:cover;">`;
            
            if (adData.url) {
                contentDiv.style.cursor = 'pointer';
                contentDiv.addEventListener('click', () => {
                    window.open(adData.url, '_blank');
                });
            }
        } else if (adData.type === 'iframe') {
            contentDiv.innerHTML = `<iframe src="${adData.content}" style="width:100%;height:100%;border:none;"></iframe>`;
        }
    }

    // 绑定事件
    bindEvents() {
        // 监听窗口大小变化
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    // 处理窗口大小变化
    handleResize() {
        const leftBanner = document.getElementById('leftAdBanner');
        const rightBanner = document.getElementById('rightAdBanner');
        
        if (window.innerWidth <= 1400) {
            if (leftBanner) leftBanner.style.display = 'none';
            if (rightBanner) rightBanner.style.display = 'none';
            
            // 恢复页面边距
            document.body.style.marginLeft = '';
            document.body.style.marginRight = '';
            const header = document.querySelector('.player-header-fixed');
            if (header) {
                header.style.left = '';
                header.style.width = '';
            }
        } else {
            const leftClosed = localStorage.getItem('adClosed_left') === 'true';
            const rightClosed = localStorage.getItem('adClosed_right') === 'true';
            
            if (!leftClosed && leftBanner) leftBanner.style.display = 'block';
            if (!rightClosed && rightBanner) rightBanner.style.display = 'block';
        }
    }

    // 关闭广告
    closeAd(position) {
        const adBanner = document.getElementById(position + 'AdBanner');
        if (adBanner) {
            adBanner.style.display = 'none';
            localStorage.setItem('adClosed_' + position, 'true');
            
            // 如果两个广告都被关闭，恢复页面边距
            const leftClosed = localStorage.getItem('adClosed_left') === 'true';
            const rightClosed = localStorage.getItem('adClosed_right') === 'true';
            if (leftClosed && rightClosed) {
                document.body.style.marginLeft = '';
                document.body.style.marginRight = '';
                const header = document.querySelector('.player-header-fixed');
                if (header) {
                    header.style.left = '';
                    header.style.width = '';
                }
            }
        }
    }
}

// 全局广告管理器实例
window.adManager = new AdManager();

// 全局关闭广告函数（供HTML调用）
function closeAd(position) {
    window.adManager.closeAd(position);
}
