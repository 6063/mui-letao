var maimaibuy;
$(function(){
    manmanbuy = new Manmanbuy();
    manmanbuy.initDatas();
    manmanbuy.initmui();

})

var Manmanbuy = function(){

}
var id;
var titleId;
var page = 1;
var total;
var categoryIdData;
var brand = getQueryString("name");
console.log(brand);
Manmanbuy.prototype = {
    initDatas:function(){
        id = getQueryString("id");
        console.log(id);
        $.ajax({
            url:"http://localhost:9090/api/getproduct",
            data:{
                "productid":id
            },
            success:function(backData){                
                console.log(backData);  
                categoryIdData = backData.result[0].categoryId;
                console.log(categoryIdData);                
               var html = template("twoTmp",backData);
            //    console.log(html);
               $(".topContent").html(html);

            $.ajax({
                url:"http://localhost:9090/api/getcategorybyid",
                data:{
                    "categoryid":categoryIdData
                },
                success:function(backData){                    
                    var html1 = '<p><a href="./index.html">首页></a>'+backData.result[0].category+'>'+brand+'></p>'
                    $(".navContent").html(html1);
                }
            })

            }
        });
        $.ajax({
            url:"http://localhost:9090/api/getproductcom",
            data:{
                "productid":id
            },
            success:function(backData){                
                // console.log(backData);                
               var html = template("oneTmp",backData);
            //    console.log(html);
               $(".commentAll").html(html);   
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
