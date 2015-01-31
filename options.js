function save_options() {
  var hdtrack = document.getElementById('hdtrack').checked;
  var download = document.getElementById('download').checked;
  var copy = document.getElementById('copy').checked;
  chrome.storage.sync.set({
    copy: copy,
    download: download,
    hdtrack: hdtrack
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
    copy: false,
    download: false,
    hdtrack: true
  }, function(items) {
    document.getElementById('hdtrack').checked = items.hdtrack;
    document.getElementById('download').checked = items.download;
    document.getElementById('copy').checked = items.copy;
    nocopy();
  });
}

function nocopy() {
  if (document.getElementById('hdtrack').checked) {
    document.getElementById('copy').disabled = true;
  }
  if (!document.getElementById('hdtrack').checked) {
    document.getElementById('copy').disabled = false;
  }
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('hdtrack').addEventListener('click', nocopy);
