import { View } from 'backbone.marionette';
import template  from './main.ejs';

export default View.extend({
    template:  template,
    className: 'modal-dialog wide',

    templateContext: function () {
        let content = this.getOption('content').split("\n");

        return {
            title:   this.getOption('title'),
            content: '<p>' + content.join('</p><p>') + '</p>'
        };
    }
});
