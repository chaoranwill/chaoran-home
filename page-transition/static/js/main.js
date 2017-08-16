$(function () {
  var $main = $('.page-main'),
      $pages = $main.children('div.page'),
      $switchBtn = $('.page-switch button'),
      isAnimating = false,
      pagesCount = $pages.length,
      curPage = 0;

  $switchBtn.on('click', function(event) {
    console.log($pages[curPage]);
    event.preventDefault();
    $pages.eq(curPage).removeClass('active');
    curPage ++;
    $pages.eq(curPage).addClass('active');
  });

})

function init() {

}