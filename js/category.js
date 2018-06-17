var maimaibuy;
$(function(){
    manmanbuy = new Manmanbuy();
    manmanbuy.initDatas();
    manmanbuy.initmui();

})

var Manmanbuy = function(){

}
var id;
Manmanbuy.prototype = {
    initDatas:function(){ 
         
        $("body").on("tap",".things",function(){
            id = +$(this).data("id");
            $.ajax({
                url:"http://localhost:9090/api/getcategory",
                data:{"titleid":id},
                success:function(backData){
                    console.log(backData);
                    var data = backData.result;
                    var html = template("erTmp",backData);
                    $(".datas").html(html);
                }
            })  
        })      
        $.ajax({
            url:"http://localhost:9090/api/getcategorytitle",
            success:function(backData){
                var data = backData.result;                
                var html = template("listTmp",backData);
                $(".products").html(html);                                             
               
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

}