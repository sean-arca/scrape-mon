$(document).ready(function () {
    $(".scrape-btn").click(function (event) {
        event.preventDefault();
        $.get("/api/fetch").then(function (data) {
            $(".articles").remove();
            $.get("/").then(function(){
                bootbox.alert("<h3 class='text-center m-top-80'>" + data.message + "<h3>");
            });
        })
    })
})