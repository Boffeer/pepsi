/**
 * @tabs
 *
 * Табы инициируются все
 * У какой кнопки таба есть класс из js переменной TAB_ACTIVE_CLASS, тот таб и будет активным сразу
 */
const tabsBars = document.querySelectorAll(".b_tabs");
console.log(tabsBars);
const tabsPagesWraps = document.querySelectorAll(".b_tabs-content");
const TAB_ACTIVE_CLASS = "tab--active";

// Добавляем активное состояние для табов, чтоб инициализировать Swiper
tabsBars.forEach((tabsBar) => {
  if (tabsBar.dataset.tabs) {
    tabsPagesWraps.forEach((tabsPagesWrap) => {
      const tabPages = tabsPagesWrap.querySelectorAll(".b_tabs-content__page");
      tabPages.forEach((tabPage) => {
        tabPage.classList.add(TAB_ACTIVE_CLASS);
      });
    });
  }
});

// Задержка нужна, чтобы Swiper слайдеры не разъезжались
setTimeout(() => {
  tabsBars.forEach((tabsBar) => {
    const tabBarButtons = tabsBar.querySelectorAll(".b_tab");
    console.log(tabBarButtons);
    tabBarButtons.forEach((tabButton, buttonIndex) => {
      tabButton.addEventListener("click", () => {
        tabBarButtons.forEach((tab) => {
          tab.classList.remove(TAB_ACTIVE_CLASS);
        });
        tabButton.classList.add(TAB_ACTIVE_CLASS);
        if (tabsBar.dataset.tabs) {
          const tabPages = document
            .querySelector(
              `.b_tabs-content[data-tabs="${tabsBar.dataset.tabs}"]`
            )
            .querySelectorAll(".b_tabs-content__page");

          if (tabPages[buttonIndex]) {
            tabPages.forEach((tabPage) => {
              tabPage.classList.remove(TAB_ACTIVE_CLASS);
            });
            tabPages[buttonIndex].classList.add(TAB_ACTIVE_CLASS);
          }
        } else {
          console.warn(
            `there is no tab pages [data-tab="${tabsBar.dataset.tabs}"]`
          );
        }
      });
    });

    if (tabsBar.dataset.tabs) {
      tabBarButtons.forEach((tabButton) => {
        if (tabButton.classList.contains(TAB_ACTIVE_CLASS)) {
          tabButton.click();
        }
      });
    }
  });
}, 150);

/**
 * Youtube
 */
// 2. This code loads the IFrame Player API code asynchronously.
// var tag = document.createElement("script");

// tag.src = "https://www.youtube.com/iframe_api";
// var firstScriptTag = document.getElementsByTagName("script")[0];
// firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// // 3. This function creates an <iframe> (and YouTube player)
// //    after the API code downloads.
// var player;
// function onYouTubeIframeAPIReady() {
//   player = new YT.Player("player", {
//     width: "100%",
//     videoId: "XpRbFYtR0_A",
//     playerVars: { autoplay: 1, playsinline: 1 },
//     events: {
//       onReady: onPlayerReady,
//     },
//   });
// }

// // 4. The API will call this function when the video player is ready.
// function onPlayerReady(event) {
//   event.target.mute();
//   event.target.playVideo();
// }

// ---

// Load the IFrame Player API code asynchronously.
var tag = document.createElement("script");
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
// Replace the 'ytplayer' element with an <iframe> and
// YouTube player after the API code downloads.
var player;
function onYouTubePlayerAPIReady() {
  player = new YT.Player("ytplayer", {
    videoId: "XpRbFYtR0_A",
    events: {
      onReady: onPlayerReady,
      onStateChange: cahngePlayerState,
    },
    playerVars: {
      autoplay: 1,
      controls: 0,
      showinfo: 0,
      modestbranding: 1,
      fs: 0,
      cc_load_policy: 0,
      iv_load_policy: 3,
      autohide: 1,
      playsinline: 1,
      mute: 1,
      loop: 1,
      rel: 0,
      version: 3,
      origin: window.location.href,
    },
  });
}

function onPlayerReady(event) {
  event.target.setVolume(40);
  event.target.playVideo();
}

function cahngePlayerState(data) {
  console.log(data);
  if (data.data == 1) {
    document.querySelector(".hero-bg__video-wrap").style.display = "block";
  } else if (data.data == 0) {
    document.querySelector(".hero-bg__video-wrap").remove();
  }
}
