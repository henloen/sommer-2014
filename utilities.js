
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
					<th>Alder</th>\
					<th>Studiested</th>\
					<th>Programmeringsstil</th>\
					<th>Musikk</th>\
					<th>Personlighet</th>\
					<th>Hype-preferanse</th>\
					<th>Favorittgode</th>\
					<th>Planer for kvelden</th>\
					<th>Premie hvis du vinner</th>\
				</tr>';
	for (var i = 0; i < rows.length; i++) {
		html += '<tr>' +
					'<td>' + rows[i]['id_answers'] + '</td>' +
					'<td>' + rows[i]['sivilstatus'] + '</td>' +
					'<td>' + rows[i]['pa_hodet'] + '</td>' +
					'<td>' + rows[i]['alder'] + '</td>' +
					'<td>' + rows[i]['studiested'] + '</td>' +
					'<td>' + rows[i]['programmeringsstil'] + '</td>' +
					'<td>' + rows[i]['musikk'] + '</td>' +
					'<td>' + rows[i]['personlighet'] + '</td>' +
					'<td>' + rows[i]['hypepreferanse'] + '</td>' +
					'<td>' + rows[i]['favorittgode'] + '</td>' +
					'<td>' + rows[i]['planerforkvelden'] + '</td>' +
					'<td>' + rows[i]['premiehvisduvinner'] + '</td>' +

					'</tr>';
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