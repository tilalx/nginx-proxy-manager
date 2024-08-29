import { View } from 'backbone.marionette';
import ItemView  from './item';
import template  from './main.ejs';

const TableBody = Mn.CollectionView.extend({
    tagName:   'tbody',
    childView: ItemView
});

export default View.extend({
    tagName:   'table',
    className: 'table table-hover table-outline table-vcenter card-table',
    template:  template,

    regions: {
        body: {
            el:             'tbody',
            replaceElement: true
        }
    },

    onRender: function () {
        this.showChildView('body', new TableBody({
            collection: this.collection
        }));
    }
});
