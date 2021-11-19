import {FILE_TYPES, DEFAULT_URL_AVATAR_PREVIEW} from './utils.js';

const adForm = document.querySelector('.ad-form');
const uploadAvatar = adForm.querySelector('.ad-form__field input[type=file]');
const previewAvatar = adForm.querySelector('.ad-form-header__preview img');
const uploadPhoto = adForm.querySelector('.ad-form__upload input[type=file]');
const previewPhoto = adForm.querySelector('.ad-form__photo');

const createPreviewImage = (filePreview) => {
  filePreview.innerHTML = '<img src="" alt="Фото помещения" width="70" height="70">';
  return filePreview.querySelector('img');
};

const uploadFile = (fileSelected, filePreview) => {
  const file = fileSelected.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((type) => fileName.endsWith(type));

  if (matches) {
    if (fileSelected === uploadPhoto) {
      filePreview = createPreviewImage(filePreview);
    }
    filePreview.src = URL.createObjectURL(file);
  }
};

const onAvatarChange = () => {
  uploadFile(uploadAvatar, previewAvatar);
};

const onPhotoChange = () => {
  uploadFile(uploadPhoto, previewPhoto);
};

const setAvatarListener = () => {
  uploadAvatar.addEventListener('change', onAvatarChange);
};

const setPhotoListener = () => {
  uploadPhoto.addEventListener('change', onPhotoChange);
};

const resetPreview = () => {
  previewPhoto.innerHTML = '';
  previewAvatar.src = DEFAULT_URL_AVATAR_PREVIEW;
};

export {resetPreview, setAvatarListener, setPhotoListener};
