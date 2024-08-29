import Backbone  from 'backbone';

const model = Backbone.Model.extend({
    idAttribute: 'id',

    defaults: function () {
        return {
            id:          undefined,
            name:        '',
            description: '',
            value:       null,
            meta:        []
        };
    }
});

export default {
    Model:      model,
    Collection: Backbone.Collection.extend({
        model: model
    })
};
