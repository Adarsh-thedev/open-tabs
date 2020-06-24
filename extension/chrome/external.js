chrome.runtime.onInstalled.addListener(function (object) {
  try {
    // On install, open a welcome tab.
    if (object.reason === chrome.runtime.OnInstalledReason.INSTALL) {
      const postInstallURL = 'http:localhost:3000/oninstall'
      chrome.tabs.create({ url: postInstallURL })
    }
  } catch (e) {
    console.error(e)
  }
})
try {
    const postUninstallURL = 'https://forms.gle/gpNe54EzWNaYhvkh8'
    chrome.runtime.setUninstallURL(postUninstallURL)
  } catch (e) {
    console.error(e)
  }
    