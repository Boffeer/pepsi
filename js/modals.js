"use strict";

/**
 * Фиксирует скрол у body
 *  */
function bodyLock(con) {
  if (con === true) {
    document.body.classList.add("_lock");
  } else if (con === false) {
    document.body.classList.remove("_lock");
  } else if (con === undefined) {
    if (!document.body.classList.contains("_lock")) {
      document.body.classList.add("_lock");
    } else {
      document.body.classList.remove("_lock");
    }
  } else {
    console.error("Неопределенный аргумент у функции bodyLock()");
  }
}

// Открытие модального окна, если в url указан его id
openModalHash();
function openModalHash() {
  if (window.location.hash) {
    const hash = window.location.hash.substring(1);
    const modal = document.querySelector(`.modal#${hash}`);

    if (modal) {
      modal.classList.add("_show");
      bodyLock(true);
      closeWhenClickingOnBg(`#${hash} .modal__content`, modal);
    }
  }
}

// Закрытие модальных окон при клике по крестику
closeModalWhenClickingOnCross();
function closeModalWhenClickingOnCross() {
  const modalElems = document.querySelectorAll(".modal");
  for (let i = 0; i < modalElems.length; i++) {
    const modal = modalElems[i];
    const closeThisModal = modal.querySelector(".modal__close");

    closeThisModal.addEventListener("click", () => {
      modal.classList.remove("_show");
      bodyLock(false);
      resetHash();
    });
  }
}

// Сброс id модального окна в url
function resetHash() {
  const windowTop = window.pageYOffset;
  window.location.hash = "";
  window.scrollTo(0, windowTop);
}

// Открытие модальных окон
openModal();
function openModal() {
  const btnsOpenModal = document.querySelectorAll("[data-modal-open]");
  const btnsCloseModal = document.querySelectorAll("[data-modal-close]");

  for (let i = 0; i < btnsOpenModal.length; i++) {
    const btn = btnsOpenModal[i];

    btn.addEventListener("click", () => {
      const dataBtn = btn.dataset.modalOpen;
      const modalThatOpens = document.querySelector(`#${dataBtn}`);

      btn.classList.add("modal-show");
      modalThatOpens.classList.add("_show");
      bodyLock(true);
      closeWhenClickingOnBg(`#${dataBtn} .modal__content`, modalThatOpens);
      window.location.hash = dataBtn;
    });
  }

  btnsCloseModal.forEach((btn) => {
    btn.addEventListener("click", () => {
      const dataBtn = btn.dataset.modalClose;
      const modalThatCloses = document.querySelector(`#${dataBtn}`);

      btn.classList.remove("modal-show");
      modalThatCloses.classList.remove("_show");
      bodyLock(false);
      resetHash();
    });
  });
}

// Закрытие модального окна при клике по заднему фону
function closeWhenClickingOnBg(itemArray, itemParent, classShow = "_show") {
  document.addEventListener("click", (e) => {
    let itemElems = document.querySelectorAll(itemArray);

    for (let i = 0; i < itemElems.length; i++) {
      const item = itemElems[i];

      const target = e.target,
        itsItem = target == item || item.contains(target),
        itemIsShow = item.classList.contains(classShow);

      if (itemParent) {
        const itsItemParent =
            target == itemParent || itemParent.contains(target),
          itemParentIsShow = itemParent.classList.contains(classShow);

        if (!itsItem && itsItemParent && itemParentIsShow) {
          itemParent.classList.remove(classShow);

          if (document.body.classList.contains("_lock")) {
            bodyLock(false);
          }

          if (window.location.hash === "#" + itemParent.getAttribute("id")) {
            resetHash();
          }
        }
      } else {
        if (!itsItem && itemIsShow) {
          item.classList.remove(classShow);
          if (document.body.classList.contains("_lock")) {
            bodyLock(false);
          }

          if (window.location.hash === "#" + itemParent.getAttribute("id")) {
            resetHash();
          }
        }
      }
    }
  });
}

