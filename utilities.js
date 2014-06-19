
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
		</body>\
	</html>';

	return html;
}

exports.printTableHtml = printTableHtml;