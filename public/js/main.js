$('document').ready(function() {
	handleTyping();
});

function handleTyping() {
	new Typed('.typed', {
		strings: ['Welcome', 'To', 'WebCore', 'API'],
		typeSpeed: 50,
		backDelay: 600,
		loop: true,
		showCursor: false
	});
}