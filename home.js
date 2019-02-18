window.onload = setup;

function setup() {
    // attach click handler to imageResizer input
    document.getElementById("imageResizer").addEventListener("click", resizeImage);
}

function resizeImage() {
    let file = getImageFile();
    let imageReader = createImageReader(file);

    // Set the image once loaded into file reader
    imageReader.onload = (e) => createNewImage(e);
}

function getImageFile() {
    var filesToUpload = document.getElementById('imageFile').files;
    var file = filesToUpload[0];
    return file;
}

function createImageReader(imageFile) {
    var reader = new FileReader();
    reader.readAsDataURL(imageFile);

    return reader;
}

function createNewImage(e) {
    // Create an image
    var img = document.createElement("img");
    img.src = e.target.result;

    // Wait for image element to load on page
    img.addEventListener('load', () => {
        // Create a canvas
        var canvas = document.createElement("canvas");

        /*
            Wait for canvas element to load
                Call drawAndResizeCanvas setting 'this' as new canvas object explicitly
                Pass new image as argument
        */
        canvas.addEventListener('load', drawAndResizeCanvas.apply(canvas, [img]));
    })
}

function drawAndResizeCanvas(img) {
    canvas = this;
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