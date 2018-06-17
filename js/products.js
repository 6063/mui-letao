var maimaibuy;
$(function(){
    manmanbuy = new Manmanbuy();
    manmanbuy.initDatas();
    manmanbuy.initmui();
    manmanbuy.initProducts();
    manmanbuy.pageAction();

})

var Manmanbuy = function(){

}
var id;
var titleId;
var page = 1;
var total;
Manmanbuy.prototype = {
    initDatas:function(){
        id = getQueryString("id");
        console.log(id);
        $.ajax({
            url:"http://localhost:9090/api/getcategorybyid",
            data:{
                "categoryid":id
            },
            success:function(backData){                
                console.log(backData);                
               var html = template("firstTmp",backData.result);
            //    console.log(html);
               $(".title").html(html);
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
    initProducts:function(){
        console.log(page);
        $.ajax({
            url:"http://localhost:9090/api/getproductlist",
            data:{
                "categoryid" :id,
                "pageid ":page
            },
            success:function(backData){
                console.log(backData);
                var html = template("secondTmp",backData);
                $(".productBox").html(html);
                $("#main .productBox img").addClass("mui-media-object mui-pull-left");
                var arr=[];
                for(var i = 1;i<=backData.totalCount;i++){
                    arr[i-1] = i;
                }
                backData.arr = arr;
                total = backData.totalCount;
                // console.log(backData.totalCount);
                var html2 = template("thirdTmp",backData);
                // console.log(html2); 
                $("#selectPage").html(html2);
            }
        })
    },
    // 页码操作
     // 分页事件
     pageAction:function(){
        // 返回前一页
        $("body").on("click",'.before',function(){
            // console.log(1);
            if(page == 1){

            }else{
                page--;
                manmanbuy.initProducts();
            }
        });
        // 去后一页
        $("body").on("click",'.after',function(){
            // console.log(1);
            if(page < total){
                page++;           
                manmanbuy.initProducts();                
            }else{
            }
            console.log(page);
        });

        $("body").on('change','select',function(){
            // console.log(1);
            page = $(this).val();
            console.log(page);
            manmanbuy.initProducts();
        });
    }
}

//获取url地址栏的参数的函数 网上找的  name就是url参数名
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURI(r[2]);
    } else {
        return null;
    }
}
