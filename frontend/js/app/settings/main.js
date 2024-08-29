import { View } from 'backbone.marionette';
import App           from '../main';
import SettingModel  from '../../models/setting';
import ListView      from './list/main';
import ErrorView     from '../error/main';
import template      from './main.ejs';

export default View.extend({
    id:       'settings',
    template: template,

    ui: {
        list_region: '.list-region',
        add:         '.add-item',
        dimmer:      '.dimmer'
    },

    regions: {
        list_region: '@ui.list_region'
    },

    onRender: function () {
        let view = this;

        App.Api.Settings.getAll()
            .then(response => {
                if (!view.isDestroyed() && response && response.length) {
                    view.showChildView('list_region', new ListView({
                        collection: new SettingModel.Collection(response)
                    }));
                }
            })
            .catch(err => {
                view.showChildView('list_region', new ErrorView({
                    code:    err.code,
                    message: err.message,
                    retry:   function () {
                        App.Controller.showSettings();
                    }
                }));

                console.error(err);
            })
            .then(() => {
                view.ui.dimmer.removeClass('active');
            });
    }
});
