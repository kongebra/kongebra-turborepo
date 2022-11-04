export function enableGoogleAdsense() {
  const head = document.getElementsByTagName("head")[0];

  const scriptElement = document.createElement(`script`);
  scriptElement.type = `text/javascript`;
  scriptElement.async;
  scriptElement.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9129463609546926`;
  scriptElement.crossOrigin = "anonymous";

  head?.appendChild(scriptElement);
}
