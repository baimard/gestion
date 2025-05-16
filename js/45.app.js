"use strict";
(self["webpackChunkgestion"] = self["webpackChunkgestion"] || []).push([[45],{

/***/ 40045:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  confirm: () => (/* binding */ H),
  filepicker: () => (/* binding */ z)
});

// EXTERNAL MODULE: ./node_modules/path/path.js
var path = __webpack_require__(43627);
// EXTERNAL MODULE: ./node_modules/@nextcloud/dialogs/dist/chunks/index-X06k2874.mjs + 1 modules
var index_X06k2874 = __webpack_require__(15754);
// EXTERNAL MODULE: ./node_modules/toastify-js/src/toastify.js
var toastify = __webpack_require__(7736);
// EXTERNAL MODULE: ./node_modules/vue/dist/vue.runtime.esm.js
var vue_runtime_esm = __webpack_require__(85471);
// EXTERNAL MODULE: ./node_modules/@nextcloud/dialogs/dist/chunks/DialogBase-aNq6aLpb.mjs + 2 modules
var DialogBase_aNq6aLpb = __webpack_require__(71712);
;// CONCATENATED MODULE: ./node_modules/@mdi/svg/svg/folder-multiple.svg?raw
/* harmony default export */ const folder_multipleraw = (__webpack_require__.p + "235da7467729c2a76213a5c455d27830.svg");
;// CONCATENATED MODULE: ./node_modules/@mdi/svg/svg/folder-move.svg?raw
/* harmony default export */ const folder_moveraw = (__webpack_require__.p + "cabd619668a3d6c7c5c6188561d544b1.svg");
;// CONCATENATED MODULE: ./node_modules/@nextcloud/dialogs/dist/legacy.mjs







/**
 * @copyright Copyright (c) 2023 Ferdinand Thiessen <opensource@fthiessen.de>
 *
 * @author Ferdinand Thiessen <opensource@fthiessen.de>
 *
 * @license AGPL-3.0-or-later
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */
const M = (v, i, a = () => {
}) => {
  const u = document.createElement("div");
  (document.querySelector(i == null ? void 0 : i.container) || document.body).appendChild(u);
  const r = new vue_runtime_esm/* default */.Ay({
    el: u,
    name: "VueDialogHelper",
    render: (h) => h(v, {
      props: i,
      on: {
        close: () => {
          a(), r.$destroy();
        }
      }
    })
  });
};
async function z(v, i, a = !1, u, C, r = index_X06k2874.a.Choose, h, m) {
  const y = (e, c) => {
    const n = (t) => {
      const s = (t == null ? void 0 : t.root) || "";
      let l = (t == null ? void 0 : t.path) || "";
      return l.startsWith(s) && (l = l.slice(s.length) || "/"), l;
    };
    return a ? (t) => e(t.map(n), c) : (t) => e(n(t[0]), c);
  }, P = (e) => {
    var c, n, t, s, l, p;
    return {
      id: e.fileid || null,
      path: e.path,
      mimetype: e.mime || null,
      mtime: ((c = e.mtime) == null ? void 0 : c.getTime()) || null,
      permissions: e.permissions,
      name: ((n = e.attributes) == null ? void 0 : n.displayname) || e.basename,
      etag: ((t = e.attributes) == null ? void 0 : t.etag) || null,
      hasPreview: ((s = e.attributes) == null ? void 0 : s.hasPreview) || null,
      mountType: ((l = e.attributes) == null ? void 0 : l.mountType) || null,
      quotaAvailableBytes: ((p = e.attributes) == null ? void 0 : p.quotaAvailableBytes) || null,
      icon: null,
      sharePermissions: null
    };
  };
  let b;
  r === index_X06k2874.a.Custom ? (b = [], (m.buttons || []).forEach((e) => {
    b.push({
      callback: y(i, e.type),
      label: e.text,
      type: e.defaultButton ? "primary" : "secondary"
    });
  })) : b = (e, c) => {
    var n, t, s;
    const l = [], p = ((t = (n = e == null ? void 0 : e[0]) == null ? void 0 : n.attributes) == null ? void 0 : t.displayName) || ((s = e == null ? void 0 : e[0]) == null ? void 0 : s.basename), d = p || (0,path.basename)(c);
    return r === index_X06k2874.a.Choose && l.push({
      callback: y(i, index_X06k2874.a.Choose),
      label: p && !a ? (0,index_X06k2874.t)("Choose {file}", { file: p }) : (0,index_X06k2874.t)("Choose"),
      type: "primary"
    }), (r === index_X06k2874.a.CopyMove || r === index_X06k2874.a.Copy) && l.push({
      callback: y(i, index_X06k2874.a.Copy),
      label: d ? (0,index_X06k2874.t)("Copy to {target}", { target: d }) : (0,index_X06k2874.t)("Copy"),
      type: "primary",
      icon: folder_multipleraw
    }), (r === index_X06k2874.a.Move || r === index_X06k2874.a.CopyMove) && l.push({
      callback: y(i, index_X06k2874.a.Move),
      label: d ? (0,index_X06k2874.t)("Move to {target}", { target: d }) : (0,index_X06k2874.t)("Move"),
      type: r === index_X06k2874.a.Move ? "primary" : "secondary",
      icon: folder_moveraw
    }), l;
  };
  const g = {};
  typeof (m == null ? void 0 : m.filter) == "function" && (g.filterFn = (e) => m.filter(P(e)));
  const _ = typeof u == "string" ? [u] : u || [];
  M(index_X06k2874.c, {
    ...g,
    name: v,
    buttons: b,
    multiselect: a,
    path: h,
    mimetypeFilter: _,
    allowPickDirectory: (m == null ? void 0 : m.allowDirectoryChooser) === !0 || _.includes("httpd/unix-directory")
  });
}
async function H(v, i, a, u) {
  M(DialogBase_aNq6aLpb.D, { name: i, message: v, buttons: [
    {
      label: "No",
      // eslint-disable-next-line n/no-callback-literal
      callback: () => a(!1)
    },
    {
      label: "Yes",
      type: "primary",
      // eslint-disable-next-line n/no-callback-literal
      callback: () => a(!0)
    }
  ], size: "small" }, () => a(!1));
}



/***/ })

}]);