import { View } from 'backbone.marionette';
import template  from './main.ejs';

export default View.extend({
    template:  template,
    className: 'alert alert-icon alert-warning m-5',

    ui: {
        retry: 'a.retry'
    },

    events: {
        'click @ui.retry': function (e) {
            e.preventDefault();
            this.getOption('retry')();
        }
    },

    templateContext: function () {
        return {
            message: this.getOption('message'),
            code:    this.getOption('code'),
            retry:   typeof this.getOption('retry') === 'function'
        };
    }

});
