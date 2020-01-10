'use strict';


// Constructor function for images from the JSON file

function Image (image) {
  this.url = image.image_url;
  this.title = image.title;
  this.description = image.description;
  this.keyword = image.keyword;
  this.horns = image.horns;
}

Image.allImages = [];
let keywords = [];

Image.prototype.render = function() {
//   let template = $('#photo-template').html();
  $('main').append('<section class="clone"></section>');
  let imageClone = $('section[class="clone"]');
  let imageHtml = $('#photo-template').html();
  imageClone.html(imageHtml);
  imageClone.find('h2').text(this.title);
  imageClone.find('img').attr('src', this.url);
  imageClone.find('p').text(this.description);
  imageClone.removeClass('clone');
  imageClone.attr('class', this.keyword);
};

Image.readJson = () => {
  $.get('../data/page-1.json', 'json')
    .then(data => {
      data.forEach(item => {
        Image.allImages.push(new Image(item));
        if (!keywords.includes(item.keyword)) {
          keywords.push(item.keyword);
        }
      });
    })
    .then(Image.loadImages)
    .then(Image.appendKeywords);
};

Image.loadImages = () => {
  Image.allImages.forEach(image => image.render());
};

Image.appendKeywords = () => {
  keywords.forEach(key => {
    let $option = $(`<option class="${key}">${key}</option>`);
    $('select').append($option);
  });
};

$(() => {
  console.log('added event listener');
  $('select').on('change', function() {
    console.log('CLICK!');
    if (this.value === 'all') {
      $('section').show();
    } else if (this.value !== 'default') {
      $('section').hide();
      // let key = event.target.value;
      $(`section[class="${this.value}"]`).show();
      console.log('end of event listener');
    }
  });
});

$(() => Image.readJson());
