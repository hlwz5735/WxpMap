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
                itemArr :  [{x: 777, y: 256, name: '北京'}],
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

                    var elemStr = '<div class="map-mark-container"';
                    if (o.itemArr[i].content) {
                        elemStr += ("data-title='"+ o.itemArr[i].name +"' data-content='" + "content!" + "' data-trigger='hover' " +
                        "data-placement='top'");
                    }
                    //处理脚标
                    var pinImgStr = handlePinImage(o.itemArr[i]);
                    elemStr += generateTextAndPinNode(o.itemArr[i], pinImgStr) + '</div></div>';
                    //将节点实体化
                    var elem = $(elemStr);
                    //处理偏移度
                    handleOffset(o.itemArr[i], elem);

                    $(".map-image").append(elem);
                }

                var offset = $('.map-image').offset();

                var initX = 0;
                var initY = 0;
                var isMove = false;
                //绑定鼠标操作，实现拖动
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
                                else if (absX < containerWidth - o.mapWidth) {
                                    if (o.mapWidth < containerWidth) absX = 0;
                                    else absX = containerWidth - o.mapWidth;
                                }

                                var absY = offset.top - initY + event.pageY;
                                if (absY > 0) absY = 0;
                                else if (absY < containerHeight - o.mapHeight) {
                                    if (o.mapHeight < containerHeight) absY = 0;
                                    else absY = containerHeight - o.mapHeight;
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

                $(".map-mark-container").webuiPopover();

                var mapContainer = $(".map-container").get(0);
                mapContainer.onselectstart = mapContainer.ondrag = function() {
                    return false;
                }

            });
        }
    });

    function handlePinImage(item) {
        if (!item.pinImg || item.pinImg == 'redPin') {
            return '<img src="css/image/redPin.gif"/>';
        } else {
            return '';
        }
    }

    function generateTextAndPinNode(item, imgStr) {
        if (!item.textDir || item.textDir == 'left') {
            return '><div class="map-mark-text">' + item.name + imgStr;
        } else if (item.textDir == 'right') {
            return '><div class="map-mark-text">' + imgStr + item.name;
        } else if (item.textDir == 'bottom') {
            var tempStr = '><div class="map-mark-text">' + imgStr;
            tempStr += ('<div style="width:16px;padding-left:2px;">' + item.name + '</div>');
            return tempStr;
        } else {
            var tempStr = '><div class="map-mark-text">';
            tempStr += ('<div style="width:16px;padding-left:1px;">' + item.name + '</div>' + imgStr);
            return tempStr;
        }
    }

    function handleOffset(item, elem) {
        if (!item.textDir || item.textDir == "left") {
            if (!item.pinImg || item.pinImg == "redPin") {
                elem.css({
                    'top': item.y - 6,
                    'left': item.x - 12 * item.name.length - 12
                });
            } else {
                elem.css({
                    'top': item.y - 6,
                    'left': item.x - 12 * item.name.length - 10
                });
            }
        } else if (item.textDir == "top") {
            if (!item.pinImg || item.pinImg == "redPin") {
                elem.css({
                    'top': item.y - 6 - 14 * item.name.length,
                    'left': item.x - 7
                });
            } else {
                elem.css({
                    'top': item.y - 6 - 14 * item.name.length,
                    'left': item.x - 8
                });
            }
        } else if (item.textDir == "bottom") {
            if (!item.pinImg || item.pinImg == "redPin") {
                elem.css({
                    'top': item.y - 6,
                    'left': item.x - 10
                });
            } else {
                elem.css({
                    'top': item.y + 6,
                    'left': item.x -7
                });
            }
        } else {
            if (!item.pinImg || item.pinImg == "redPin") {
                elem.css({
                    'top': item.y - 6,
                    'left': item.x - 10
                });
            } else {
                elem.css({
                    'top': item.y - 6,
                    'left': item.x + 4
                });
            }
        }
    }

    //传递jQuery到方法中，这样我们可以使用任何javascript中的变量来代替"$"
})(jQuery);