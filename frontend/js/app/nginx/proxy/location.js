import locationItemTemplate    from './location-item.ejs';
import { View } from 'backbone.marionette';
import App                     from '../../main';

const LocationView = Mn.View.extend({
    template: locationItemTemplate,
    className: 'location_block',

    ui: {
        toggle:     'input[type="checkbox"]',
        config:     '.config',
        delete:     '.location-delete'
    },

    events: {
        'change @ui.toggle': function(el) {
            if (el.target.checked) {
                this.ui.config.show();
            } else {
                this.ui.config.hide();
            }
        },

        'change .model': function (e) {
            const map = {};
            map[e.target.name] = e.target.value;
            this.model.set(map);
        },

        'click @ui.delete': function () {
            this.model.destroy();
        }
    },

    onRender: function() {
        $(this.ui.config).hide();
    },

    templateContext: function() {
        return {
            i18n: App.i18n
        }
    }
});

const LocationCollectionView = Mn.CollectionView.extend({
    className: 'locations_container',
    childView: LocationView
});

export default {
    LocationCollectionView,
    LocationView
}