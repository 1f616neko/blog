function sendMessage(message) {
	const iframe = document.querySelector("iframe.giscus-frame")
	if (!iframe) return
	iframe.contentWindow.postMessage({ giscus: message }, "https://giscus.app")
}

function toggleNightMode(){
	if(document.documentElement.getAttribute('data-theme') == 'light'){
		document.documentElement.setAttribute('data-theme', 'dark');
		document.getElementById('mode-switcher').classList.add('active');
		sendMessage({
			setConfig: {
			  theme: 'dark',
			}
		});
		localStorage.setItem("theme","dark");
	}
	else{
		document.documentElement.setAttribute('data-theme', 'light');
		document.getElementById('mode-switcher').classList.remove('active');
		sendMessage({
			setConfig: {
			  theme: 'light',
			}
		});
		localStorage.setItem("theme","");
	}
}

document.querySelector("iframe.giscus-frame").addEventListener("load", e => {
	sendMessage({
		setConfig: {
			theme: (document.documentElement.getAttribute('data-theme')),
		}
	});
})