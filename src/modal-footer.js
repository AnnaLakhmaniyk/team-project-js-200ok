// const refs = {
//   openModalBtn: document.querySelector('[data-modal-open]'),
//   closeModalBtn: document.querySelector('[data-modal-close]'),
//   modal: document.querySelector('[data-modal]'),
// };

controlModal('[data-modal-open]', '[data-modal-close]', '[data-modal]');

function controlModal(openModalBtn, closeModalBtn, modal) {
  const refs = {
    openModalBtn: document.querySelector(openModalBtn),
    closeModalBtn: document.querySelector(closeModalBtn),
    modal: document.querySelector(modal),
  };

  // refs.closeModalBtn.addEventListener('click', () => {
  //   refs.modal.classList.toggle('is-hidden');
  //   document.removeEventListener('keydown', closeEsc);

  //   const body = document.body;
  //   const scrollY = body.style.top;
  //   body.style.position = '';
  //   body.style.top = '';
  //   body.style.width = '';
  //   window.scrollTo(0, parseInt(scrollY || '0') * -1);
  // });

  function closeEmptyField(evt) {
    if (evt.target === evt.currentTarget) {
      closeModal();
    }
  }
  function showModal(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    document.addEventListener('keydown', closeEsc);
    refs.modal.classList.toggle('is-hidden');
    const scrollY =
      document.documentElement.style.getPropertyValue('--scroll-y');
    const body = document.body;
    body.style.position = 'fixed';
    body.style.width = '100%';
    body.style.top = `-${scrollY}`;
  }
  function closeModal(evt) {
    refs.modal.classList.toggle('is-hidden');
    document.removeEventListener('keydown', closeEsc);

    const body = document.body;
    const scrollY = body.style.top;
    body.style.position = '';
    body.style.top = '';
    body.style.width = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
  }

  function closeEsc(evt) {
    if (evt.key === 'Escape') {
      closeModal();
    }
  }
  refs.openModalBtn.addEventListener('click', showModal);
  refs.closeModalBtn.addEventListener('click', closeModal);
  refs.modal.addEventListener('click', closeEmptyField);
}
