var colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];

var quote = "",
    author = "";

function insertCon($dom, con) {
    $dom.text(con);
}

function getQuote() {
    $.ajax({
        headers: {
            "X-Mashape-Key": "OivH71yd3tmshl9YKzFH7BTzBVRQp1RaKLajsnafgL2aPsfP9V",
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
          },
          url: 'https://andruxnet-random-famous-quotes.p.mashape.com/cat=',
          success: function (r) {
            console.log(r);
            author = r.author;
            quote = r.quote;
            $('#twitter').attr('href', 'http://twitter.com/intent/tweet?text=' + encodeURIComponent(quote + ' by ' + author));

            $('#con').animate({
                opacity:0
            }, 500, function () {
                $(this).animate({
                    opacity:1
                }, 500);
                insertCon($('#con'), quote);
                // insertCon($('#sign'), author);
            });
            $('.sign').animate({
                opacity:0
            }, 500, function () {
                $(this).animate({
                    opacity:1
                }, 500);
                // insertCon($('#con'), quote);
                insertCon($('#sign'), author);
            });
            var colorNum = Math.floor(Math.random() * colors.length);
            console.log(colors[colorNum]);
          }
    })
}
$('#change').on('click', function () {
    getQuote();
});

getQuote();