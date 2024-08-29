import { View } from 'backbone.marionette';
import template  from './item.ejs';

export default View.extend({
    template:  template,
    className: 'row'
});
