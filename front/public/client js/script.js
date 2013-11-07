
var get = function(){
	$(document).ready(function(){
		$.get( "http://192.168.175.200:3001/data", function(data){
			var length = data.length;
			$("#data").html("");
			for (var i = 0; i < length; i++){
				var listItem = {};
				var currThread = data[i];
				listItem = "Subject: " + currThread.subject;
				var date = new Date(currThread.date);
				listItem+= ", Date: " + date.toString();
				$("#data").append(JSON.stringify(listItem));
			}
			//$("#data").text(JSON.stringify(data));
		});
	});
}
