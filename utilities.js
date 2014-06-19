
function printTableHtml(rows) {
	var html = 	'<!DOCTYPE html>\
	<html>\
		<head>\
		</head>\
		<body>\
			<table border="1">\
				<tr>\
					<th>Id</th>\
					<th>Sivilstatus</th>\
					<th>På hodet</th>\
				</tr>';
	for (var i = 0; i < rows.length; i++) {
		html += '<tr>\
					<td>' + rows[i]['id_svarinfo'] + '</td>\
					<td>' + rows[i]['sivilstatus'] + '</td>' +
					'<td>' + rows[i]['pa_hodet'] + '</td></tr>'
	}
	html += '</table>\
			<form action="/menu" method="get">\
				<button name="backToMenu" type="submit">Tilbake til meny</button>\
			</form>\
		</body>\
	</html>';

	return html;
}

exports.printTableHtml = printTableHtml;