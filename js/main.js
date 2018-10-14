'use stirct'

console.log('Starting up');



function init() {
  renderItemsAndModals();

}

function renderItemsAndModals() {
  renderItems();
  renderModals();
  function renderItems(){
    var projs = getProjs();
    var strHtmls = projs.map(function (proj, i) {
      var strHtml =
        ` 
        <div class="col-md-4 col-sm-6 portfolio-item">
          <a class="portfolio-link" data-toggle="modal" href="#portfolioModal${i + 1}">
            <div class="portfolio-hover">
              <div class="portfolio-hover-content">
                <i class="fa fa-plus fa-3x"></i>
              </div>
            </div>
            <img class="img-fluid" src="img/portfolio/${proj.id}.jpg" alt="">
          </a>
          <div class="portfolio-caption">
            <h4>${proj.name}</h4>
            <p class="text-muted">${proj.title}</p>
          </div>
        </div>
        `
      return strHtml
    })
    $('#projs').html(strHtmls.join(''))
  }

  function renderModals() {
    var projs = getProjs();
    strHtmls = projs.map(function (proj, i) {
      var strHtml = `
<div class="portfolio-modal modal fade" id="portfolioModal${i + 1}" tabindex="-1" role="dialog" aria-hidden="true">
<div class="modal-dialog">
      <div class="modal-content">
        <div class="close-modal" data-dismiss="modal">
          <div class="lr">
            <div class="rl"></div>
          </div>
        </div>
        <div class="container">
          <div class="row">
            <div class="col-lg-8 mx-auto">
              <div class="modal-body">
                <!-- Project Details Go Here -->
                <h2>${proj.name}</h2>
                <p class="item-intro text-muted">${proj.title}</p>
                <img class="img-fluid d-block mx-auto" src="img/portfolio/${proj.id}-full.jpg" alt="">
                <p>${proj.desc}</p>
                <p class="line-space"></p>
                <a href="projs/${proj.id}/index.html" class="btn btn-primary btn-lg"  target="_blank" role="button">
                  Visit us!</a>
                  <p class="line-space"></p>
                <ul class="list-inline">
                  <li>Date: January 2017</li>
                  <li>Client: <span class="badge badge-secondary">  ${proj.labels[0]}</span></li>
                  <li>Category: <span class="badge badge-secondary">  ${proj.labels[1]}</span></li>
                </ul>
                <button class="btn btn-danger btn-sm" data-dismiss="modal" type="button">
                  <i class="fa fa-times"></i>
                  Close Project</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
`
      return strHtml
    })
    $('.portfolio-modals').html(strHtmls.join(''))
  }
}


function onSubmit() {
  var formMailStr = `https://mail.google.com/mail/?view=cm&fs=1&to=yair.we21@gmail.com&su=${$('#subjectFormControlInput').val()}&body=${$('#bodyFormControlTextarea').val()} `
  window.open(formMailStr);
}