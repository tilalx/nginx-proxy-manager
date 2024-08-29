import { View } from 'backbone.marionette';
import App from '../../main';
import RedirectionHostModel from '../../../models/redirection-host';
import ListView from './list/main';
import ErrorView from '../../error/main';
import EmptyView from '../../empty/main';
import template from './main.ejs';

export default View.extend({
    id: 'nginx-redirection',
    template: template,

    ui: {
        list_region: '.list-region',
        add: '.add-item',
        help: '.help',
        dimmer: '.dimmer',
        search: '.search-form',
        query: 'input[name="source-query"]'
    },

    fetch: App.Api.Nginx.RedirectionHosts.getAll,

    showData(response) {
        this.showChildView('list_region', new ListView({
            collection: new RedirectionHostModel.Collection(response)
        }));
    },

    showError(err) {
        this.showChildView('list_region', new ErrorView({
            code: err.code,
            message: err.message,
            retry: function () {
                App.Controller.showNginxRedirection();
            }
        }));
        console.error(err);
    },

    showEmpty() {
        let manage = App.Cache.User.canManage('redirection_hosts');

        this.showChildView('list_region', new EmptyView({
            title: App.i18n('redirection-hosts', 'empty'),
            subtitle: App.i18n('all-hosts', 'empty-subtitle', { manage: manage }),
            link: manage ? App.i18n('redirection-hosts', 'add') : null,
            btn_color: 'yellow',
            permission: 'redirection_hosts',
            action: function () {
                App.Controller.showNginxRedirectionForm();
            }
        }));
    },

    regions: {
        list_region: '@ui.list_region'
    },

    events: {
        'click @ui.add': function (e) {
            e.preventDefault();
            App.Controller.showNginxRedirectionForm();
        },

        'click @ui.help': function (e) {
            e.preventDefault();
            App.Controller.showHelp(App.i18n('redirection-hosts', 'help-title'), App.i18n('redirection-hosts', 'help-content'));
        },

        'submit @ui.search': function (e) {
            e.preventDefault();
            let query = this.ui.query.val();

            this.fetch(['owner', 'certificate'], query)
                .then(response => this.showData(response))
                .catch(err => {
                    this.showError(err);
                });
        }
    },

    templateContext: {
        showAddButton: App.Cache.User.canManage('proxy_hosts')
    },

    onRender() {
        let view = this;

        view.fetch(['owner', 'certificate'])
            .then(response => {
                if (!view.isDestroyed()) {
                    if (response && response.length) {
                        view.showData(response);
                    } else {
                        view.showEmpty();
                    }
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
