+function ($) {

    $(function () {

        // Checks for ie
        var isIE = !!navigator.userAgent.match(/MSIE/i) || !!navigator.userAgent.match(/Trident.*rv:11\./);
        isIE && $('html').addClass('ie');

        // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
        var ua = window['navigator']['userAgent'] || window['navigator']['vendor'] || window['opera'];
        (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua) && $('html').addClass('smart');

    });

    $(function () {
        //Date picker
        $('.datepickers').datepicker({
            autoclose: true
        });
    });

    // $(function(){
    //     $("button.edit-btn").click(function(){
    //         $(".edit-field").show();
    //         $(".current-data").hide();
    //     });
    //     $(document).on('click','button.edit-save',function(){
    //         var line_this = this;
    //         $('.edit-field').hide();
    //         $('.current-data').show();
    //     });
    // });

    $(document).on('mouseover', '.pw-strength-wrap a i', function () {
        var line_this = this;
        $('.pw-strength').show();
    });
    $(document).on('mouseout', '.pw-strength-wrap a i', function () {
        var line_this = this;
        $('.pw-strength').hide();

    });

    $(document).on('click', '.checkList', function () {
        var countCheckedList = $('.checkList:checked').length
        var countCheckList = $('.checkList').length;
        if (countCheckedList == countCheckList) {
            $('.checkListAll').prop('checked', true);
        } else {
            $('.checkListAll').prop('checked', false);
        }

    });
    $(document).on('click', '.checkListAll', function () {
        if ($('.checkListAll').is(':checked')) {
            $('.checkList').prop('checked', true);
        } else {
            $('.checkList').prop('checked', false);
        }
    });
}(jQuery);
