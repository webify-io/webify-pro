/* js function to retrieve year element */
function todayDate() {
	var d = new Date();
	var n = d.getFullYear() + ' ';
	return (document.getElementById('date').innerHTML = n);
}
