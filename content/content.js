window.overLayerImages = window.overLayerImages || {};

if (document.querySelector('.overlayer-toolbar')) {
  // hide toolbar and image
  // if image is already hidden, dont toggle it, on
  // but also leave it off when toolbar returns
  document.querySelector('.overlayer-toolbar').classList.toggle('hide-everything');
  if (document.querySelector('.overlayer-overlay')) {
    document.querySelector('.overlayer-overlay').classList.toggle('hide-everything');
  }
} else {
  ///////////////////////////////
  // Helpers
  ///////////////////////////////

  const buildElement = (type, className, parent) => {
    const el = document.createElement(type);
    if (className) {
      el.classList.add(className);
    }
    parent.appendChild(el);
    return el;
  };

  const setImageDrawer = (action) => {
    if (!Object.keys(window.overLayerImages).length) return triggerFileInputClick();
    if (action === 'open') imgListWrap.classList.add('open');
    else if (action === 'close') imgListWrap.classList.remove('open');
    else imgListWrap.classList.toggle('open');
  };

  const handleFiles = function () {
    for (let i = 0; i < this.files.length; i++) {
      const file = this.files[i];

      if (!file.type.startsWith('image/')) {
        continue;
      }

      const img = document.createElement('img');
      img.file = file;
      img.setAttribute('data-index', i);
      window.overLayerImages[i] = img;

      const imgWrap = buildElement('div', 'image-item', imgList);
      imgWrap.setAttribute('data-index', i);
      imgWrap.appendChild(img);

      const imgTitle = document.createElement('h3');
      const imgSize = document.createElement('p');

      imgWrap.onclick = setOverlay;

      const reader = new FileReader();
      reader.onload = (function (aImg) {
        return function (e) {
          aImg.src = e.target.result;
        };
      })(img);
      reader.readAsDataURL(file);
    }
    imgListTitle.classList.remove('underline');
    imgListTitle.innerHTML = 'overlays<span>&#9663;</span>';
    setImageDrawer('open');
  };

  const setOverlay = (e) => {
    const existingOverlay = document.querySelector('img.overlayer-overlay');

    if (existingOverlay) existingOverlay.remove();

    const idx = e.target.getAttribute('data-index');

    const overlay = window.overLayerImages[idx].cloneNode(false);
    overlay.classList.add('overlayer-overlay');
    document.querySelector('body').appendChild(overlay);
    setImageDrawer('closed');
    addOverlayToggles();

    const overlayToggle = document.querySelector('input.overlay-toggle');
    overlayToggle.disabled = false;
    toggleOverlayCheckbox();
  };

  const addOverlayToggles = () => {
    document.addEventListener('keydown', (e) => {
      const code = e.keyCode || e.which;
      if (code == 91 || code == 93 || code == 17) {
        toggleOverlay();
      }
    });

    document.addEventListener('keyup', (e) => {
      const code = e.keyCode || e.which;
      if (code == 91 || code == 93 || code == 17) {
        toggleOverlay();
      }
    });
  };

  const triggerFileInputClick = () => {
    document.querySelector('input.file-input').click();
  };

  const toggleOverlayCheckbox = () => {
    const overlayToggle = document.querySelector('input.overlay-toggle');
    overlayToggle.checked = !overlayToggle.checked;
  };

  const toggleOverlay = (e) => {
    const overlay = document.querySelector('img.overlayer-overlay');
    if (overlay) {
      // from function call, not from click event
      if (!e) toggleOverlayCheckbox();
      overlay.classList.toggle('hidden');
    }
  };

  ///////////////////////////////
  // Build Toolbar
  ///////////////////////////////
  const toolbarEl = buildElement('div', 'overlayer-toolbar', document.querySelector('body'));

  const toolbarForm = buildElement('form', 'form', toolbarEl);

  const toolbarFileInput = buildElement('input', 'file-input', toolbarForm);
  toolbarFileInput.type = 'file';
  toolbarFileInput.setAttribute('multiple', true);

  const overlayToggleWrap = buildElement('div', 'overlay-toggle-wrap', toolbarEl);
  const overlayToggleTitle = buildElement('h5', 'overlay-toggle-title', overlayToggleWrap);
  overlayToggleTitle.innerHTML = 'Toggle Overlay (Ctrl/Cmd)';
  const overlayToggle = buildElement('input', 'overlay-toggle', overlayToggleWrap);
  overlayToggle.type = 'checkbox';
  overlayToggle.setAttribute('id', 'switch');
  overlayToggle.disabled = true;
  const overlayToggleLabel = buildElement('label', 'overlay-toggle-label', overlayToggleWrap);
  overlayToggleLabel.setAttribute('for', 'switch');

  const imgListWrap = buildElement('div', 'image-list-wrap', toolbarEl);
  const imgListAdd = buildElement('p', 'image-list-add', imgListWrap);

  const imgListTitle = buildElement('h5', 'image-list-title', imgListWrap);
  imgListTitle.addEventListener('click', setImageDrawer);
  imgListTitle.innerHTML = 'add overlay';
  imgListTitle.classList.add('underline');

  const imgList = buildElement('div', 'image-list', imgListWrap);

  ///////////////////////////////
  // Toolbar Logic
  ///////////////////////////////
  toolbarFileInput.addEventListener('change', handleFiles, false);
  overlayToggle.addEventListener('change', toggleOverlay);
}
