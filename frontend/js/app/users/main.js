import { View } from 'backbone.marionette';
import App        from '../main';
import UserModel  from '../../models/user';
import ListView   from './list/main';
import ErrorView  from '../error/main';
import template   from './main.ejs';

export default View.extend({
    id:       'users',
    template: template,

    ui: {
        list_region: '.list-region',
        add:         '.add-item',
        dimmer:      '.dimmer',
        search:      '.search-form',
        query:       'input[name="source-query"]'
    },

    fetch: App.Api.Users.getAll,

    showData: function(response) {
        this.showChildView('list_region', new ListView({
            collection: new UserModel.Collection(response)
        }));
    },

    showError: function(err) {
        this.showChildView('list_region', new ErrorView({
            code:    err.code,
            message: err.message,
            retry:   function () {
                App.Controller.showUsers();
            }
        }));

        console.error(err);
    },

    regions: {
        list_region: '@ui.list_region'
    },

    events: {
        'click @ui.add': function (e) {
            e.preventDefault();
            App.Controller.showUserForm(new UserModel.Model());
        },

        'submit @ui.search': function (e) {
            e.preventDefault();
            let query = this.ui.query.val();

            this.fetch(['permissions'], query)
                .then(response => this.showData(response))
                .catch(err => {
                    this.showError(err);
                });
        }
    },

    onRender: function () {
        let view = this;

        view.fetch(['permissions'])
            .then(response => {
                if (!view.isDestroyed() && response && response.length) {
                    view.showData(response);
                }
            })
            .catch(err => {
                view.showError(err);
            })
            .then(() => {
                view.ui.dimmer.removeClass('active');
            });
    }
});
