/**********************************/
/*  Infinite Scroll Demo - Hrily  */
/*  github.com/Hrily              */
/**********************************/

// Lorem Ipsum List
var lorem = [ "Lorem ipsum", "Dolor sit", "Consectetuer", "Adipiscing elit", "Diam", "Nonummy nibh", "Tincidunt", "Ut laoreet", "Magna", "Aliquam erat", "Ut", "Wisi enim", "Minim", "Veniam quis", "Exerci", "Tation ullamcorper", "Lobortis", "Nisl ut", "Ex", "Ea commodo", "Duis", "Autem vel", "Iriure", "Dolor in", "In", "Vulputate velit", "Molestie", "Consequat vel", "Dolore", "Eu feugiat", "Facilisis", "At vero", "Et", "Accumsan et", "Odio", "Dignissim qui", "Praesent", "Luptatum zzril", "Augue", "Duis dolore", "Feugait", "Nulla facilisiepsum", "Non", "Deposit quid", "Quo", "Hic escorol", "Quarrels", "Et gorilla", "Sic", "Ad nauseum", "Ignitus", "Carborundum e", "Unum", "Defacto lingo", "Igpay", "Atinlay marquee", "Non", "Provisio incongruous", "Nolo", "Contendre gratuitous", "Niacin", "Sodium glutimate", "Meon", "An estimate", "Non", "Interruptus stadium", "Tempus", "Fugit esperanto", "Estrogen", "Glorious baklava", "Librus", "Hup hey", "Infinitum", "Non sequitur", "Facile", "Et geranium", "Epsum", "Factorial non", "Quid", "Pro quo", "Escorol", "Marquee selectus", "Provisio", "Incongruous feline", "Contendre", "Olypian quarrels", "Gorilla", "Congolium sic", "Nauseum", "Souvlaki ignitus", "E", "Pluribus unumli", "Lingues", "Es membres", "Sam", "Familie lor", "Existentie", "Es un", "Por", "Scientie musica"]
// Timer for scroll event trigger
var timer;
// Number of visible 
var nVisible = 50, 
	rowHeight,
	maxRows = 5000;
/* 
 * Function to get row data
 * @param
 *     row - row number
 * @returns
 *     HTML string to the row data
 */
function get_data(row){
	console.log(row);
	var text = lorem[row%100];
	row++;
	html =  '<td><div class="circle-char">' + text.charAt(0) + '</div></td>';
	html += '<td>' + text + '</td>';
	html += '<td>' + row  + '</td>';
	return html;
}

/* 
 * Function to initialize document
 */
function init(){
	//  Initialize table
	tableInit();
	// Set OnScroll Listener
	$(window).on('scroll', function(){
		if($(window).scrollTop() + $(window).height() >= 35*rowHeight && $(window).scrollTop() < $('body').height() - 35*rowHeight){
			// Clear Scroll Trigger Timer if exists
			clearTimeout(timer);
			// Start Scroll Trigger Timer
			timer = setTimeout(function(){
				tableDrawVisible();
			}, 5)
		}else if($(window).scrollTop() + $(window).height() < 35*rowHeight){
			// Reset Table condition
			$('#filler').css('height',  '0');
			for(var i=51; i<=101; i++){
				$('table tbody tr:nth-child(' + i + ')').html(get_data(i-1));
			}
		}
	});
}

/* 
 * Function to initialize table
 */
function tableInit(){
	// Add Initial data
	for(var i=0; i<100; i++){
		if(i==50)
			// Filler Row
			$('table tbody').append('<tr id="filler" style="height: 0;"></tr>');
		$('table tbody').append('<tr>' + get_data(i) + '</tr>');
	}
	// Calculate Row height
	rowHeight = $('table tbody tr').outerHeight();
	// Update body height to fit maxRows
	$('body').css('height', (maxRows*rowHeight) + 'px');
}

/*
 * Function to draw visible rows
 */
function tableDrawVisible(){
	// Calculate visible row start index
	var offsetTop = $('#filler').offset().top;
	var diff = $(window).scrollTop() - offsetTop;
	var visibleIndex = Math.ceil(diff/rowHeight) - 15;
	if(visibleIndex>=0){
		// Print visible rows
		for(var i=51; i<=101; i++){
			var j = i + visibleIndex;
			$('table tbody tr:nth-child(' + i + ')').html(get_data(j));
		}
		$('#filler').css('height', (visibleIndex*rowHeight) + 'px');
	}
}