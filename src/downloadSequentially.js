/* Got this from the URL below in Dec 2021. urls needs to be a list of
 * DownloadOptions though instead of just plain urls.
 *
 * https://stackoverflow.com/questions/51600832/how-to-make-chrome-downloads-api-wait-until-a-download-has-ended
 */

function downloadSequentially(urls, callback) {
  let index = 0;
  let currentId;

  chrome.downloads.onChanged.addListener(onChanged);

  next();

  function next() {
    if (index >= urls.length) {
      chrome.downloads.onChanged.removeListener(onChanged);
      callback();
      return;
    }
    const url = urls[index];
    index++;
    if (url) {
      chrome.downloads.download(
        url,
        id => {
        currentId = id;
      });
    }
  }

  function onChanged({id, state}) {
    if (id === currentId && state && state.current !== 'in_progress') {
      next();
    }
  }
}
