"use strict";
(globalThis["webpackChunkgestion"] = globalThis["webpackChunkgestion"] || []).push([[580],{

/***/ 1580
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PublicAuthPrompt)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(641);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(953);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(33);
/* harmony import */ var _nextcloud_auth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1777);
/* harmony import */ var _nextcloud_browser_storage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3053);
/* harmony import */ var _nextcloud_vue_components_NcDialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3140);
/* harmony import */ var _nextcloud_vue_components_NcNoteCard__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7613);
/* harmony import */ var _nextcloud_vue_components_NcTextField__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(7859);
/* harmony import */ var _index_C1xmmKTZ_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(7651);
/* harmony import */ var _nextcloud_files__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(1379);
/* harmony import */ var _plugin_vue_export_helper_1tPrXgE0_mjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(240);









/*!
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
function getGuestNameValidity(name) {
  if (name.trim() === "") {
    return (0,_index_C1xmmKTZ_mjs__WEBPACK_IMPORTED_MODULE_8__.t)("Names must not be empty.");
  }
  if (name.startsWith(".")) {
    return (0,_index_C1xmmKTZ_mjs__WEBPACK_IMPORTED_MODULE_8__.t)("Names must not start with a dot.");
  }
  if (name.length > 64) {
    return (0,_index_C1xmmKTZ_mjs__WEBPACK_IMPORTED_MODULE_8__.t)("Names may be at most 64 characters long.");
  }
  try {
    (0,_nextcloud_files__WEBPACK_IMPORTED_MODULE_9__/* .validateFilename */ .KT)(name);
    return "";
  } catch (error) {
    if (!(error instanceof _nextcloud_files__WEBPACK_IMPORTED_MODULE_9__/* .InvalidFilenameError */ .di)) {
      throw error;
    }
    switch (error.reason) {
      case _nextcloud_files__WEBPACK_IMPORTED_MODULE_9__/* .InvalidFilenameErrorReason */ .nF.Character:
        return (0,_index_C1xmmKTZ_mjs__WEBPACK_IMPORTED_MODULE_8__.t)('"{char}" is not allowed inside a name.', { char: error.segment });
      case _nextcloud_files__WEBPACK_IMPORTED_MODULE_9__/* .InvalidFilenameErrorReason */ .nF.ReservedName:
        return (0,_index_C1xmmKTZ_mjs__WEBPACK_IMPORTED_MODULE_8__.t)('"{segment}" is a reserved name and not allowed.', { segment: error.segment });
      case _nextcloud_files__WEBPACK_IMPORTED_MODULE_9__/* .InvalidFilenameErrorReason */ .nF.Extension:
        if (error.segment.match(/\.[a-z]/i)) {
          return (0,_index_C1xmmKTZ_mjs__WEBPACK_IMPORTED_MODULE_8__.t)('"{extension}" is not an allowed name.', { extension: error.segment });
        }
        return (0,_index_C1xmmKTZ_mjs__WEBPACK_IMPORTED_MODULE_8__.t)('Names must not end with "{extension}".', { extension: error.segment });
      default:
        return (0,_index_C1xmmKTZ_mjs__WEBPACK_IMPORTED_MODULE_8__.t)("Invalid name.");
    }
  }
}
const _hoisted_1 = {
  key: 0,
  class: "public-auth-prompt__text"
};
const _sfc_main = /* @__PURE__ */ (0,vue__WEBPACK_IMPORTED_MODULE_0__/* .defineComponent */ .pM)({
  __name: "PublicAuthPrompt",
  props: {
    nickname: { default: "" },
    title: { default: (0,_index_C1xmmKTZ_mjs__WEBPACK_IMPORTED_MODULE_8__.t)("Guest identification") },
    text: { default: "" },
    notice: { default: "" },
    submitLabel: { default: (0,_index_C1xmmKTZ_mjs__WEBPACK_IMPORTED_MODULE_8__.t)("Submit name") },
    cancellable: { type: Boolean }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const inputElement = (0,vue__WEBPACK_IMPORTED_MODULE_0__/* .useTemplateRef */ .rk)("input");
    const storage = (0,_nextcloud_browser_storage__WEBPACK_IMPORTED_MODULE_4__/* .getBuilder */ .c0)("public").build();
    const name = (0,vue__WEBPACK_IMPORTED_MODULE_1__/* .ref */ .KR)(props.nickname);
    (0,vue__WEBPACK_IMPORTED_MODULE_0__/* .watch */ .wB)(() => props.nickname, () => {
      name.value = props.nickname;
    });
    (0,vue__WEBPACK_IMPORTED_MODULE_0__/* .watch */ .wB)(name, (newName) => {
      const validity = getGuestNameValidity(newName);
      if (!validity && inputElement.value) {
        setCustomValidity(validity);
        return;
      }
    });
    const buttons = (0,vue__WEBPACK_IMPORTED_MODULE_0__/* .computed */ .EW)(() => {
      const cancelButton = {
        label: (0,_index_C1xmmKTZ_mjs__WEBPACK_IMPORTED_MODULE_8__.t)("Cancel"),
        variant: "tertiary",
        callback: () => emit("close")
      };
      const submitButton = {
        label: props.submitLabel,
        type: "submit",
        variant: "primary"
      };
      if (props.cancellable) {
        return [cancelButton, submitButton];
      }
      return [submitButton];
    });
    const defaultNotice = (0,vue__WEBPACK_IMPORTED_MODULE_0__/* .computed */ .EW)(() => {
      if (props.notice) {
        return props.notice;
      }
      if (name.value) {
        return (0,_index_C1xmmKTZ_mjs__WEBPACK_IMPORTED_MODULE_8__.t)("You are currently identified as {nickname}.", { nickname: name.value });
      }
      return (0,_index_C1xmmKTZ_mjs__WEBPACK_IMPORTED_MODULE_8__.t)("You are currently not identified.");
    });
    function onSubmit() {
      const nickname = name.value.trim();
      const validity = getGuestNameValidity(nickname);
      if (validity) {
        setCustomValidity(validity);
        return;
      }
      if (nickname === "") {
        setCustomValidity((0,_index_C1xmmKTZ_mjs__WEBPACK_IMPORTED_MODULE_8__.t)("You cannot leave the name empty."));
        return;
      }
      if (nickname.length < 2) {
        setCustomValidity((0,_index_C1xmmKTZ_mjs__WEBPACK_IMPORTED_MODULE_8__.t)("Please enter a name with at least 2 characters."));
        return;
      }
      try {
        (0,_nextcloud_auth__WEBPACK_IMPORTED_MODULE_3__/* .setGuestNickname */ .L$)(nickname);
      } catch (error) {
        _index_C1xmmKTZ_mjs__WEBPACK_IMPORTED_MODULE_8__.l.error("Failed to set nickname", { error });
        (0,_index_C1xmmKTZ_mjs__WEBPACK_IMPORTED_MODULE_8__.s)((0,_index_C1xmmKTZ_mjs__WEBPACK_IMPORTED_MODULE_8__.t)("Failed to set nickname."));
        inputElement.value.focus();
        return;
      }
      storage.setItem("public-auth-prompt-shown", "true");
      emit("close", name.value);
    }
    function setCustomValidity(message) {
      if (inputElement.value) {
        inputElement.value.setCustomValidity(message);
        inputElement.value.reportValidity();
        inputElement.value.focus();
      }
    }
    return (_ctx, _cache) => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__/* .openBlock */ .uX)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__/* .createBlock */ .Wv)((0,vue__WEBPACK_IMPORTED_MODULE_1__/* .unref */ .R1)(_nextcloud_vue_components_NcDialog__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A), {
        buttons: buttons.value,
        class: "public-auth-prompt",
        "data-cy-public-auth-prompt-dialog": "",
        isForm: "",
        noClose: "",
        name: __props.title,
        onSubmit
      }, {
        default: (0,vue__WEBPACK_IMPORTED_MODULE_0__/* .withCtx */ .k6)(() => [
          __props.text ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__/* .openBlock */ .uX)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__/* .createElementBlock */ .CE)("p", _hoisted_1, (0,vue__WEBPACK_IMPORTED_MODULE_2__/* .toDisplayString */ .v_)(__props.text), 1)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__/* .createCommentVNode */ .Q3)("", true),
          (0,vue__WEBPACK_IMPORTED_MODULE_0__/* .createVNode */ .bF)((0,vue__WEBPACK_IMPORTED_MODULE_1__/* .unref */ .R1)(_nextcloud_vue_components_NcNoteCard__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A), {
            class: "public-auth-prompt__header",
            text: defaultNotice.value,
            type: "info"
          }, null, 8, ["text"]),
          (0,vue__WEBPACK_IMPORTED_MODULE_0__/* .createVNode */ .bF)((0,vue__WEBPACK_IMPORTED_MODULE_1__/* .unref */ .R1)(_nextcloud_vue_components_NcTextField__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A), {
            ref: "input",
            modelValue: name.value,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => name.value = $event),
            class: "public-auth-prompt__input",
            "data-cy-public-auth-prompt-dialog-name": "",
            label: (0,vue__WEBPACK_IMPORTED_MODULE_1__/* .unref */ .R1)(_index_C1xmmKTZ_mjs__WEBPACK_IMPORTED_MODULE_8__.t)("Name"),
            placeholder: (0,vue__WEBPACK_IMPORTED_MODULE_1__/* .unref */ .R1)(_index_C1xmmKTZ_mjs__WEBPACK_IMPORTED_MODULE_8__.t)("Enter your name"),
            required: !__props.cancellable,
            minlength: "2",
            maxlength: "64",
            name: "name"
          }, null, 8, ["modelValue", "label", "placeholder", "required"])
        ]),
        _: 1
      }, 8, ["buttons", "name"]);
    };
  }
});
const PublicAuthPrompt = /* @__PURE__ */ (0,_plugin_vue_export_helper_1tPrXgE0_mjs__WEBPACK_IMPORTED_MODULE_10__._)(_sfc_main, [["__scopeId", "data-v-bd4b7f1b"]]);

//# sourceMappingURL=PublicAuthPrompt-7_GNN76e.mjs.map


/***/ }

}]);