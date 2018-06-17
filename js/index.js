var maimaibuy;
$(function(){
    manmanbuy = new Manmanbuy();
    manmanbuy.initDatas();
    manmanbuy.initmui();
    manmanbuy.initIntro();
    liClick();

})
function liClick(){
    $("body").on("tap",'#nav .mui-col-xs-3',function(){

        var href = $(this).children('a').attr('href');
        console.log(href);
        window.location = href;
    })
}

var Manmanbuy = function(){

}

Manmanbuy.prototype = {
    initDatas:function(){
        $("#nav").on("tap",".teshu",function(){
            $("#nav").height() == 300 ? $("#nav").css({height:200}) :  $("#nav").css({height:300});           
        });
        $.ajax({
            url:"http://localhost:9090/api/getindexmenu",
            success:function(backData){
                console.log(backData);
                var result = template("priceTmp",backData.result);
                console.log(result);
                $(".menus .mui-row").html(result);
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
    initIntro:function(){
        $.ajax({
            url:"http://localhost:9090/api/getmoneyctrl",
            success:function(data){
                console.log(data.result);
                var result = template("introTmp",data.result);
                // console.log(result);
                $("#main .introduce .mui-table-view").html(result);
                $("#main ul img").addClass("mui-media-object mui-pull-left");
            }
        })
    }
}