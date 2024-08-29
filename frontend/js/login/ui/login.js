import $         from 'jquery';
import { View } from 'backbone.marionette';
import template  from './login.ejs';
import Api       from '../../app/api';
import i18n      from '../../app/i18n';

export default View.extend({
    template:  template,
    className: 'page-single',

    ui: {
        form:     'form',
        identity: 'input[name="identity"]',
        secret:   'input[name="secret"]',
        error:    '.secret-error',
        button:   'button'
    },

    events: {
        'submit @ui.form': function (e) {
            e.preventDefault();
            this.ui.button.addClass('btn-loading').prop('disabled', true);
            this.ui.error.hide();

            Api.Tokens.login(this.ui.identity.val(), this.ui.secret.val(), true)
                .then(() => {
                    window.location = '/';
                })
                .catch(err => {
                    this.ui.error.text(err.message).show();
                    this.ui.button.removeClass('btn-loading').prop('disabled', false);
                });
        }
    },

    templateContext: {
        i18n:       i18n,
        getVersion: function () {
            return $('#login').data('version');
        }
    }
});
