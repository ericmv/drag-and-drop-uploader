

// variables
let events = ['dragenter', 'dragover', 'dragleave', 'drop'];
let current_file = null;

let dropBox = document.getElementById('drop-box');
let fileInput = document.getElementById('file-input');
let submitButton = document.getElementById('submit-button');
let filename = document.getElementById('name');
let filetype = document.getElementById('type');
let filesize = document.getElementById('size');




// prevent default behavior to allow upload functionality
events.forEach((event) => {
  dropBox.addEventListener(event, preventDefaults, false);
})


// functions
function handleUpload(files) {
  // place files in form input to send out
  // used for main submit
  fileInput.files = files;

  // current_file used to display info
  // also used with alternate submit button
  // alternate submit takes current file and posts to server via fetch
  current_file = files[0];

  // make submit button visible
  submitButton.classList.add('visible');

  // display file info
  updateInfo(current_file.name, current_file.type, current_file.size + " bytes")
}

function handleDrop(e) {
  let dt = e.dataTransfer;
  let files = dt.files;

  handleUpload(files);
}

function preventDefaults (e) {
  e.preventDefault();
  e.stopPropagation();
}

function updateInfo(name, type, size) {
  filename.innerHTML = name;
  filetype.innerHTML = type;
  filesize.innerHTML = size;
}




// method 2: fetch reset form
// only used with second submit button (uncomment in html to view)
function handleSubmit() {
  let data = new FormData();
  data.append('file', current_file);

  fetch('/upload', {
      method: "POST",
      body: data
  })
  .then((res) => {

    // reset form and current file
    fileInput.files = null;
    current_file = null;
    submitButton.classList.remove('visible');
    updateInfo("", "", "");

    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  })
}
