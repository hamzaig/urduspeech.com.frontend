export const THEME_MODE_KEY = "urduspeech-theme-mode";
export const SUN_CACHE_KEY = "urduspeech-sun-cache";

/**
 * Synchronous inline script executed before first paint to prevent
 * a flash of the wrong light/dark theme.
 */
export const THEME_INIT_SCRIPT = `(function(){try{var d=document.documentElement;var m=localStorage.getItem("${THEME_MODE_KEY}");if(m!=="light"&&m!=="dark"&&m!=="auto")m="auto";var t=null;if(m==="light"||m==="dark"){t=m;}else{var tz="";try{tz=Intl.DateTimeFormat().resolvedOptions().timeZone||"";}catch(e){}var raw=localStorage.getItem("${SUN_CACHE_KEY}");if(raw){try{var c=JSON.parse(raw);var now=Date.now();if(c&&c.savedAt&&now-c.savedAt<43200000&&(!tz||!c.tz||c.tz===tz)){if(c.polarState==="day"){t="light";}else if(c.polarState==="night"){t="dark";}else if(c.sunrise&&c.sunset){var sr=Date.parse(c.sunrise),ss=Date.parse(c.sunset);if(isFinite(sr)&&isFinite(ss)&&now>=sr-43200000&&now<=ss+57600000){t=(now>=sr&&now<ss)?"light":"dark";}}}}catch(e){}}if(!t){var h=new Date().getHours();t=(h>=6&&h<18)?"light":"dark";}}d.dataset.theme=t;d.dataset.themeMode=m;d.style.colorScheme=t;}catch(e){}})();`;
