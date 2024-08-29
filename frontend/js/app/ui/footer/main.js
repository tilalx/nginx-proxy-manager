import { View } from 'backbone.marionette';
import template  from './main.ejs';
import Cache     from '../../cache';

export default View.extend({
    className: 'container',
    template:  template,

    templateContext: {
        getVersion: function () {
            return Cache.version || '0.0.0';
        }
    }
});
