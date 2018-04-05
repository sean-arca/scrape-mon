$(document).ready(function () {
    // Scrape
    $(".scrape-btn").click(function (event) {
        event.preventDefault();
        $.get("/api/fetch").then(function (data) {
            $(".articles").remove();
            $.get("/").then(function(){
                alert(data.message, function(result) {
                    location.reload()
                });
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

    // Save Comment
    $(".save-comment").click(function () {
        var thisId = $(this).data("id");

        // POST input field
        $.ajax({
            method: "POST",
            url: "/articles" + thisId,
            data: {
                body: $("#comment-input").val()
            }
        }).done(function (data) {
            $("#comment-modal").modal("hide");
        });
        
        // Empty Input
        $("#comment-input").val("");
    });
});