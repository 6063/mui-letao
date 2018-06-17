var maimaibuy;
$(function(){
    manmanbuy = new Manmanbuy();
    manmanbuy.initDatas();
    manmanbuy.initmui();
    backPrePage();
})

var Manmanbuy = function(){

}
var id;
var imgArrs = [];
var name = getQueryString("name");
$("#header .title").html(name+'优惠券');
Manmanbuy.prototype = {
    initDatas:function(){
        id = getQueryString("id");
        console.log(id);
        $.ajax({
            url:"http://localhost:9090/api/getcouponproduct",
            data:{
                "couponid":id
            },
            success:function(backData){                
                // console.log(backData);                
               var html = template("contents",backData);
            //    console.log(html);
               $(".navContent").html(html);
                for(var i = 0;i<backData.result.length;i++){
                    imgArrs[i] = backData.result[i].couponProductImg;
                }
                console.log(imgArrs);

                // 图片数组：imgArrs
                $("body").on('tap','.navContent img',function(){
                    var index = $(this).parent('a').data('index');
                    // 图片数组 imgArrs
                    $(".mask").show();
                    var href = $(this).attr('src');
                    $(".mask .xx").html('<img class="aaa" src="'+href+'">');
                    $(".xx").on('tap','.aaa',function(){
                        $(".mask").hide();
                    });

                    $("body").on("tap",'.mask button.hhLeft',function(){
                        if(index>0){
                            index--;
                            var html2 = imgArrs[index].replace(/<img /,'<img class="aaa"' );

                            $(".mask .xx").html(html2);
                        }                              
                    })

                    $("body").on("tap",'.mask button.hhRight',function(){
                        if(index<imgArrs.length){
                            index++;
                            var html3 = imgArrs[index].replace(/<img /,'<img class="aaa"' );
                            $(".mask .xx").html(html3);                        
                        }                            
                    })



                    
                    

                })
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

function backPrePage(){
    $("body").on('tap','.backPrePage',function(){
        window.history.go(-1);
    })
}
function imgClick(){
    
}