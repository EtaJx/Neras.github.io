$(document).ready(function() {
    $('.sidebar-toggle').trigger('click');
    $('#sidebar').find('li').each(function() {
        if ($(this).hasClass('sidebar-nav-active') == false) {
            $(this).trigger('click');
        }
    });

});
