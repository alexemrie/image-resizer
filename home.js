function resizeImage() {
  var filesToUpload = document.getElementById('imageFile').files;
  var file = filesToUpload[0];

  // Create an image
  var img = document.createElement("img");
  // Create a file reader
  var reader = new FileReader();
  // Set the image once loaded into file reader
  reader.onload = function(e) {
          img.src = e.target.result;

          var canvas = document.createElement("canvas");
          var ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);

          var MAX_WIDTH = 100;
          var MAX_HEIGHT = 100;
          var width = img.width;
          var height = img.height;

          // set proper ratio of width to height using maximums
          if (width > height) {
              if (width > MAX_WIDTH) {
                  height *= MAX_WIDTH / width;
                  width = MAX_WIDTH;
              }
          } else {
              if (height > MAX_HEIGHT) {
                  width *= MAX_HEIGHT / height;
                  height = MAX_HEIGHT;
              }
          }
          canvas.width = width;
          canvas.height = height;
          var ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          var dataurl = canvas.toDataURL("image/png");
          document.getElementById('output').src = dataurl;
      }
      // Load files into file reader
  reader.readAsDataURL(file);
}