const _             = require('underscore');
const Mn            = require('backbone.marionette');
const i18n          = require('../app/i18n');
const Helpers       = require('./helpers');
//const TemplateCache = require('marionette.templatecache');

Mn.View.setRenderer(function(template, data) {
    data              = _.clone(data);
    data.i18n         = i18n;
    data.formatDbDate = Helpers.formatDbDate;

    return _.template(template)(data);
});

export default Mn;