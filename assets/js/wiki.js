$("form").submit(getWiki);

//$("button").click(getWiki);


function getWiki (event)
{
	var wikiUrl = "http://en.wikipedia.org/w/api.php";
	var query = $("input").val();
	var $container = $("section");
	console.log(query);

	$container.text("");

	$.ajax({
		url: wikiUrl,
		data: {
			action: "opensearch",
			search: query,
			format: "json",
			origin: "*",
			redirects: "resolve",
			limit: 11,
			profile: "normal"
		},
		dataType: "jsonp",

		success: function(data){
			
			var titles = data[1];
			var texts = data[2];
			var links = data[3];
			var len = data[1].length;
			$("#name").fadeOut(500,function(){
				$(".center").css("marginTop","5%")
			});

			for(var i = 0; i < len; i++)
			{
				var title = titles[i];
				var text = texts[i];
				var link = links[i];

				if(text.indexOf("may refer to:") !== -1)
					continue;
				
				var elem = "<article><p><a href='"+link+"' target='_blank'>"+title+"</a></p><p>"+text+"</p></article>";
				$container.hide().append(elem).fadeIn(200);
			}

		}
	});

	return false;
}