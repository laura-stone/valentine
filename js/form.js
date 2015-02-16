//  Performs Form Logic for Valentine's Day Site
//  

// Create Valentine constructor
function Valentine (from, to, email, text, background) {
	this.user = from;
	this.name = to;
	this.email = email;
	this.text = text;
	this.background = "static/" + background;
}

var form = {
	submit: function () {
		$("form").on("submit", function(e) {
			e.preventDefault();
			var form = $(this);
			// Instantiate new Valentine Object
			newValentine =  new Valentine($(this).find("#user").val(),
			$(this).find("#name").val(),
			$(this).find("input[type=email]").val(),
			$(this).find("textarea").val(),
			$(this).find("input[type=radio]:checked").val());
			console.log(newValentine);
			$.ajax(form.attr("action"), {
				type: form.attr("method"),
				data: newValentine,
				timeout: 3000,
				// Fake a successful callback, populate page with Valentine data
				success: function(result) {
					form.closest(".group").find("h1").remove();
					form.remove();
					var from = $("<p>From: " + newValentine.user + "</p>");
					var dearest = $("<p>Dearest " + newValentine.name + ", </p>");
					var text = $("<p>" + newValentine.text + "</p>");
					$("main").append(dearest);
					$("main").append(text);
					$("main").append(from);
					$("main").css("background-image", "url(" + newValentine.background + ")");
					$("main").append('<p><a href="form.html">Back</a></p>');
					$("#mail").show();
				},
				error: function(request, errorType, errorMessage) {
					var error = $("<p></p>");
					error.append(errorType + "error received with message " + errorMessage);
					error.insertAfter(form.closest(".group").find("h1"));
				}
			});
		});
	},
	sendMail: function () {
		$("#mail").on("click", function() {
			var link = "mailto:" + newValentine.email +
			"?cc=myCCaddress@example.com" +
			"&subject=" + escape("A valentine to you from " + newValentine.user) +
			"&body=" + escape(newValentine.user + "has a valentine just for you, " +
				newValentine.name + "! - " + newValentine.text);
		window.location.href = link;
		});
	}
};


$(document).ready(function (){
	form.submit();
	form.sendMail();
});
