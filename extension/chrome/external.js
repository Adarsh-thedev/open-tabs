
chrome.runtime.onInstalled.addListener(function (obj) {
    try {
      // When extension is installed, open register tab
      if (obj.reason === chrome.runtime.OnInstalledReason.INSTALL) {
        const registerURL = 'https://opentabs.org/register/'
        chrome.tabs.create({ url: registerURL })
      }
    } catch (e) {
      console.error(e)
    }
  })
  