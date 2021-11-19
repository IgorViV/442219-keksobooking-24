import {FILE_TYPES, AvatarPreview} from './utils.js';

const adForm = document.querySelector('.ad-form');
const uploadAvatar = adForm.querySelector('.ad-form__field input[type=file]');
const previewAvatar = adForm.querySelector('.ad-form-header__preview img');
const uploadPhoto = adForm.querySelector('.ad-form__upload input[type=file]');
const previewPhoto = adForm.querySelector('.ad-form__photo');

const createPreviewImage = (filePreview) => {
  const imgTemplate = document.querySelector('#card')
    .content
    .querySelector('.popup__photo')
    .cloneNode(true);

  imgTemplate.width = AvatarPreview.WIDTH;
  imgTemplate.height = AvatarPreview.HEIDHT;
  filePreview.appendChild(imgTemplate);

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
  previewPhoto.querySelector('img').remove();
  previewAvatar.src = AvatarPreview.URL;
};

export {resetPreview, setAvatarListener, setPhotoListener};
