import { View } from 'backbone.marionette';
import template  from './client.ejs';

export default View.extend({
    template:  template,
    className: 'row'
});
