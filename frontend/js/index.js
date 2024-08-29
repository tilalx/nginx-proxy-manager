// This has to exist here so that Webpack picks it up
import '../scss/styles.scss';
import '@tabler/core/dist/js/tabler.min.js';
import App from './app/main';

String.prototype.toHtmlEntities = function() {
    return this.replace(/./gm, function(s) {
        // return "&#" + s.charCodeAt(0) + ";";
        return (s.match(/[a-z0-9\s]+/i)) ? s : "&#" + s.charCodeAt(0) + ";";
    });
};

document.addEventListener('DOMContentLoaded', () => {
    App.start();
});