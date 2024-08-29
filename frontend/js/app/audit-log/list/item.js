import { View } from 'backbone.marionette';
import Controller  from '../../controller';
import template    from './item.ejs';

export default View.extend({
    template: template,
    tagName:  'tr',

    ui: {
        meta: 'a.meta'
    },

    events: {
        'click @ui.meta': function (e) {
            e.preventDefault();
            Controller.showAuditMeta(this.model);
        }
    },

    templateContext: {
        more: function() {
            switch (this.object_type) {
                case 'redirection-host':
                case 'stream':
                case 'proxy-host':
                    return this.meta.domain_names.join(', ');
            }

            return '#' + (this.object_id || '?');
        }
    }
});
