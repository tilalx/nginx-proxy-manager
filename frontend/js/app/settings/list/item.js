import { View } from 'backbone.marionette';
import App       from '../../main';
import template  from './item.ejs';

export default View.extend({
    template: template,
    tagName:  'tr',

    ui: {
        edit: 'a.edit'
    },

    events: {
        'click @ui.edit': function (e) {
            e.preventDefault();
            App.Controller.showSettingForm(this.model);
        }
    },

    initialize: function () {
        this.listenTo(this.model, 'change', this.render);
    }
});
