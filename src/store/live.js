export default {
  state: {
    url: getDefaultUrl(),
    playState: false,
    screenState: false,
    viewer: {},
    template: {},
  },
  mutations: {
    changeUrl(state, url) {
      state.url = url;
      localStorage.url = url;
    },
    changePlayState(state, status) {
      state.playState = status;
    },
    changeScreenState(state, status) {
      state.screenState = status;
    },
    setViewer(state, viewer) {
      state.viewer = viewer;
    },
    setTemplate(state, template) {
      state.template = template;
    }
  }
};

function getDefaultUrl() {
  let defaultUrl = "";
  defaultUrl = localStorage.url;
  return defaultUrl;
}

