"use strict";

/**
 * Get os class for body. It used to fix macos scrollbar issue
 *  */
let os = "unknown";
if (navigator.appVersion.indexOf("Win") != -1) os = "windows";
if (navigator.appVersion.indexOf("Mac") != -1) os = "macos";
if (navigator.appVersion.indexOf("X11") != -1) os = "unix";
if (navigator.appVersion.indexOf("Linux") != -1) os = "linux";
document.body.classList.add("os-" + os);

/**
 * @param string pass string to clipboard
 */
function copyToClipboard(text) {
  if (!text) return;

  var clipboardStorage = document.createElement("input");
  document.querySelector("body").appendChild(clipboardStorage);
  clipboardStorage.setAttribute("value", text);
  clipboardStorage.select();
  document.execCommand("copy");
  clipboardStorage.remove();
}
copyToClipboard;

/**
 * Удаляет у всех элементов items класс itemClass
 *  */
function removeAll(items, itemClass) {
  if (!items && !itemClass) return;

  if (typeof items == "string") {
    items = document.querySelectorAll(items);
  }
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    item.classList.remove(itemClass);
  }
}
removeAll();

/**
 * Debounce
 * @param {Функция для дебаунса} fn
 * @param {Тайминг} time Время перерыва между сраабатыванием функции
 * @returns void
 */
const debounce = function (fn, time) {
  if (!fn && !time) return;
  let timeout;

  return function () {
    let self = this;
    const functionCall = function () {
      return fn.apply(self, arguments);
    };
    clearTimeout(timeout);
    timeout = setTimeout(functionCall, time);
  };
};
debounce;

/**
 * Scroll page to top
 * - [ ] tested
 */
const scrollTopButtons = document.querySelectorAll(".js_scroll-top");
const scrollTop = (event) => {
  event.preventDefault();

  const id = scrollTop.getAttribute("href").substring(1);
  const section = document.querySelector(id);

  if (section) {
    document.scrollIntoView(section, {
      behavior: "smooth",
      block: "start",
      inline: "center",
    });
  }
};
scrollTopButtons.forEach((button) =>
  button.addEventListener("click", (event) => {
    scrollTop(event);
  })
);
