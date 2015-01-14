function save_options() {
  var download = document.getElementById('download').checked;
  var copy = document.getElementById('copy').checked;
  chrome.storage.sync.set({
    copy: copy,
    download: download
  }, function() {
    var status = document.getElementById('status');
    status.textContent = 'Preferences saved.';
    setTimeout(function() {
      status.innerHTML = '';
    }, 750);
  });
}

function restore_options() {
  chrome.storage.sync.get({
    copy: true,
    download: false
  }, function(items) {
    document.getElementById('download').checked = items.download;
    document.getElementById('copy').checked = items.copy;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);