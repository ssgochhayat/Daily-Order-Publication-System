document.getElementById('show-signup').addEventListener('click', function() {
  document.getElementById('login-section').style.transform = 'translateX(-100%)';
  setTimeout(() => {
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('signup-section').style.display = 'flex';
    document.getElementById('signup-section').style.transform = 'translateX(0)';
  }, 500);
});

document.getElementById('show-login').addEventListener('click', function() {
  document.getElementById('signup-section').style.transform = 'translateX(100%)';
  setTimeout(() => {
    document.getElementById('signup-section').style.display = 'none';
    document.getElementById('login-section').style.display = 'flex';
    document.getElementById('login-section').style.transform = 'translateX(0)';
  }, 500);
});

document.getElementById('hamburger-menu').addEventListener('click', function() {
  document.getElementById('aside-menu').style.right = '0';
});

document.getElementById('logout').addEventListener('click', function() {
  alert('User logged out.');
  // Add actual logout logic here
});

document.getElementById('aside-logout').addEventListener('click', function() {
  alert('User logged out.');
  // Add actual logout logic here
});

document.getElementById('dashboard').addEventListener('click', function() {
  document.getElementById('welcome-section').style.display = 'none';
  document.getElementById('login-section').style.display = 'none';
  document.getElementById('signup-section').style.display = 'none';
  document.getElementById('admin-section').style.display = 'none';
  document.getElementById('dashboard-section').style.display = 'flex';
  document.getElementById('aside-menu').style.right = '-250px';
});

document.getElementById('admin-panel').addEventListener('click', function() {
  document.getElementById('welcome-section').style.display = 'none';
  document.getElementById('login-section').style.display = 'none';
  document.getElementById('signup-section').style.display = 'none';
  document.getElementById('dashboard-section').style.display = 'none';
  document.getElementById('admin-section').style.display = 'flex';
  document.getElementById('aside-menu').style.right = '-250px';
});

document.getElementById('aside-menu').addEventListener('mouseleave', function() {
  document.getElementById('aside-menu').style.right = '-250px';
});

document.getElementById('add-notice').addEventListener('click', function() {
  document.getElementById('file-input').click();
});

document.getElementById('file-input').addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (file) {
    const listItem = document.createElement('li');
    const fileNameSpan = document.createElement('span');
    fileNameSpan.textContent = file.name;
    localStorage.setItem("item",fileNameSpan);
    listItem.appendChild(fileNameSpan);
    
    const previewButton = document.createElement('button');
    previewButton.textContent = 'Preview';
    previewButton.addEventListener('click', function() {
      const fileURL = URL.createObjectURL(file);
      document.getElementById('file-preview').src = fileURL;
      document.getElementById('file-preview-modal').style.display = 'block';
    });

    const downloadButton = document.createElement('button');
    downloadButton.textContent = 'Download';
    downloadButton.addEventListener('click', function() {
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(file);
      downloadLink.download = file.name;
      downloadLink.click();
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function() {
      listItem.remove();
    });

    listItem.appendChild(previewButton);
    listItem.appendChild(downloadButton);
    listItem.appendChild(deleteButton);
    document.getElementById('notices').appendChild(listItem);
  }
});


const modal = document.getElementById('file-preview-modal');
const closeBtn = document.getElementsByClassName('close')[0];

closeBtn.onclick = function() {
  modal.style.display = 'none';
  document.getElementById('file-preview').src = ''; 
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
    document.getElementById('file-preview').src = ''; 
  }
}


