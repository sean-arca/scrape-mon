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

    // Check For Comments
    $(".comments").click(function () {
        var thisId = $(this).attr("data-value");

        // Use Article id for saving new comments
        $("#saveButton").attr({"data-value": thisId});

        $.get("/comments/" + thisId, function (data) {
            // console.log(data);

            // Empty modal
            $("#commentModalLabel").empty();
            $("#commentBody").empty();
            $("#comment-input").val("");

            // Append Article id to modal
            $("#commentModalLabel").append(' ' + thisId);

            // Show comments in modal
            for (var i = 0; i < data.comment.length; i++) {

                console.log(data.comment[i]);
                var button = ' <a href=/deleteComment/' + data.comment[i]._id + '><button type="button" class="btn btn-danger remove-comment">Remove</button></a>';
                $('#commentBody').append('<div class="card"><div class="commentText card-body">' + data.comment[i].body + '  ' + button + '</div></div>');
                
            }
        })
    })


    // Save Comment
    $(".save-comment").click(function () {
        var thisId = $(this).data("id");
        var commentBody = $("#comment-input").val().trim();

        // POST input field
        $.ajax({
            method: "POST",
            url: "/comments/" + thisId,
            data: {
                body: commentBody
            }
        }).done(function (data) {
            $("#comment-modal").modal("hide");
        });
        
        // // Empty Input
        // $("#comment-input").val("");
    });
});