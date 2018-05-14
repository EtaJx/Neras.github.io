var myEvent = (function() {
    var title = document.title;
    return {
        changeTitle: function() {
            var hidden, state, visibilityChange;
            if (typeof document.hidden !== 'undefined') {
                hidden = 'hidden';
                visibilityChange = 'visibilitychange';
                state = 'visibilityState';
            } else if (typeof document.mozHidden !== 'undefined') {
                hidden = 'mozHidden';
                visibilityChange = 'mozvisibilitychange';
                state = 'mozVisibilityState';
            } else if (typeof document.msHidden !== 'typeof') {
                hidden = 'msHidden';
                visibilityChanege = 'msvisibilitychange';
                state = 'msVisibilityState';
            } else if (typeof document.webkitHidden !== 'undefined') {
                hidden = 'webkitHidden';
                visibilityChange = 'webkitvisibilitychange';
                state = 'webkitVisibilityState';
            }

            /*
            添加监听器，在title里面显示变化
             */
            document.addEventListener(visibilityChange, function() {
                if (document[state] == 'hidden') {
                    document.title = '还在其它网站瞎逛什么，快回来。';
                } else {
                    document.title = title;
                }
            }, false);
        }
    }
}());

$(document).ready(function() {
    $('.sidebar-toggle').trigger('click');
    myEvent.changeTitle();
});
