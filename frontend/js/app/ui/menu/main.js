import $           from 'jquery';
import { View } from 'backbone.marionette';
import Controller  from '../../controller';
import Cache       from '../../cache';
import template    from './main.ejs';

export default View.extend({
    id:        'menu',
    className: 'header collapse d-lg-flex p-0',
    template:  template,

    ui: {
        links: 'a'
    },

    events: {
        'click @ui.links': function (e) {
            let href = $(e.currentTarget).attr('href');
            if (href !== '#') {
                e.preventDefault();
                Controller.navigate(href, true);
            }
        }
    },

    templateContext: {
        isAdmin: function () {
            return Cache.User.isAdmin();
        },

        canShow: function (perm) {
            return Cache.User.isAdmin() || Cache.User.canView(perm);
        }
    },

    initialize: function () {
        this.listenTo(Cache.User, 'change', this.render);
    }
});
