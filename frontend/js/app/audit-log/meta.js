import { View } from 'backbone.marionette';
import template  from './meta.ejs';

export default View.extend({
    template:  template,
    className: 'modal-dialog wide'
});
