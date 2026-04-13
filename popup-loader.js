(function(){
  if(window.location.pathname.endsWith('/popup-welcome.html') || window.location.pathname.endsWith('popup-welcome.html')) return;
  fetch('popup-welcome.html')
    .then(function(response){
      if(!response.ok) throw new Error('Popup file not found');
      return response.text();
    })
    .then(function(html){
      var parser = new DOMParser();
      var doc = parser.parseFromString(html, 'text/html');
      var style = doc.querySelector('style');
      var script = doc.querySelector('script');
      if(style){
        document.head.appendChild(style.cloneNode(true));
      }
      var content = doc.body.innerHTML;
      if(content){
        document.body.insertAdjacentHTML('beforeend', content);
      }
      if(script){
        var newScript = document.createElement('script');
        if(script.src) newScript.src = script.src;
        else newScript.textContent = script.textContent;
        document.body.appendChild(newScript);
      }
    })
    .catch(function(error){
      console.warn('Popup loader error:', error);
    });
})();
