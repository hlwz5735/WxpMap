/**
 * Created by limen on 2016/11/22.
 */
//为避免冲突，将我们的方法用一个匿名方法包裹起来
(function($) {
    //扩展这个方法到jquery
    $.fn.extend({
        //插件名字
        wxpMap: function(options) {

            var defaults = {
                itemArr :  [
                    {x: 777, y: 256, name: '北京'},
                    {x: 363, y: 172, name: '乌鲁木齐'},
                    {x: 797, y: 325, name: '济南'},
                    {x: 923, y: 141, name: '哈尔滨'},
                    {x: 882, y: 228, name: '沈阳'},
                    {x: 707, y: 243, name: '呼和浩特'},
                    {x: 723, y: 305, name: '太原'},
                    {x: 742, y: 365, name: '郑州'},
                    {x: 666, y: 369, name: '西安'},
                    {x: 869, y: 423, name: '上海'},
                    {x: 587, y: 340, name: '兰州'},
                    {x: 555, y: 327, name: '青藏公司'},
                    {x: 575, y: 442, name: '成都'},
                    {x: 792, y: 476, name: '南昌'},
                    {x: 754, y: 438, name: '武汉'},
                    {x: 550, y: 549, name: '昆明'},
                    {x: 656, y: 590, name: '南宁'},
                    {x: 744, y: 582, name: '广州'}],
                mapWidth: 1210,
                mapHeight: 700,
                mapImageUrl: 'image/map_china1.jpg'

            };

            var opts = $.extend(defaults, options);
            //遍历匹配元素的集合
            return this.each(function() {
                //在这里编写相应代码进行处理
                var o = opts;
                var obj = $(this);

                obj.empty();
                var wxpContainer = $('<div class="map-container">'+
                    '<div class="map-image"></div>'+
                    '</div>');
                obj.append(wxpContainer);

                var containerWidth = obj.width(), containerHeight = o.mapHeight;

                if ($(window).height() - 140 < o.mapHeight) containerHeight = $(window).height() - 140;

                $(".map-container").css({'width':containerWidth+'px','height':containerHeight+'px'});
                $(".map-image").css({'width': o.mapWidth+'px','height': o.mapHeight+'px'});

                for (var i = 0; i < o.itemArr.length; i++) {

                    var elem = $('<div class="map-mark-container"' +
                        "data-title='"+ o.itemArr[i].name +"' data-content='" + "content!" + "' data-trigger='hover' " +
                        "data-placement='top'" +
                        '><div class="map-mark-text">' +
                        o.itemArr[i].name + '<img src="css/image/redPin.gif"/>' +
                        '</div></div>');

                    elem.css({
                        'top': o.itemArr[i].y,
                        'left': o.itemArr[i].x - 12 * o.itemArr[i].name.length
                    });

                    $(".map-image").append(elem);
                }

                var offset = $('.map-image').offset();

                var initX = 0;
                var initY = 0;
                var isMove = false;
                $(".map-container").mousedown(function (event) {
                    //offset 为现在的偏移量
                    offset = $('.map-image').position();

                    initX = event.pageX;
                    initY = event.pageY;

                    isMove = true;

                    $(document).mousemove(function (event) {
                            if (isMove) {
                                var absX = offset.left - initX + event.pageX;
                                if (absX > 0) absX = 0;
                                else if (absX < containerWidth - mapWidth) {
                                    if (mapWidth < containerWidth) absX = 0;
                                    else absX = containerWidth - mapWidth;
                                }

                                var absY = offset.top - initY + event.pageY;
                                if (absY > 0) absY = 0;
                                else if (absY < containerHeight - mapHeight) {
                                    if (mapHeight < containerHeight) absY = 0;
                                    else absY = containerHeight - mapHeight;
                                }

                                $('.map-image').css({'left': absX, 'top': absY});
                            }
                        }
                    ).mouseup(
                        function () {
                            isMove = false;
                        }
                    );
                });
                $('.map-image').css({'background-image': 'url("'+ o.mapImageUrl +'")'});
                if ($.webuiPopover) $(".map-mark-container").webuiPopover();
                var mapContainer = $(".map-container").get(0);
                mapContainer.onselectstart = mapContainer.ondrag = function() {
                    return false;
                }

            });
        }
    });

    //传递jQuery到方法中，这样我们可以使用任何javascript中的变量来代替"$"
})(jQuery);