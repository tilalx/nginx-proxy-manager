import Backbone  from 'backbone';

const model = Backbone.Model.extend({
    idAttribute: 'id',

    defaults: function () {
        return {
            name: ''
        };
    }
});

export default {
    Model:      model,
    Collection: Backbone.Collection.extend({
        model: model
    })
};
