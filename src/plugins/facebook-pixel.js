export default {
  install: (app, options) => {
    app.config.globalProperties.$fbTrack = (eventName, parameters = {}) => {
      if (window.fbq) {
        window.fbq('track', eventName, parameters);
      }
    };
  }
}; 