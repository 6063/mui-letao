var maimaibuy;
$(function(){
    manmanbuy = new Manmanbuy();
    manmanbuy.initmui();
    manmanbuy.initDatas();
    manmanbuy.initActions();
    backPrePage();
})

var Manmanbuy = function(){

}
var id;
Manmanbuy.prototype = {
    initDatas:function(){ 
         $.ajax({
             url:"http://localhost:9090/api/getbaicaijiatitle",
             success:function(backData){
                 console.log(backData);
                 var html = template("oneTmp",backData);
                $(".headerLists").html(html);
             }
         });
         $.ajax({
            url:"http://localhost:9090/api/getbaicaijiaproduct",
            data:{
                "titleid":0
            },
            success:function(backData){
                console.log(backData);
                var html1 = template("twoTmp",backData);
                $(".center").html(html1);
            }
        })
       
    },
    initmui:function(){
        mui.init({
            pullRefresh: {
                container: ".mui-scroll-wrapper1", // 传入区域滚动父容器的选择器
                down: {                   
                    callback: function() {//下拉刷新的回调函数
                        setTimeout(function() {
                            // 延迟1.5秒结束下拉刷新
                            mui('.mui-scroll-wrapper1').pullRefresh().endPulldownToRefresh();
                        }, 1500)
                    }
                },
                up: {
                	contentnomore:'再下实在给不了更多...',
                    callback: function() {//上拉加载的回调函数
           				// 延迟1.5秒结束上拉加载更多  
           				setTimeout(function() {
                            mui('.mui-scroll-wrapper1').pullRefresh().endPulldownToRefresh();
                        }, 1500)
                    }
                }
            }
        });
    },
    initActions:function(){
        $(".headerLists").on("tap",'.headerLists a',function(){
            var id = $(this).data("id");
            $(this).addClass("yanse").siblings().removeClass('yanse');
            // 点击相应a标签颜色变红，并且下方出现相应的信息
            $.ajax({
                url:"http://localhost:9090/api/getbaicaijiaproduct",
                data:{
                    "titleid":id
                },
                success:function(backData){
                    console.log(backData);
                    var html1 = template("twoTmp",backData);
                    $(".center").html(html1);
                }
            })
            
        })
    }
}

function backPrePage(){
    $("body").on('tap','.backPrePage',function(){
        window.history.go(-1);
    })
}