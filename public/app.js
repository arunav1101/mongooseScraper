// Grab the articles as a json
$.getJSON("/articles", function (data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    $("#articles").append(`<p data-id=${data[i]._id}>
    <a target=_blank href= ${data[i].link}><img src = ${data[i].img} width =30%></a>
    <br/>${data[i].title}
    <button class = addComment type=input id=${data[i]._id} >Add comment </button>
    <button data-target="modal1" class="btn modal-trigger">Modal</button>
    </p>`);
  }
});


$(document).on("click", ".modal-trigger", function (event) {
  $('.modal').modal();
});

// Whenever someone clicks a p tag
$(document).on("click", ".addComment", function (event) {
  // 

  // dataStore.listId = event.target.dataset.id;
  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the p tag
  // var thisId = $(this).attr("data-id");
  console.log('test', event.target.id)
  var thisId = event.target.id
  // Now make an ajax call for the Article
  $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
    // With that done, add the note information to the page
    .then(function (data) {
      console.log(data);
      // The title of the article
      $("#notes").append("<h2>" + data.title + "</h2>");
      // An input to enter a new title
      $("#notes").append("Name : <input id='titleinput' name='title'></input>");
      // A textarea to add a new note body
      $("#notes").append("Enter the Notes : <textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
    });
});

// When you click the savenote button
$(document).on("click", "#savenote", function () {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        // Value taken from title input
        title: $("#titleinput").val(),
        // Value taken from note textarea
        body: $("#bodyinput").val(),
      }
    })
    // With that done
    .then(function (data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});

$(document).on("click", "#removelast", async function () {

  await $.ajax({
      method: "DELETE",
      url: "/all"
    })
    .then(async function (data) {
      // Log the response
      // Empty the notes section
      $("#articles").empty();
      $("#notes").empty();
      await location.reload(true);
    })
});

$(document).on("click", "#scrape", async function () {
  await $.ajax({
      method: "GET",
      url: "/scrape"
    })
    .then(async function (data) {
     await location.reload(true);
    })
});