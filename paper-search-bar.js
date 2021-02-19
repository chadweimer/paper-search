import '@polymer/polymer/polymer-legacy.js';

import { IronA11yKeysBehavior } from '@polymer/iron-a11y-keys-behavior/iron-a11y-keys-behavior.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icons/image-icons.js';
import '@polymer/iron-input/iron-input.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/paper-badge/paper-badge.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-styles/default-theme.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import {html} from '@polymer/polymer/lib/utils/html-tag.js';
/**
Bar in which the user can enter search terms and filter

@demo demo/paper-search-bar.html
*/
Polymer({
        is: 'paper-search-bar',
        _template: html`
        <style>
            :host {
                display: block;
            }

            .horizontal-holder {
                background: var(--background-color, white);
                display: block;
                padding: 0 16px;
                @apply --layout-horizontal;
                @apply --layout-center-center;
                height: var(--paper-search-bar-height, 48px); /* To resolve \`min-height\` bug on IE 11 */
                box-sizing: border-box;
            }

            iron-input {
                @apply --layout-flex;
                @apply --layout-vertical;
                height: 100%; /* To resolve \`min-height\` bug on IE 11 */
            }

            .icon {
                color: var(--disabled-text-color);
                @apply --icon-styles;
            }

            #input {
                @apply --layout-flex;
                margin: 0 10px;
                padding: 16px 0;
                cursor: text;
                background: transparent;
                color: inherit;
                @apply --input-styles;
                border: 0;
                outline: 0;
            }
            #input::-ms-clear {
                display: none;
            }

            #input[disabled] {
                @apply --disabled-input-styles;
            }

            .badge {
                --paper-badge-background: var(--paper-red-500);
                --paper-badge-opacity: 1;
                --paper-badge-width: 18px;
                --paper-badge-height: 18px;
                --paper-badge-margin-left: -5px;
                --paper-badge-margin-bottom: -25px;
            }

            .badge[invisible] {
                visibility: hidden;
            }
        </style>

        <div class="horizontal-holder">
            <iron-icon icon="[[icon]]" class="icon"></iron-icon>
            <iron-input bind-value="{{query}}">
                <!-- Define is="iron-input" for backwards compatibility with Polymer 1.x -->
                <input id="input" is="iron-input" placeholder="[[placeholder]]" value="{{value::input}}"></input>
            </iron-input>

            <template is="dom-if" if="[[_shouldShowClear(query, alwaysShowClear)]]">
                <paper-icon-button icon="clear" on-tap="_clear" class="icon"></paper-icon-button>
            </template>
            <template is="dom-if" if="{{!hideFilterButton}}">
                <template is="dom-if" if="{{!disableFilterButton}}">
                    <paper-icon-button id="filter" icon="image:tune" on-tap="_filter" class="icon"></paper-icon-button>
                </template>
                <paper-badge for="filter" label="[[nrSelectedFilters]]" class="badge" invisible$="[[!nrSelectedFilters]]"></paper-badge>
            </template>
        </div>
        `,
        /**
         * Fired when the user requests to open the filtering dialog
         *
         * @event paper-search-filter
         */
         /**
         * Fired when the user requests to search for a query
         *
         * @event paper-search-search
         */
         /**
         * Fired when the user taps the clear icon
         *
         * @event paper-search-clear
         */

        properties: {
            /**
             * Text for which the user is searching
             */
            query: {
                type: String,
                notify: true,
                value: ''
            },
            /**
             * Whether to hide the Filter button. Set attribute "hide-filter-button" to do so.
             */
            hideFilterButton: {
                type: Boolean,
                value: false
            },
            /**
             * Whether to disable the Filter button. Set attribute "disable-filter-button" to do so.
             */
            disableFilterButton: {
                type: Boolean,
                value: false
            },
            /**
             * Number of filters the user has been selected (shown in the badge) (optional)
             */
            nrSelectedFilters: {
                type: Number,
                value: 0
            },
            /**
             * Icon shown in the search background
             */
            icon: {
                type: String,
                value: 'search'
            },
            /**
             * Text shown in the search box if the user didn't enter any query
             */
            placeholder: {
                type: String,
                value: 'Search'
            },
            /**
             * Whether to always show the clear button, vs only when there is a query string
             */
            alwaysShowClear: {
                type: Boolean,
                value: false
            },
        },

        behaviors: [
            IronA11yKeysBehavior
        ],

        keyBindings: {
            'enter': '_search'
        },


        focus: function() {
            this.$.input.focus();
        },

        // Private methods
        _filter: function(e) {
            this.fire('paper-search-filter');
        },
        _clear: function() {
            this.query = "";
            this.$.input.focus();
            his.fire('paper-search-clear');
        },
        _search: function() {
            this.fire('paper-search-search');
        },
        _shouldShowClear: function(query, alwaysShowClear) {
            if (alwaysShowClear) {
                return true;
            }

            return !!query;
        }
});
