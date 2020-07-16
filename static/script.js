/*
Vue.js (https://vuejs.org/)
CDN: https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.10/vue.min.js

Vue is a JavaScript framework which allows us to
deal with dynamic data easier.  It's not required
for the actually image drawing interface.
**/
var app = new Vue({
    el: '#app',
    data: {
      images: [],
      results: []
    }
})
  
/*
Fabric.js (http://fabricjs.com/)
CDN: https://cdnjs.cloudflare.com/ajax/libs/fabric.js/3.6.1/fabric.min.js

Fabric is a HTML5 canvas library.  We use this for the drawing app.
**/
var canvasBackgroundColor = "white";
var canvasElement = $('#paint-canvas')

// Setup Fabric Canvas (http://fabricjs.com/docs/fabric.Canvas.html)
window.canvas = new fabric.Canvas('paint-canvas', {
    width: 112,
    height: 112,
    isDrawingMode: true,
    backgroundColor: canvasBackgroundColor
});
window.canvas.freeDrawingBrush.width = 10;
  
// Convert canvas RGBA data into gray scale data
var grayscale = function(data) {
    var output = []
    for (var i = 0; i < data.length; i += 4) {
        if (data[i] == 0) {
            output.push(1)
        } else {
            output.push(0)
        }
    }
    return output
};
  
// Grab the pixel data from the canvas
var getImageData = (canvasElement) => {
    var ctx = canvasElement.getContext("2d")
    return ctx.getImageData(0, 0, 112, 112).data
}
  
$('#send-button').click(() => {
    handleImageData();
})
  
$('#clear-button').click(() => {
    window.canvas.clear()
    window.canvas.backgroundColor = canvasBackgroundColor
})
  
$('#reset-button').click(() => {
    app.images = []
})
  
var handleImageData = () => {
    var dataPoint = {}
    var canvasElement = document.getElementById('paint-canvas')
    dataPoint.src = canvasElement.toDataURL()
    app.images.push(dataPoint)
    postImageData()
}
  
// If we're sending the data to a server...
var postImageData = (dataPoint) => {
    const endpoint = '/infer';
    var canvasElement = document.getElementById('paint-canvas')
    var image = getImageData(canvasElement);
    var sendData = {
        input: [grayscale(image)]
    }
    $.ajax({
        url: endpoint,
        type: "POST",
        data: JSON.stringify(sendData),
        dataType: 'json',
        crossOrigin: true,
        contentType: "application/json",
        success: function (response) {
            console.log('SUCCESS:', response)
            app.results.push(response.result)
        },
        error: function (xhr, status) {
            console.log('ERROR:', xhr)
        }
    });
}
  