var maimaibuy;
$(function(){
    manmanbuy = new Manmanbuy();
    manmanbuy.initDatas();
    manmanbuy.initmui();
    manmanbuy.bindClick();
})

var Manmanbuy = function(){

}

Manmanbuy.prototype = {
    initDatas:function(){
        $.ajax({
            url:"http://localhost:9090/api/getcoupon",
            success:function(backData){                
                console.log(backData);                
                var html = template("contents",backData);
                console.log(html);
               $(".datas").html(html);
            }
        })
    },
    initmui:function(){
        mui.init({
            pullRefresh: {
                container: ".mui-scroll-wrapper", // 传入区域滚动父容器的选择器
                down: {                   
                    callback: function() {//下拉刷新的回调函数
                        setTimeout(function() {
                            // 延迟1.5秒结束下拉刷新
                            mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
                        }, 1500)
                    }
                },
                up: {
                	contentnomore:'再下实在给不了更多...',
                    callback: function() {//上拉加载的回调函数
           				// 延迟1.5秒结束上拉加载更多  
           				setTimeout(function() {
                            mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
                        }, 1500)
                    }
                }
            }
        });
    },
    bindClick:function(){
        $(".datas").on("tap",'.datas li',function(){
            console.log(1);
            var id = $(this).data("id");
            var nameA = $(this).data('name');
            window.location.href = './youhuiDetail.html?id='+id+'&&name='+nameA;
        })
    }
}

