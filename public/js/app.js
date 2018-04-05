$(document).ready(function () {
    // Scrape
    $(".scrape-btn").click(function (event) {
        event.preventDefault();
        $.get("/api/fetch").then(function (data) {
            $(".articles").remove();
            $.get("/").then(function(){
                alert(message?: "<h3 class='text-center m-top-80'>" + data.message + "<h3>");
            });
        })
    });

    // Save
    $(".save-article").click(function () {
        var articleToSave = {};
        articleToSave.id = $(this).data("id");
        articleToSave.saved = true;
        $.ajax({
            method: "PATCH",
            url: "/api/articles",
            data: articleToSave
        }).then(function (data) {
            location.reload();
        });
    });

    // Remove
    $(".remove-saved").click(function () {
        var articleToRemove = {};
        articleToRemove.id = $(this).data("id");
        articleToRemove.saved = false;
        $.ajax({
            method: "PATCH",
            url: "/api/articles",
            data: articleToRemove
        }).then(function (data) {
            location.reload();
        });
    });
});