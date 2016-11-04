(function() {

	var Lib = {
		colors: ["#555D7B", "#9FD400", "#C97D99", "#79CAE5", "#E84929", "#0055D0", "#FF32AA", "#0ECCFE", "#FF9B00", "#E64A33"],

		getColor: function (x) {
			return Lib.colors[x % Lib.colors.length];
		},

		getInitials: function (name) {
			var str = "";
			var fullNames = name.split(" ");
			fullNames.forEach(function(name) {
				str += name.charAt(0);
			});
			return str;
		},

		splitDayWise: function (config) {
			var i;
			var days = [[], [], [], [], [], [], []];
			if (config.year == "") {
				throw new Error("yearInput is empty");
			}
			if (config.data) {
				for (i=0; i < config.data.length; i++){
					var d = new Date(config.data[i].birthday);
					d.setFullYear(config.year);
					var day = d.getDay();	// 0 indicates sunday
					days[day].push(Lib.getInitials(config.data[i].name));
				}
				return days;
			}
		},

		getGridSize: function (tiles) {
			return Math.ceil(Math.sqrt(tiles));
		}
	};

	function init() {
		$(".dayWindowContent").empty();
		$("#btnUpdate").on("click", function() {
			$(".dayWindowContent").empty();
			try {
				var year = parseInt($("#yearInput").val());
				var jsonData = JSON.parse($("#jsonCalenderData").val());
				var days = Lib.splitDayWise({year: year, data: jsonData});
				renderCal(days);
			} catch (e) {
				alert(e);
			}
		});
	}	

	function renderCal(days) {
		var i, j;
		for(i=0; i < days.length; i++) {
			var $dayDiv = $("#dayWindowContent" + i);
			var entries = days[i].length;
			var gridSize = Lib.getGridSize(entries);
			var tileWidth = $dayDiv.width() / gridSize;
			var tileHeight = $dayDiv.height() / gridSize;

			if(gridSize > 0){
				$dayDiv.next(".birthdayCount").text(entries + " Birthdays");
				$dayDiv.append(days[i].map(function(day, j) {
					var color = Lib.getColor(j);
					return "<div class='tiles' style='background:" + color + "; width : " + tileWidth + "px; height : " + tileHeight + "px; line-height :"+ tileWidth + "px;'>" + day + "</div>";
				}));
			} else if(gridSize == 0){
				$dayDiv.next(".birthdayCount").text("No Birthdays");
				$dayDiv.append("<div class='emptyDiv'></div>");
			}

		}
	}

	$(document).ready(init);

}());