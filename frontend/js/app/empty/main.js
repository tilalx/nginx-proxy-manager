import { View } from 'backbone.marionette';
import template  from './main.ejs';

export default View.extend({
    className: 'text-center m-7',
    template:  template,

    options: {
        btn_color: 'teal'
    },

    ui: {
        action: 'a'
    },

    events: {
        'click @ui.action': function (e) {
            e.preventDefault();
            this.getOption('action')();
        }
    },

    templateContext: function () {
        return {
            title:     this.getOption('title'),
            subtitle:  this.getOption('subtitle'),
            link:      this.getOption('link'),
            action:    typeof this.getOption('action') === 'function',
            btn_color: this.getOption('btn_color')
        };
    }

});
