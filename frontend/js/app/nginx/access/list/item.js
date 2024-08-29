import { View } from 'backbone.marionette';
import App       from '../../../main';
import template  from './item.ejs';

export default View.extend({
    template: template,
    tagName:  'tr',

    ui: {
        edit:   'a.edit',
        delete: 'a.delete'
    },

    events: {
        'click @ui.edit': function (e) {
            e.preventDefault();
            App.Controller.showNginxAccessListForm(this.model);
        },

        'click @ui.delete': function (e) {
            e.preventDefault();
            App.Controller.showNginxAccessListDeleteConfirm(this.model);
        }
    },

    templateContext: {
        canManage: App.Cache.User.canManage('access_lists')
    },

    initialize: function () {
        this.listenTo(this.model, 'change', this.render);
    }
});
