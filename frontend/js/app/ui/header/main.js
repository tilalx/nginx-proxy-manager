import $           from 'jquery';
import { View } from 'backbone.marionette';
import i18n        from '../../i18n';
import Cache       from '../../cache';
import Controller  from '../../controller';
import Tokens      from '../../tokens';
import template    from './main.ejs';

export default View.extend({
    id:        'header',
    className: 'header',
    template:  template,

    ui: {
        link:     'a',
        details:  'a.edit-details',
        password: 'a.change-password'
    },

    events: {
        'click @ui.details': function (e) {
            e.preventDefault();
            Controller.showUserForm(Cache.User);
        },

        'click @ui.password': function (e) {
            e.preventDefault();
            Controller.showUserPasswordForm(Cache.User);
        },

        'click @ui.link': function (e) {
            e.preventDefault();
            let href = $(e.currentTarget).attr('href');

            switch (href) {
                case '/':
                    Controller.showDashboard();
                    break;
                case '/logout':
                    Controller.logout();
                    break;
            }
        }
    },

    templateContext: {
        getUserField: function (field, default_val) {
            return Cache.User.get(field) || default_val;
        },

        getRole: function () {
            return i18n('roles', Cache.User.isAdmin() ? 'admin' : 'user');
        },

        getLogoutText: function () {
            if (Tokens.getTokenCount() > 1) {
                return i18n('main', 'sign-in-as', {name: Tokens.getNextTokenName()});
            }

            return i18n('str', 'sign-out');
        }
    },

    initialize: function () {
        this.listenTo(Cache.User, 'change', this.render);
    }
});
