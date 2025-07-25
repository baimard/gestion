"use strict";
(self["webpackChunkgestion"] = self["webpackChunkgestion"] || []).push([[771],{

/***/ 5771:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PublicAuthPrompt)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(5471);
/* harmony import */ var _nextcloud_browser_storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9097);
/* harmony import */ var _nextcloud_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1777);
/* harmony import */ var _nextcloud_dialogs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5168);
/* harmony import */ var _nextcloud_vue_components_NcDialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9340);
/* harmony import */ var _nextcloud_vue_components_NcNoteCard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1587);
/* harmony import */ var _nextcloud_vue_components_NcTextField__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2182);
/* harmony import */ var _plugin_vue2_normalizer_jrlE7CJU_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(3095);
/* harmony import */ var _nextcloud_files__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(2970);









/*!
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
function getGuestNameValidity(name) {
  if (name.trim() === "") {
    return (0,_plugin_vue2_normalizer_jrlE7CJU_mjs__WEBPACK_IMPORTED_MODULE_6__.t)("Names must not be empty.");
  }
  if (name.startsWith(".")) {
    return (0,_plugin_vue2_normalizer_jrlE7CJU_mjs__WEBPACK_IMPORTED_MODULE_6__.t)("Names must not start with a dot.");
  }
  try {
    (0,_nextcloud_files__WEBPACK_IMPORTED_MODULE_7__/* .validateFilename */ .KT)(name);
    return "";
  } catch (error) {
    if (!(error instanceof _nextcloud_files__WEBPACK_IMPORTED_MODULE_7__/* .InvalidFilenameError */ .di)) {
      throw error;
    }
    switch (error.reason) {
      case _nextcloud_files__WEBPACK_IMPORTED_MODULE_7__/* .InvalidFilenameErrorReason */ .nF.Character:
        return (0,_plugin_vue2_normalizer_jrlE7CJU_mjs__WEBPACK_IMPORTED_MODULE_6__.t)('"{char}" is not allowed inside a name.', { char: error.segment });
      case _nextcloud_files__WEBPACK_IMPORTED_MODULE_7__/* .InvalidFilenameErrorReason */ .nF.ReservedName:
        return (0,_plugin_vue2_normalizer_jrlE7CJU_mjs__WEBPACK_IMPORTED_MODULE_6__.t)('"{segment}" is a reserved name and not allowed.', { segment: error.segment });
      case _nextcloud_files__WEBPACK_IMPORTED_MODULE_7__/* .InvalidFilenameErrorReason */ .nF.Extension:
        if (error.segment.match(/\.[a-z]/i)) {
          return (0,_plugin_vue2_normalizer_jrlE7CJU_mjs__WEBPACK_IMPORTED_MODULE_6__.t)('"{extension}" is not an allowed name.', { extension: error.segment });
        }
        return (0,_plugin_vue2_normalizer_jrlE7CJU_mjs__WEBPACK_IMPORTED_MODULE_6__.t)('Names must not end with "{extension}".', { extension: error.segment });
      default:
        return (0,_plugin_vue2_normalizer_jrlE7CJU_mjs__WEBPACK_IMPORTED_MODULE_6__.t)("Invalid name.");
    }
  }
}
const storage = (0,_nextcloud_browser_storage__WEBPACK_IMPORTED_MODULE_0__/* .getBuilder */ .c0)("public").build();
const _sfc_main = (0,vue__WEBPACK_IMPORTED_MODULE_8__/* .defineComponent */ .pM)({
  name: "PublicAuthPrompt",
  components: {
    NcDialog: _nextcloud_vue_components_NcDialog__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A,
    NcNoteCard: _nextcloud_vue_components_NcNoteCard__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A,
    NcTextField: _nextcloud_vue_components_NcTextField__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A
  },
  props: {
    /**
     * Preselected nickname
     * @default '' No name preselected by default
     */
    nickname: {
      type: String,
      default: ""
    },
    /**
     * Dialog title
     */
    title: {
      type: String,
      default: (0,_plugin_vue2_normalizer_jrlE7CJU_mjs__WEBPACK_IMPORTED_MODULE_6__.t)("Guest identification")
    },
    /**
     * Dialog text under the dialog title
     * e.g 'Enter your name to access the file'
     * @default '' Not shown by default
     */
    text: {
      type: String,
      default: ""
    },
    /**
     * Dialog notice
     * @default 'You are currently not identified.'
     */
    notice: {
      type: String,
      default: (0,_plugin_vue2_normalizer_jrlE7CJU_mjs__WEBPACK_IMPORTED_MODULE_6__.t)("You are currently not identified.")
    },
    /**
     * Dialog submit button label
     * @default 'Submit name'
     */
    submitLabel: {
      type: String,
      default: (0,_plugin_vue2_normalizer_jrlE7CJU_mjs__WEBPACK_IMPORTED_MODULE_6__.t)("Submit name")
    },
    /**
     * Whether the dialog is cancellable
     * @default false
     */
    cancellable: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    return {
      t: _plugin_vue2_normalizer_jrlE7CJU_mjs__WEBPACK_IMPORTED_MODULE_6__.t
    };
  },
  emits: ["close"],
  data() {
    return {
      name: ""
    };
  },
  computed: {
    dialogButtons() {
      const cancelButton = {
        label: (0,_plugin_vue2_normalizer_jrlE7CJU_mjs__WEBPACK_IMPORTED_MODULE_6__.t)("Cancel"),
        variant: "tertiary",
        callback: () => this.$emit("close")
      };
      const submitButton = {
        label: this.submitLabel,
        type: "submit",
        variant: "primary"
      };
      if (this.cancellable) {
        return [cancelButton, submitButton];
      }
      return [submitButton];
    }
  },
  watch: {
    /** Reset name to pre-selected nickname (e.g. Talk / Collabora ) */
    nickname: {
      handler() {
        this.name = this.nickname;
      },
      immediate: true
    },
    name() {
      const newName = this.name.trim?.() || "";
      const input = this.$refs.input?.$el.querySelector("input");
      if (!input) {
        return;
      }
      const validity = getGuestNameValidity(newName);
      input.setCustomValidity(validity);
      input.reportValidity();
    }
  },
  methods: {
    onSubmit() {
      const input = this.$refs.input;
      const nickname = this.name.trim();
      if (nickname === "") {
        input.setCustomValidity((0,_plugin_vue2_normalizer_jrlE7CJU_mjs__WEBPACK_IMPORTED_MODULE_6__.t)("You cannot leave the name empty."));
        input.reportValidity();
        input.focus();
        return;
      }
      if (nickname.length < 2) {
        input.setCustomValidity((0,_plugin_vue2_normalizer_jrlE7CJU_mjs__WEBPACK_IMPORTED_MODULE_6__.t)("Please enter a name with at least 2 characters."));
        input.reportValidity();
        input.focus();
        return;
      }
      try {
        (0,_nextcloud_auth__WEBPACK_IMPORTED_MODULE_1__/* .setGuestNickname */ .L$)(nickname);
      } catch (e) {
        (0,_nextcloud_dialogs__WEBPACK_IMPORTED_MODULE_2__/* .showError */ .Qg)((0,_plugin_vue2_normalizer_jrlE7CJU_mjs__WEBPACK_IMPORTED_MODULE_6__.t)("Failed to set nickname."));
        console.error("Failed to set nickname", e);
        input.focus();
        return;
      }
      storage.setItem("public-auth-prompt-shown", "true");
      this.$emit("close", this.name);
    }
  }
});
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  _vm._self._setupProxy;
  return _c("NcDialog", { staticClass: "public-auth-prompt", attrs: { "buttons": _vm.dialogButtons, "data-cy-public-auth-prompt-dialog": "", "is-form": "", "no-close": "", "name": _vm.title }, on: { "submit": _vm.onSubmit } }, [_vm.text ? _c("p", { staticClass: "public-auth-prompt__text" }, [_vm._v(" " + _vm._s(_vm.text) + " ")]) : _vm._e(), _c("NcNoteCard", { staticClass: "public-auth-prompt__header", attrs: { "text": _vm.notice, "type": "info" } }), _c("NcTextField", { ref: "input", staticClass: "public-auth-prompt__input", attrs: { "data-cy-public-auth-prompt-dialog-name": "", "label": _vm.t("Name"), "placeholder": _vm.t("Enter your name"), "required": !_vm.cancellable, "minlength": "2", "name": "name" }, model: { value: _vm.name, callback: function($$v) {
    _vm.name = $$v;
  }, expression: "name" } })], 1);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ (0,_plugin_vue2_normalizer_jrlE7CJU_mjs__WEBPACK_IMPORTED_MODULE_6__.n)(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false,
  null,
  "143ac1fb"
);
const PublicAuthPrompt = __component__.exports;

//# sourceMappingURL=PublicAuthPrompt-BSFsDqYB.mjs.map


/***/ })

}]);