class Poppa {
  constructor() {
    this.initPopups();
    this.initButtons();

    document.addEventListener("keydown", (e) => {
      const id = this.getLastOpenedId();
      if (e.key === "Escape") {
        console.log(id);
        this.closePop(id);
        // modal.classList.remove("_show");
        // bodyLock(false);
        // resetHash();
      }
    });
  }

  instances = [];
  getPopupsStorage() {
    return document.querySelector(".poppa__storage");
  }

  initPopups() {
    const popups = document.querySelectorAll(".poppa");
    const popupsStorage = document.createElement("div");

    popupsStorage.classList.add("poppa__storage");
    document.body.append(popupsStorage);

    popups.forEach((poppa) => this.makePopupWrapper(poppa));
    // TODO: В прототип будет вписываться метод открыть и закрыть
  }

  makePopupWrapper(poppa) {
    const id = poppa.id;

    const overlay = document.createElement("div");
    overlay.classList.add("poppa__overlay");
    overlay.classList.add(`poppa__overlay--${id}`);
    overlay.dataset.poppaName = id;

    const aligner = document.createElement("div");
    aligner.classList.add("poppa__aligner");

    const closer = document.createElement("button");
    closer.classList.add("poppa__closer");
    closer.innerText = "Закрыть";
    closer.dataset.poppaClose = id;
    const handleClose = () => {
      this.handleClose(closer);
    };
    closer.addEventListener("click", handleClose);
    // TODO: Сделай накидывание нужных ариа атрибутов
    // TODO: Сделай накидывание хрефа, который будет закрывать

    document.querySelector(".poppa__storage").append(overlay);
    aligner.append(poppa);
    overlay.append(aligner);
    overlay.append(closer);

    this.instances.push(overlay);
  }

  initButtons() {
    const openButtons = document.querySelectorAll("[data-poppa-open]");
    openButtons.forEach((button) => {
      button.addEventListener("click", () => {
        this.handleOpen(button);
      });
    });

    const closeButtons = document.querySelectorAll("[data-poppa-close]");
    closeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        this.handleClose(button);
      });
    });
  }

  handleOpen(button) {
    const id = button.dataset.poppaOpen;
    const poppa = document.querySelector(`#${id}`);
    if (poppa) {
      this.openPop(id);
    } else {
      this.makeInfoPop(`Попапа "#${id}" нет. Проверь правильность айди`);
    }
  }
  openPop(id) {
    const pop = this.getPop(id);
    this.getPopupsStorage().append(pop);
    pop.classList.add("_show");
  }

  handleClose(button) {
    const id = button.dataset.poppaClose;
    const poppa = document.querySelector(`#${id}`);
    if (poppa) {
      this.closePop(id);
    } else {
      this.makeInfoPop(`Попапа "#${id}" нет. Проверь правильность айди`);
    }
  }

  closePop(id) {
    const pop = this.getPop(id);
    if (pop.classList.contains("_show")) {
      pop.classList.remove("_show");
    }
  }

  makeInfoPop(text, removeAfter = 6000) {
    const info = document.createElement("div");
    const id = "pop-" + new Date().getTime();
    info.classList.add("poppa");
    info.classList.add("poppa--invalid");
    info.innerHTML = text;
    info.id = id;

    document.body.append(info);

    this.makePopupWrapper(info);
    this.openPop(id);

    setTimeout(() => {
      this.getPop(id).remove();
    }, removeAfter);
  }

  getPop(id) {
    return document.querySelector(`[data-poppa-name="${id}"]`);
  }

  getLastOpenedId() {
    // let storage = this.getPopupsStorage();
    // storage = Array.from(storage.children);
    // return storage[storage.length - 1].dataset.poppaName;
    const opened = [...document.querySelectorAll("._show[data-poppa-name]")];
    return opened[opened.length - 1].dataset.poppaName;
  }
}

new Poppa();
