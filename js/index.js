$(function () {
    $('.container').fullpage({
        /*1.默认顶部对齐*/
        verticalCentered: false,
        /*2.右侧的导航*/
        navigation: true,
        /*3.配置纵向每一屏的颜色 数组*/
        sectionsColor: ["#fadd67", "#84a2d4", "#ef674d", "#ffeedd", "#d04759", "#84d9ed", "#8ac060"],
        /*4.滚完成回调 */
        afterLoad: function (link, index) {
            /*显示 更多操作区域 */
            $('.more').fadeIn();
            /*给当前的屏幕加载now执行动画*/
            /*console.log(index);
            console.log($('.section').eq(index - 1));*/
            /*console.log($(this));*/
            $(this).addClass('now');
        },
        /*5. 离开屏幕的回调 */
        onLeave: function (index,nextIndex,direction) {
            /*隐藏 更多操作区域 */
            $('.more').hide();
            /*第二屏到第三屏沙发动画*/
            if(index == 2 && nextIndex == 3){
                $('.section:eq(1) .sofa').addClass('animated');
            }else if(index == 3 && nextIndex == 4){
                $('.section:eq(2) .sofa').addClass('animated');
            }
        },
        /*6. 控制动画切换时间*/
        scrollingSpeed:1000,
        /*7. 页面架构加载完成*/
        afterRender:function () {
            /*监听第四屏购物车的动画结束事件*/
            $('.section:eq(3) .cart').on('animationend',function () {
                /*显示收货地址容器*/
                /*fadeIn([speed],[easing],[fn])  200 linear|swing callback */
                $('.section:eq(3) .address').fadeIn(500,'linear',function () {
                    $(this).find('img:eq(1)').fadeIn();
                });
                /*换个文字*/
                $('.section:eq(3) .text').find('img:eq(0)').hide();
                $('.section:eq(3) .text').find('img:eq(1)').fadeIn(500);
            });
            /*点击更多切换下一屏*/
            $('.more').on('click',function () {
                /*that 指向插件对象  插件对象没有moveSectionDown*/
                /*指向插件对象 fullpage jquery插件*/
                /*$.fn jquery提供扩展第三方方法（插件方法）的入口 */
                /*$.fn.fullpage = function(){} */
                /*$.fn.fullpage.moveSectionDown = function(){} 封装插件更多的方法*/
                $.fn.fullpage.moveSectionDown();
            });
        }
    });
});
/*需求：在页面滚动完成  当前页面的动画开始执行  更多的区域淡入（离开上一屏的时候隐藏） */
/*分析：掐时间点  js 一般都是事件，回调函数  afterLoad 滚完成回调 onLeave离开屏幕的回调 */