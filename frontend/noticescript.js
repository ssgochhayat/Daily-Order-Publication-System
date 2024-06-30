// Selectors for DOM elements
const fileInput = document.getElementById('file-input');
const noticesList = document.getElementById('notices');

// Event listener for Add Notice button
document.getElementById('add-notice').addEventListener('click', function() {
  fileInput.click();
});

// Event listener for file input change
fileInput.addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (file) {
    addNotice(file);
  }
});

// Function to add notice item to the list
function addNotice(file) {
  // Create elements for notice item
  const listItem = document.createElement('li');
  
  // File name display
  const fileNameSpan = document.createElement('span');
  fileNameSpan.textContent = file.name;

  // Preview button
  const previewButton = createButton('Preview', function() {
    previewFile(file);
  });

  // Download button
  const downloadButton = createButton('Download', function() {
    downloadFile(file);
  });

  // Delete button
  const deleteButton = createButton('Delete', function() {
    deleteNotice(file.name);
    listItem.remove();
  });

  // Append elements to the list item
  listItem.appendChild(fileNameSpan);
  listItem.appendChild(previewButton);
  listItem.appendChild(downloadButton);
  listItem.appendChild(deleteButton);
  noticesList.appendChild(listItem);

  // Store file data in local storage (example, adjust as needed)
  const fileData = {
    name: file.name,
    type: file.type,
    size: file.size,
    lastModified: file.lastModified
    // Add more properties if needed
  };
  localStorage.setItem('file_' + file.name, JSON.stringify(fileData));
}

// Function to create a button with text content and click handler
function createButton(text, clickHandler) {
  const button = document.createElement('button');
  button.textContent = text;
  button.addEventListener('click', clickHandler);
  return button;
}

// Function to fetch all notices from local storage and display them
function displayNoticesFromStorage() {
  // Clear existing notices from the list
  noticesList.innerHTML = '';

  // Loop through local storage items
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith('file_')) {
      const fileData = JSON.parse(localStorage.getItem(key));
      const fileName = fileData.name;

      // Create list item for each notice
      const listItem = document.createElement('li');
      const fileNameSpan = document.createElement('span');
      fileNameSpan.textContent = fileName;

      // Preview button
      const previewButton = createButton('Preview', function() {
        previewFileFromStorage(fileName);
      });

      // Download button
      const downloadButton = createButton('Download', function() {
        downloadFileFromStorage(fileName);
      });

      // Delete button
      const deleteButton = createButton('Delete', function() {
        deleteNotice(fileName);
        listItem.remove();
      });

      // Append elements to the list item
      listItem.appendChild(fileNameSpan);
      listItem.appendChild(previewButton);
      listItem.appendChild(downloadButton);
      listItem.appendChild(deleteButton);
      noticesList.appendChild(listItem);
    }
  }
}

// Function to preview the file (PDF) from local storage
function previewFileFromStorage(fileName) {
  const fileData = JSON.parse(localStorage.getItem('file_' + fileName));
  if (fileData) {
    const file = new File([fileName], fileName, { type: fileData.type });
    previewFile(file);
  }
}

// Function to download the file from local storage
function downloadFileFromStorage(fileName) {
  const fileData = JSON.parse(localStorage.getItem('file_' + fileName));
  if (fileData) {
    const file = new File([fileName], fileName, { type: fileData.type });
    downloadFile(file);
  }
}

// Function to delete notice from local storage
function deleteNotice(fileName) {
  localStorage.removeItem('file_' + fileName);
}

// Function to preview the file (PDF)
function previewFile(file) {
  const fileURL = URL.createObjectURL(file);
  document.getElementById('file-preview').src = fileURL;
  document.getElementById('file-preview-modal').style.display = 'block';
}

// Function to download the file
function downloadFile(file) {
  const downloadLink = document.createElement('a');
  downloadLink.href = URL.createObjectURL(file);
  downloadLink.download = file.name;
  downloadLink.click();
}

// Modal close button functionality
const modal = document.getElementById('file-preview-modal');
const closeBtn = document.getElementsByClassName('close')[0];

closeBtn.onclick = function() {
  modal.style.display = 'none';
  document.getElementById('file-preview').src = '';
};

window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = 'none';
    document.getElementById('file-preview').src = '';
  }
};

// Initialize by displaying notices from local storage on page load
displayNoticesFromStorage();
