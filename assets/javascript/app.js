$(document).ready(function () {
	var videoGame = ["PUBG", "Monster Hunter", "Call of Duty", "Battlefield 1", "Starcraft", "Castle Crashers", "BioShock Infinite", "Assassins Creed", "Wolfenstein", "Katamari", "Destiny 2", "Portal", "Overwatch", "Mario Kart"];

	//populate buttons on DOM from strings in videoGame array
	function renderButtons() {
		for (var i = 0; i < videoGame.length; i++) {
			var gameButton = $("<button>");
			gameButton.html(videoGame[i]);
			gameButton.addClass("game-button btn btn-secondary");
			gameButton.attr("data-name", videoGame[i]);
			$("#buttonDiv").append(gameButton);
		}
	}

	// Add a new button for user input
	$("#add-game").on("click", function () {
		event.preventDefault();

		var newGame = $("#game-input").val();
		videoGame.push(newGame);
		$("#buttonDiv").empty();
		renderButtons();
	})

	// Click event for game button
	$("#buttonDiv").on("click", ".game-button", function () {
		// Empty div for new results
		$("#gifDiv").empty();

		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + $(this).attr("data-name") + "&limit=10&api_key=d8tUf6eAVnTEIs5rFhrzn8KloEk93AUx";
		// Ajax call to giphy
		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function (response) {

			var results = response.data;

			// Loop through the results
			for (var i = 0; i < results.length; i++) {
				var videoGameDiv = $("<div>");
				var p = $("<p>");
				p.html("Rating: " + results[i].rating.toUpperCase());

				var videoGameImg = $("<img>");
				// Assign still and animate state and url to each giphy
				videoGameImg.attr("src", results[i].images.fixed_height_still.url);
				videoGameImg.attr("data-still", results[i].images.fixed_height_still.url);
				videoGameImg.attr("data-animate", results[i].images.fixed_height.url);
				videoGameImg.attr("data-state", "still");
				videoGameImg.addClass("imgclick");
				videoGameDiv.append(videoGameImg);
				videoGameDiv.append(p);
				videoGameDiv.addClass("gif-div");
				$("#gifDiv").prepend(videoGameDiv);
			}
		})
	})

	// Change state of giphy and animate when clicked
	$("#gifDiv").on("click", ".imgclick", function () {

		var state = $(this).attr("data-state");

		if (state === "still") {
			var animates = $(this).attr("data-animate");
			// Change giphy link to the one to animate
			$(this).attr("src", animates);
			// Change state of giphy to animate
			$(this).attr("data-state", "animate");
		} else {
			var still = $(this).attr("data-still");
			// Change giphy link to the one that is still
			$(this).attr("src", still);
			// Change state of giphy to animate
			$(this).attr("data-state", "still");
		}

	})
	renderButtons();
})