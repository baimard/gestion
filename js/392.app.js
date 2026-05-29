"use strict";
(globalThis["webpackChunkgestion"] = globalThis["webpackChunkgestion"] || []).push([[392],{

/***/ 7485
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   F: () => (/* binding */ getCapabilities)
/* harmony export */ });
/* harmony import */ var _nextcloud_initial_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1222);

function getCapabilities() {
  try {
    return (0,_nextcloud_initial_state__WEBPACK_IMPORTED_MODULE_0__/* .loadState */ .C)("core", "capabilities");
  } catch (error) {
    console.debug("Could not find capabilities initial state fall back to _oc_capabilities");
    if (!("_oc_capabilities" in window)) {
      return {};
    }
    return window["_oc_capabilities"];
  }
}

//# sourceMappingURL=index.mjs.map


/***/ },

/***/ 240
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _: () => (/* binding */ _export_sfc)
/* harmony export */ });
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

//# sourceMappingURL=_plugin-vue_export-helper-1tPrXgE0.mjs.map


/***/ },

/***/ 970
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   F: () => (/* binding */ FileType),
/* harmony export */   P: () => (/* binding */ Permission),
/* harmony export */   a: () => (/* binding */ File),
/* harmony export */   b: () => (/* binding */ Folder),
/* harmony export */   c: () => (/* binding */ NodeStatus),
/* harmony export */   s: () => (/* binding */ scopedGlobals)
/* harmony export */ });
/* unused harmony exports N, l */
/* harmony import */ var _nextcloud_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5947);
/* harmony import */ var _nextcloud_paths__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1225);


window._nc_files_scope ??= {};
window._nc_files_scope.v4_0 ??= {};
const scopedGlobals = window._nc_files_scope.v4_0;
const logger = (0,_nextcloud_logger__WEBPACK_IMPORTED_MODULE_0__/* .getLoggerBuilder */ .YK)().setApp("@nextcloud/files").detectUser().build();
const FileType = Object.freeze({
  Folder: "folder",
  File: "file"
});
const Permission = Object.freeze({
  /**
   * No permissions granted
   */
  NONE: 0,
  /**
   * Can read the file content
   */
  READ: 1,
  /**
   * Can modify the file itself (move, rename, etc)
   */
  UPDATE: 2,
  /**
   * Can create new files/folders inside a folder
   */
  CREATE: 4,
  /**
   * Can change the file content
   */
  WRITE: 4,
  /**
   * Can delete the node
   */
  DELETE: 8,
  /**
   * Can share the node
   */
  SHARE: 16,
  /**
   * All permissions are granted
   */
  ALL: 31
});
const NodeStatus = Object.freeze({
  /** This is a new node and it doesn't exists on the filesystem yet */
  NEW: "new",
  /** This node has failed and is unavailable  */
  FAILED: "failed",
  /** This node is currently loading or have an operation in progress */
  LOADING: "loading",
  /** This node is locked and cannot be modified */
  LOCKED: "locked"
});
function isDavResource(source, davService) {
  return source.match(davService) !== null;
}
function validateData(data, davService) {
  if (data.id && typeof data.id !== "number" && typeof data.id !== "string") {
    throw new Error("Invalid id type of value");
  }
  if (!data.source) {
    throw new Error("Missing mandatory source");
  }
  try {
    new URL(data.source);
  } catch {
    throw new Error("Invalid source format, source must be a valid URL");
  }
  if (!data.source.startsWith("http")) {
    throw new Error("Invalid source format, only http(s) is supported");
  }
  if (!data.root) {
    throw new Error("Missing mandatory root");
  }
  if (typeof data.root !== "string") {
    throw new Error("Invalid root type");
  }
  if (!data.root.startsWith("/")) {
    throw new Error("Root must start with a leading slash");
  }
  if (!data.source.includes(data.root)) {
    throw new Error("Root must be part of the source");
  }
  if (isDavResource(data.source, davService)) {
    const service = data.source.match(davService)[0];
    if (!data.source.includes((0,_nextcloud_paths__WEBPACK_IMPORTED_MODULE_1__/* .join */ .fj)(service, data.root))) {
      throw new Error("The root must be relative to the service. e.g /files/emma");
    }
  }
  if (data.displayname && typeof data.displayname !== "string") {
    throw new Error("Invalid displayname type");
  }
  if (data.mtime && !(data.mtime instanceof Date)) {
    throw new Error("Invalid mtime type");
  }
  if (data.crtime && !(data.crtime instanceof Date)) {
    throw new Error("Invalid crtime type");
  }
  if (!data.mime || typeof data.mime !== "string" || !data.mime.match(/^[-\w.]+\/[-+\w.]+$/gi)) {
    throw new Error("Missing or invalid mandatory mime");
  }
  if ("size" in data && typeof data.size !== "number" && data.size !== void 0) {
    throw new Error("Invalid size type");
  }
  if ("permissions" in data && data.permissions !== void 0 && !(typeof data.permissions === "number" && data.permissions >= Permission.NONE && data.permissions <= Permission.ALL)) {
    throw new Error("Invalid permissions");
  }
  if (data.owner && data.owner !== null && typeof data.owner !== "string") {
    throw new Error("Invalid owner type");
  }
  if (data.attributes && typeof data.attributes !== "object") {
    throw new Error("Invalid attributes type");
  }
  if (data.status && !Object.values(NodeStatus).includes(data.status)) {
    throw new Error("Status must be a valid NodeStatus");
  }
}
function fixDates(data) {
  if (data.mtime && typeof data.mtime === "string") {
    if (!isNaN(Date.parse(data.mtime)) && JSON.stringify(new Date(data.mtime)) === JSON.stringify(data.mtime)) {
      data.mtime = new Date(data.mtime);
    }
  }
  if (data.crtime && typeof data.crtime === "string") {
    if (!isNaN(Date.parse(data.crtime)) && JSON.stringify(new Date(data.crtime)) === JSON.stringify(data.crtime)) {
      data.crtime = new Date(data.crtime);
    }
  }
}
function fixRegExp(pattern) {
  if (pattern instanceof RegExp) {
    return pattern;
  }
  const matches = pattern.match(/(\/?)(.+)\1([a-z]*)/i);
  if (!matches) {
    throw new Error("Invalid regular expression format.");
  }
  const validFlags = Array.from(new Set(matches[3])).filter((flag) => "gimsuy".includes(flag)).join("");
  return new RegExp(matches[2], validFlags);
}
class Node {
  _attributes;
  _data;
  _knownDavService = /(remote|public)\.php\/(web)?dav/i;
  readonlyAttributes = Object.entries(Object.getOwnPropertyDescriptors(Node.prototype)).filter((e) => typeof e[1].get === "function" && e[0] !== "__proto__").map((e) => e[0]);
  handler = {
    set: (target, prop, value) => {
      if (this.readonlyAttributes.includes(prop)) {
        return false;
      }
      return Reflect.set(target, prop, value);
    },
    deleteProperty: (target, prop) => {
      if (this.readonlyAttributes.includes(prop)) {
        return false;
      }
      return Reflect.deleteProperty(target, prop);
    }
  };
  constructor(...[data, davService]) {
    if (!data.mime) {
      data.mime = "application/octet-stream";
    }
    fixDates(data);
    davService = fixRegExp(davService || this._knownDavService);
    validateData(data, davService);
    this._data = {
      ...data,
      attributes: {}
    };
    this._attributes = new Proxy(this._data.attributes, this.handler);
    this.update(data.attributes ?? {});
    if (davService) {
      this._knownDavService = davService;
    }
  }
  /**
   * Get the source url to this object
   * There is no setter as the source is not meant to be changed manually.
   * You can use the rename or move method to change the source.
   */
  get source() {
    return this._data.source.replace(/\/$/i, "");
  }
  /**
   * Get the encoded source url to this object for requests purposes
   */
  get encodedSource() {
    const { origin } = new URL(this.source);
    return origin + (0,_nextcloud_paths__WEBPACK_IMPORTED_MODULE_1__/* .encodePath */ .O0)(this.source.slice(origin.length));
  }
  /**
   * Get this object name
   * There is no setter as the source is not meant to be changed manually.
   * You can use the rename or move method to change the source.
   */
  get basename() {
    return (0,_nextcloud_paths__WEBPACK_IMPORTED_MODULE_1__/* .basename */ .P8)(this.source);
  }
  /**
   * The nodes displayname
   * By default the display name and the `basename` are identical,
   * but it is possible to have a different name. This happens
   * on the files app for example for shared folders.
   */
  get displayname() {
    return this._data.displayname || this.basename;
  }
  /**
   * Set the displayname
   */
  set displayname(displayname) {
    validateData({ ...this._data, displayname }, this._knownDavService);
    this._data.displayname = displayname;
  }
  /**
   * Get this object's extension
   * There is no setter as the source is not meant to be changed manually.
   * You can use the rename or move method to change the source.
   */
  get extension() {
    return (0,_nextcloud_paths__WEBPACK_IMPORTED_MODULE_1__/* .extname */ .LC)(this.source);
  }
  /**
   * Get the directory path leading to this object
   * Will use the relative path to root if available
   *
   * There is no setter as the source is not meant to be changed manually.
   * You can use the rename or move method to change the source.
   */
  get dirname() {
    return (0,_nextcloud_paths__WEBPACK_IMPORTED_MODULE_1__/* .dirname */ .pD)(this.path);
  }
  /**
   * Get the file mime
   */
  get mime() {
    return this._data.mime || "application/octet-stream";
  }
  /**
   * Set the file mime
   * Removing the mime type will set it to `application/octet-stream`
   */
  set mime(mime) {
    mime ??= "application/octet-stream";
    validateData({ ...this._data, mime }, this._knownDavService);
    this._data.mime = mime;
  }
  /**
   * Get the file modification time
   */
  get mtime() {
    return this._data.mtime;
  }
  /**
   * Set the file modification time
   */
  set mtime(mtime) {
    validateData({ ...this._data, mtime }, this._knownDavService);
    this._data.mtime = mtime;
  }
  /**
   * Get the file creation time
   * There is no setter as the creation time is not meant to be changed
   */
  get crtime() {
    return this._data.crtime;
  }
  /**
   * Get the file size
   */
  get size() {
    return this._data.size;
  }
  /**
   * Set the file size
   */
  set size(size) {
    validateData({ ...this._data, size }, this._knownDavService);
    this.updateMtime();
    this._data.size = size;
  }
  /**
   * Get the file attribute
   * This contains all additional attributes not provided by the Node class
   */
  get attributes() {
    return this._attributes;
  }
  /**
   * Get the file permissions
   */
  get permissions() {
    if (this.owner === null && !this.isDavResource) {
      return Permission.READ;
    }
    return this._data.permissions !== void 0 ? this._data.permissions : Permission.NONE;
  }
  /**
   * Set the file permissions
   */
  set permissions(permissions) {
    validateData({ ...this._data, permissions }, this._knownDavService);
    this.updateMtime();
    this._data.permissions = permissions;
  }
  /**
   * Get the file owner
   * There is no setter as the owner is not meant to be changed
   */
  get owner() {
    if (!this.isDavResource) {
      return null;
    }
    return this._data.owner;
  }
  /**
   * Is this a dav-related resource ?
   */
  get isDavResource() {
    return isDavResource(this.source, this._knownDavService);
  }
  /**
   * Get the dav root of this object
   * There is no setter as the root is not meant to be changed
   */
  get root() {
    return this._data.root.replace(/^(.+)\/$/, "$1");
  }
  /**
   * Get the absolute path of this object relative to the root
   */
  get path() {
    const idx = this.source.indexOf("://");
    const protocol = this.source.slice(0, idx);
    const remainder = this.source.slice(idx + 3);
    const slashIndex = remainder.indexOf("/");
    const host = remainder.slice(0, slashIndex);
    const rawPath = remainder.slice(slashIndex);
    const safeUrl = `${protocol}://${host}${(0,_nextcloud_paths__WEBPACK_IMPORTED_MODULE_1__/* .encodePath */ .O0)(rawPath)}`;
    const url = new URL(safeUrl);
    let source = decodeURIComponent(url.pathname);
    if (this.isDavResource) {
      source = source.split(this._knownDavService).pop();
    }
    const firstMatch = source.indexOf(this.root);
    const root = this.root.replace(/\/$/, "");
    return source.slice(firstMatch + root.length) || "/";
  }
  /**
   * Get the nodes file id if defined.
   * There is no setter as the fileid is not meant to be changed.
   *
   * @deprecated Nextcloud is migrating to snowflake ids which are strings. Use the `id` attribute instead.
   */
  get fileid() {
    return typeof this._data?.id === "number" ? this._data.id : void 0;
  }
  /**
   * Get the nodes id - if defined.
   *
   * Note: As Nextcloud is migrating to snowflake ids the id has to be a string,
   * due to limitations of the JavaScript number type (snowflake ids are 64bit JavaScript numbers can only accurately represent integers up to 53 bit).
   */
  get id() {
    if (typeof this._data?.id === "undefined" || typeof this._data.id === "number" && this._data.id < 0) {
      return void 0;
    }
    return String(this._data.id);
  }
  /**
   * Get the node status.
   */
  get status() {
    return this._data?.status;
  }
  /**
   * Set the node status.
   */
  set status(status) {
    validateData({ ...this._data, status }, this._knownDavService);
    this._data.status = status;
  }
  /**
   * Move the node to a new destination
   *
   * @param destination the new source.
   * e.g. https://cloud.domain.com/remote.php/dav/files/emma/Photos/picture.jpg
   */
  move(destination) {
    validateData({ ...this._data, source: destination }, this._knownDavService);
    const oldBasename = this.basename;
    this._data.source = destination;
    if (this.displayname === oldBasename && this.basename !== oldBasename) {
      this.displayname = this.basename;
    }
  }
  /**
   * Rename the node
   * This aliases the move method for easier usage
   *
   * @param basename The new name of the node
   */
  rename(basename2) {
    if (basename2.includes("/")) {
      throw new Error("Invalid basename");
    }
    this.move((0,_nextcloud_paths__WEBPACK_IMPORTED_MODULE_1__/* .dirname */ .pD)(this.source) + "/" + basename2);
  }
  /**
   * Update the mtime if exists
   */
  updateMtime() {
    if (this._data.mtime) {
      this._data.mtime = /* @__PURE__ */ new Date();
    }
  }
  /**
   * Update the attributes of the node
   * Warning, updating attributes will NOT automatically update the mtime.
   *
   * @param attributes The new attributes to update on the Node attributes
   */
  update(attributes) {
    for (const [name, value] of Object.entries(attributes)) {
      try {
        if (value === void 0) {
          delete this.attributes[name];
        } else {
          this.attributes[name] = value;
        }
      } catch (e) {
        if (e instanceof TypeError) {
          continue;
        }
        throw e;
      }
    }
  }
  /**
   * Returns a clone of the node
   */
  clone() {
    return new this.constructor(structuredClone(this._data), this._knownDavService);
  }
  /**
   * JSON representation of the node
   */
  toJSON() {
    return JSON.stringify([structuredClone(this._data), this._knownDavService.toString()]);
  }
}
class File extends Node {
  constructor(...[data, davService]) {
    super(data, davService);
  }
  get type() {
    return FileType.File;
  }
}
class Folder extends Node {
  constructor(...[data, davService]) {
    super({
      ...data,
      mime: "httpd/unix-directory"
    }, davService);
  }
  get type() {
    return FileType.Folder;
  }
  get extension() {
    return null;
  }
  get mime() {
    return "httpd/unix-directory";
  }
}

//# sourceMappingURL=folder-29HuacU_.mjs.map


/***/ },

/***/ 1379
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  pt: () => (/* reexport */ folder_29HuacU_.F),
  di: () => (/* binding */ InvalidFilenameError),
  nF: () => (/* binding */ InvalidFilenameErrorReason),
  aX: () => (/* reexport */ folder_29HuacU_.P),
  v7: () => (/* binding */ formatFileSize),
  ur: () => (/* binding */ sortNodes),
  KT: () => (/* binding */ validateFilename)
});

// UNUSED EXPORTS: Column, DefaultType, File, FileListFilter, FilesSortingMode, Folder, Navigation, NewMenuEntryCategory, Node, NodeStatus, View, addNewFileMenuEntry, getFileActions, getFileListActions, getFileListFilters, getFileListHeaders, getFilesRegistry, getNavigation, getNewFileMenu, getNewFileMenuEntries, getSidebar, getSidebarActions, getSidebarTabs, getUniqueName, isFilenameValid, orderBy, parseFileSize, registerFileAction, registerFileListAction, registerFileListFilter, registerFileListHeader, registerSidebarAction, registerSidebarTab, removeNewFileMenuEntry, unregisterFileListFilter, validateColumn, validateView

// EXTERNAL MODULE: ./node_modules/@nextcloud/files/dist/chunks/folder-29HuacU_.mjs
var folder_29HuacU_ = __webpack_require__(970);
;// ./node_modules/typescript-event-target/dist/index.mjs
var e=class extends EventTarget{dispatchTypedEvent(s,t){return super.dispatchEvent(t)}};

// EXTERNAL MODULE: ./node_modules/@nextcloud/capabilities/dist/index.mjs
var dist = __webpack_require__(7485);
// EXTERNAL MODULE: ./node_modules/@nextcloud/l10n/dist/index.mjs
var l10n_dist = __webpack_require__(3334);
;// ./node_modules/@nextcloud/files/dist/index.mjs
/* unused harmony import specifier */ var scopedGlobals;
/* unused harmony import specifier */ var logger;
/* unused harmony import specifier */ var TypedEventTarget;
/* unused harmony import specifier */ var isSvg;
/* unused harmony import specifier */ var extname;
/* unused harmony import specifier */ var basename;







class FilesRegistry extends (/* unused pure expression or super */ null && (TypedEventTarget)) {
}
function getRegistry() {
  scopedGlobals.registry ??= new FilesRegistry();
  return scopedGlobals.registry;
}
function getFilesRegistry() {
  return getRegistry();
}
const DefaultType = Object.freeze({
  DEFAULT: "default",
  HIDDEN: "hidden"
});
function registerFileAction(action) {
  validateAction$1(action);
  scopedGlobals.fileActions ??= /* @__PURE__ */ new Map();
  if (scopedGlobals.fileActions.has(action.id)) {
    logger.error(`FileAction ${action.id} already registered`, { action });
    return;
  }
  scopedGlobals.fileActions.set(action.id, action);
  getRegistry().dispatchTypedEvent("register:action", new CustomEvent("register:action", { detail: action }));
}
function getFileActions() {
  if (scopedGlobals.fileActions) {
    return [...scopedGlobals.fileActions.values()];
  }
  return [];
}
function validateAction$1(action) {
  if (!action.id || typeof action.id !== "string") {
    throw new Error("Invalid id");
  }
  if (!action.displayName || typeof action.displayName !== "function") {
    throw new Error("Invalid displayName function");
  }
  if ("title" in action && typeof action.title !== "function") {
    throw new Error("Invalid title function");
  }
  if (!action.iconSvgInline || typeof action.iconSvgInline !== "function") {
    throw new Error("Invalid iconSvgInline function");
  }
  if (!action.exec || typeof action.exec !== "function") {
    throw new Error("Invalid exec function");
  }
  if ("enabled" in action && typeof action.enabled !== "function") {
    throw new Error("Invalid enabled function");
  }
  if ("execBatch" in action && typeof action.execBatch !== "function") {
    throw new Error("Invalid execBatch function");
  }
  if ("order" in action && typeof action.order !== "number") {
    throw new Error("Invalid order");
  }
  if (action.destructive !== void 0 && typeof action.destructive !== "boolean") {
    throw new Error("Invalid destructive flag");
  }
  if ("parent" in action && typeof action.parent !== "string") {
    throw new Error("Invalid parent");
  }
  if (action.default && !Object.values(DefaultType).includes(action.default)) {
    throw new Error("Invalid default");
  }
  if ("inline" in action && typeof action.inline !== "function") {
    throw new Error("Invalid inline function");
  }
  if ("renderInline" in action && typeof action.renderInline !== "function") {
    throw new Error("Invalid renderInline function");
  }
  if ("hotkey" in action && action.hotkey !== void 0) {
    if (typeof action.hotkey !== "object") {
      throw new Error("Invalid hotkey configuration");
    }
    if (typeof action.hotkey.key !== "string" || !action.hotkey.key) {
      throw new Error("Missing or invalid hotkey key");
    }
    if (typeof action.hotkey.description !== "string" || !action.hotkey.description) {
      throw new Error("Missing or invalid hotkey description");
    }
  }
}
function registerFileListAction(action) {
  validateAction(action);
  scopedGlobals.fileListActions ??= /* @__PURE__ */ new Map();
  if (scopedGlobals.fileListActions.has(action.id)) {
    logger.error(`FileListAction with id "${action.id}" is already registered`, { action });
    return;
  }
  scopedGlobals.fileListActions.set(action.id, action);
  getRegistry().dispatchTypedEvent("register:listAction", new CustomEvent("register:listAction", { detail: action }));
}
function getFileListActions() {
  if (scopedGlobals.fileListActions) {
    return [...scopedGlobals.fileListActions.values()];
  }
  return [];
}
function validateAction(action) {
  if (!action.id || typeof action.id !== "string") {
    throw new Error("Invalid id");
  }
  if (!action.displayName || typeof action.displayName !== "function") {
    throw new Error("Invalid displayName function");
  }
  if ("iconSvgInline" in action && typeof action.iconSvgInline !== "function") {
    throw new Error("Invalid iconSvgInline function");
  }
  if ("order" in action && typeof action.order !== "number") {
    throw new Error("Invalid order");
  }
  if ("enabled" in action && typeof action.enabled !== "function") {
    throw new Error("Invalid enabled function");
  }
  if (!action.exec || typeof action.exec !== "function") {
    throw new Error("Invalid exec function");
  }
}
/*!
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
function registerFileListFilter(filter) {
  scopedGlobals.fileListFilters ??= /* @__PURE__ */ new Map();
  if (scopedGlobals.fileListFilters.has(filter.id)) {
    throw new Error(`File list filter "${filter.id}" already registered`);
  }
  scopedGlobals.fileListFilters.set(filter.id, filter);
  getRegistry().dispatchTypedEvent("register:listFilter", new CustomEvent("register:listFilter", { detail: filter }));
}
function unregisterFileListFilter(filterId) {
  if (scopedGlobals.fileListFilters && scopedGlobals.fileListFilters.has(filterId)) {
    scopedGlobals.fileListFilters.delete(filterId);
    getRegistry().dispatchTypedEvent("unregister:listFilter", new CustomEvent("unregister:listFilter", { detail: filterId }));
  }
}
function getFileListFilters() {
  if (scopedGlobals.fileListFilters) {
    return [...scopedGlobals.fileListFilters.values()];
  }
  return [];
}
/*!
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
class FileListFilter extends e {
  id;
  order;
  constructor(id, order = 100) {
    super();
    this.id = id;
    this.order = order;
  }
  filter(nodes) {
    throw new Error("Not implemented");
  }
  updateChips(chips) {
    this.dispatchTypedEvent("update:chips", new CustomEvent("update:chips", { detail: chips }));
  }
  filterUpdated() {
    this.dispatchTypedEvent("update:filter", new CustomEvent("update:filter"));
  }
}
function registerFileListHeader(header) {
  validateHeader(header);
  scopedGlobals.fileListHeaders ??= /* @__PURE__ */ new Map();
  if (scopedGlobals.fileListHeaders.has(header.id)) {
    logger.error(`Header ${header.id} already registered`, { header });
    return;
  }
  scopedGlobals.fileListHeaders.set(header.id, header);
  getRegistry().dispatchTypedEvent("register:listHeader", new CustomEvent("register:listHeader", { detail: header }));
}
function getFileListHeaders() {
  if (!scopedGlobals.fileListHeaders) {
    return [];
  }
  return [...scopedGlobals.fileListHeaders.values()];
}
function validateHeader(header) {
  if (!header.id || !header.render || !header.updated) {
    throw new Error("Invalid header: id, render and updated are required");
  }
  if (typeof header.id !== "string") {
    throw new Error("Invalid id property");
  }
  if (header.enabled !== void 0 && typeof header.enabled !== "function") {
    throw new Error("Invalid enabled property");
  }
  if (header.render && typeof header.render !== "function") {
    throw new Error("Invalid render property");
  }
  if (header.updated && typeof header.updated !== "function") {
    throw new Error("Invalid updated property");
  }
}
function checkOptionalProperty(obj, property, type) {
  if (typeof obj[property] !== "undefined") {
    if (type === "array") {
      if (!Array.isArray(obj[property])) {
        throw new Error(`View ${property} must be an array`);
      }
    } else if (typeof obj[property] !== type) {
      throw new Error(`View ${property} must be a ${type}`);
    } else if (type === "object" && (obj[property] === null || Array.isArray(obj[property]))) {
      throw new Error(`View ${property} must be an object`);
    }
  }
}
class Column {
  _column;
  constructor(column) {
    validateColumn(column);
    this._column = column;
  }
  get id() {
    return this._column.id;
  }
  get title() {
    return this._column.title;
  }
  get render() {
    return this._column.render;
  }
  get sort() {
    return this._column.sort;
  }
  get summary() {
    return this._column.summary;
  }
}
function validateColumn(column) {
  if (typeof column !== "object" || column === null) {
    throw new Error("View column must be an object");
  }
  if (!column.id || typeof column.id !== "string") {
    throw new Error("A column id is required");
  }
  if (!column.title || typeof column.title !== "string") {
    throw new Error("A column title is required");
  }
  if (!column.render || typeof column.render !== "function") {
    throw new Error("A render function is required");
  }
  checkOptionalProperty(column, "sort", "function");
  checkOptionalProperty(column, "summary", "function");
}
class View {
  _view;
  constructor(view) {
    validateView(view);
    this._view = view;
  }
  get id() {
    return this._view.id;
  }
  get name() {
    return this._view.name;
  }
  get caption() {
    return this._view.caption;
  }
  get emptyTitle() {
    return this._view.emptyTitle;
  }
  get emptyCaption() {
    return this._view.emptyCaption;
  }
  get getContents() {
    return this._view.getContents;
  }
  get hidden() {
    return this._view.hidden;
  }
  get icon() {
    return this._view.icon;
  }
  set icon(icon) {
    this._view.icon = icon;
  }
  get order() {
    return this._view.order;
  }
  set order(order) {
    this._view.order = order;
  }
  get params() {
    return this._view.params;
  }
  set params(params) {
    this._view.params = params;
  }
  get columns() {
    return this._view.columns;
  }
  get emptyView() {
    return this._view.emptyView;
  }
  get parent() {
    return this._view.parent;
  }
  get sticky() {
    return this._view.sticky;
  }
  get expanded() {
    return this._view.expanded;
  }
  set expanded(expanded) {
    this._view.expanded = expanded;
  }
  get defaultSortKey() {
    return this._view.defaultSortKey;
  }
  get loadChildViews() {
    return this._view.loadChildViews;
  }
}
function validateView(view) {
  if (!view.icon || typeof view.icon !== "string" || !isSvg(view.icon)) {
    throw new Error("View icon is required and must be a valid svg string");
  }
  if (!view.id || typeof view.id !== "string") {
    throw new Error("View id is required and must be a string");
  }
  if (!view.getContents || typeof view.getContents !== "function") {
    throw new Error("View getContents is required and must be a function");
  }
  if (!view.name || typeof view.name !== "string") {
    throw new Error("View name is required and must be a string");
  }
  checkOptionalProperty(view, "caption", "string");
  checkOptionalProperty(view, "columns", "array");
  checkOptionalProperty(view, "defaultSortKey", "string");
  checkOptionalProperty(view, "emptyCaption", "string");
  checkOptionalProperty(view, "emptyTitle", "string");
  checkOptionalProperty(view, "emptyView", "function");
  checkOptionalProperty(view, "expanded", "boolean");
  checkOptionalProperty(view, "hidden", "boolean");
  checkOptionalProperty(view, "loadChildViews", "function");
  checkOptionalProperty(view, "order", "number");
  checkOptionalProperty(view, "params", "object");
  checkOptionalProperty(view, "parent", "string");
  checkOptionalProperty(view, "sticky", "boolean");
  if (view.columns) {
    view.columns.forEach(validateColumn);
    const columnIds = view.columns.reduce((set, column) => set.add(column.id), /* @__PURE__ */ new Set());
    if (columnIds.size !== view.columns.length) {
      throw new Error("View columns must have unique ids");
    }
  }
}
class Navigation extends (/* unused pure expression or super */ null && (TypedEventTarget)) {
  _views = [];
  _currentView = null;
  /**
   * Register a new view on the navigation
   *
   * @param views The views to register
   * @throws {Error} if a view with the same id is already registered
   * @throws {Error} if the registered view is invalid
   */
  register(...views) {
    for (const view of views) {
      if (this._views.find((search) => search.id === view.id)) {
        throw new Error(`IView id ${view.id} is already registered`);
      }
      validateView(view);
    }
    this._views.push(...views);
    this.dispatchTypedEvent("update", new CustomEvent("update"));
  }
  /**
   * Remove a registered view
   *
   * @param id The id of the view to remove
   */
  remove(id) {
    const index = this._views.findIndex((view) => view.id === id);
    if (index !== -1) {
      this._views.splice(index, 1);
      this.dispatchTypedEvent("update", new CustomEvent("update"));
    }
  }
  /**
   * Set the currently active view
   *
   * @param id - The id of the view to set as active
   * @throws {Error} If no view with the given id was registered
   * @fires UpdateActiveViewEvent
   */
  setActive(id) {
    if (id === null) {
      this._currentView = null;
    } else {
      const view = this._views.find(({ id: viewId }) => viewId === id);
      if (!view) {
        throw new Error(`No view with ${id} registered`);
      }
      this._currentView = view;
    }
    const event = new CustomEvent("updateActive", { detail: this._currentView });
    this.dispatchTypedEvent("updateActive", event);
  }
  /**
   * The currently active files view
   */
  get active() {
    return this._currentView;
  }
  /**
   * All registered views
   */
  get views() {
    return this._views;
  }
}
function getNavigation() {
  scopedGlobals.navigation ??= new Navigation();
  return scopedGlobals.navigation;
}
const NewMenuEntryCategory = Object.freeze({
  /**
   * For actions where the user is intended to upload from their device
   */
  UploadFromDevice: 0,
  /**
   * For actions that create new nodes on the server without uploading
   */
  CreateNew: 1,
  /**
   * For everything not matching the other categories
   */
  Other: 2
});
class NewMenu {
  _entries = [];
  registerEntry(entry) {
    this.validateEntry(entry);
    entry.category = entry.category ?? NewMenuEntryCategory.CreateNew;
    this._entries.push(entry);
  }
  unregisterEntry(entry) {
    const entryIndex = typeof entry === "string" ? this.getEntryIndex(entry) : this.getEntryIndex(entry.id);
    if (entryIndex === -1) {
      logger.warn("Entry not found, nothing removed", { entry, entries: this.getEntries() });
      return;
    }
    this._entries.splice(entryIndex, 1);
  }
  /**
   * Get the list of registered entries
   *
   * @param context - The creation context. Usually the current folder
   */
  getEntries(context) {
    if (context) {
      return this._entries.filter((entry) => typeof entry.enabled === "function" ? entry.enabled(context) : true);
    }
    return this._entries;
  }
  getEntryIndex(id) {
    return this._entries.findIndex((entry) => entry.id === id);
  }
  validateEntry(entry) {
    if (!entry.id || !entry.displayName || !entry.iconSvgInline || !entry.handler) {
      throw new Error("Invalid entry");
    }
    if (typeof entry.id !== "string" || typeof entry.displayName !== "string") {
      throw new Error("Invalid id or displayName property");
    }
    if (entry.iconSvgInline && typeof entry.iconSvgInline !== "string") {
      throw new Error("Invalid icon provided");
    }
    if (entry.enabled !== void 0 && typeof entry.enabled !== "function") {
      throw new Error("Invalid enabled property");
    }
    if (typeof entry.handler !== "function") {
      throw new Error("Invalid handler property");
    }
    if ("order" in entry && typeof entry.order !== "number") {
      throw new Error("Invalid order property");
    }
    if (this.getEntryIndex(entry.id) !== -1) {
      throw new Error("Duplicate entry");
    }
  }
}
function getNewFileMenu() {
  scopedGlobals.newFileMenu ??= new NewMenu();
  return scopedGlobals.newFileMenu;
}
function addNewFileMenuEntry(entry) {
  const newFileMenu = getNewFileMenu();
  return newFileMenu.registerEntry(entry);
}
function removeNewFileMenuEntry(entry) {
  const newFileMenu = getNewFileMenu();
  return newFileMenu.unregisterEntry(entry);
}
function getNewFileMenuEntries(context) {
  const newFileMenu = getNewFileMenu();
  return newFileMenu.getEntries(context).sort((a2, b2) => {
    if (a2.order !== void 0 && b2.order !== void 0 && a2.order !== b2.order) {
      return a2.order - b2.order;
    }
    return a2.displayName.localeCompare(b2.displayName, void 0, { numeric: true, sensitivity: "base" });
  });
}
function registerSidebarAction(action) {
  validateSidebarAction(action);
  scopedGlobals.filesSidebarActions ??= /* @__PURE__ */ new Map();
  if (scopedGlobals.filesSidebarActions.has(action.id)) {
    logger.warn(`Sidebar action with id "${action.id}" already registered. Skipping.`);
    return;
  }
  scopedGlobals.filesSidebarActions.set(action.id, action);
  logger.debug(`New sidebar action with id "${action.id}" registered.`);
}
function getSidebarActions() {
  if (scopedGlobals.filesSidebarActions) {
    return [...scopedGlobals.filesSidebarActions.values()];
  }
  return [];
}
function validateSidebarAction(action) {
  if (typeof action !== "object") {
    throw new Error("Sidebar action is not an object");
  }
  if (!action.id || typeof action.id !== "string" || action.id !== CSS.escape(action.id)) {
    throw new Error("Sidebar actions need to have an id conforming to the HTML id attribute specifications");
  }
  if (!action.displayName || typeof action.displayName !== "function") {
    throw new Error("Sidebar actions need to have a displayName function");
  }
  if (!action.iconSvgInline || typeof action.iconSvgInline !== "function") {
    throw new Error("Sidebar actions need to have a iconSvgInline function");
  }
  if (!action.enabled || typeof action.enabled !== "function") {
    throw new Error("Sidebar actions need to have an enabled function");
  }
  if (!action.onClick || typeof action.onClick !== "function") {
    throw new Error("Sidebar actions need to have an onClick function");
  }
}
function registerSidebarTab(tab) {
  validateSidebarTab(tab);
  scopedGlobals.filesSidebarTabs ??= /* @__PURE__ */ new Map();
  if (scopedGlobals.filesSidebarTabs.has(tab.id)) {
    logger.warn(`Sidebar tab with id "${tab.id}" already registered. Skipping.`);
    return;
  }
  scopedGlobals.filesSidebarTabs.set(tab.id, tab);
  logger.debug(`New sidebar tab with id "${tab.id}" registered.`);
}
function getSidebarTabs() {
  if (scopedGlobals.filesSidebarTabs) {
    return [...scopedGlobals.filesSidebarTabs.values()];
  }
  return [];
}
function validateSidebarTab(tab) {
  if (typeof tab !== "object") {
    throw new Error("Sidebar tab is not an object");
  }
  if (!tab.id || typeof tab.id !== "string" || tab.id !== CSS.escape(tab.id)) {
    throw new Error("Sidebar tabs need to have an id conforming to the HTML id attribute specifications");
  }
  if (!tab.tagName || typeof tab.tagName !== "string") {
    throw new Error("Sidebar tabs need to have the tagName name set");
  }
  if (!tab.tagName.match(/^[a-z][a-z0-9-_]+$/)) {
    throw new Error('Sidebar tab "tagName" is invalid');
  }
  if (!tab.displayName || typeof tab.displayName !== "string") {
    throw new Error("Sidebar tabs need to have a name set");
  }
  if (typeof tab.iconSvgInline !== "string" || !isSvg(tab.iconSvgInline)) {
    throw new Error("Sidebar tabs need to have an valid SVG icon");
  }
  if (typeof tab.order !== "number") {
    throw new Error("Sidebar tabs need to have a numeric order set");
  }
  if (tab.enabled && typeof tab.enabled !== "function") {
    throw new Error('Sidebar tab "enabled" is not a function');
  }
  if (tab.onInit && typeof tab.onInit !== "function") {
    throw new Error('Sidebar tab "onInit" is not a function');
  }
}
class SidebarProxy {
  get #impl() {
    return window.OCA?.Files?._sidebar?.();
  }
  get available() {
    return !!this.#impl;
  }
  get isOpen() {
    return this.#impl?.isOpen ?? false;
  }
  get activeTab() {
    return this.#impl?.activeTab;
  }
  get node() {
    return this.#impl?.node;
  }
  open(node, tab) {
    this.#impl?.open(node, tab);
  }
  close() {
    this.#impl?.close();
  }
  setActiveTab(tabId) {
    this.#impl?.setActiveTab(tabId);
  }
  registerTab(tab) {
    registerSidebarTab(tab);
  }
  getTabs(context) {
    return this.#impl?.getTabs(context) ?? [];
  }
  getActions(context) {
    return this.#impl?.getActions(context) ?? [];
  }
  registerAction(action) {
    registerSidebarAction(action);
  }
}
function getSidebar() {
  return new SidebarProxy();
}
const InvalidFilenameErrorReason = Object.freeze({
  ReservedName: "reserved name",
  Character: "character",
  Extension: "extension"
});
class InvalidFilenameError extends Error {
  constructor(options) {
    super(`Invalid ${options.reason} '${options.segment}' in filename '${options.filename}'`, { cause: options });
  }
  /**
   * The filename that was validated
   */
  get filename() {
    return this.cause.filename;
  }
  /**
   * Reason why the validation failed
   */
  get reason() {
    return this.cause.reason;
  }
  /**
   * Part of the filename that caused this error
   */
  get segment() {
    return this.cause.segment;
  }
}
function validateFilename(filename) {
  const capabilities = (0,dist/* getCapabilities */.F)().files;
  const forbiddenCharacters = capabilities.forbidden_filename_characters ?? ["/", "\\"];
  for (const character of forbiddenCharacters) {
    if (filename.includes(character)) {
      throw new InvalidFilenameError({ segment: character, reason: InvalidFilenameErrorReason.Character, filename });
    }
  }
  filename = filename.toLocaleLowerCase();
  const forbiddenFilenames = capabilities.forbidden_filenames ?? [".htaccess"];
  if (forbiddenFilenames.includes(filename)) {
    throw new InvalidFilenameError({ filename, segment: filename, reason: InvalidFilenameErrorReason.ReservedName });
  }
  const endOfBasename = filename.indexOf(".", 1);
  const basename2 = filename.substring(0, endOfBasename === -1 ? void 0 : endOfBasename);
  const forbiddenFilenameBasenames = capabilities.forbidden_filename_basenames ?? [];
  if (forbiddenFilenameBasenames.includes(basename2)) {
    throw new InvalidFilenameError({ filename, segment: basename2, reason: InvalidFilenameErrorReason.ReservedName });
  }
  const forbiddenFilenameExtensions = capabilities.forbidden_filename_extensions ?? [];
  for (const extension of forbiddenFilenameExtensions) {
    if (filename.length > extension.length && filename.endsWith(extension)) {
      throw new InvalidFilenameError({ segment: extension, reason: InvalidFilenameErrorReason.Extension, filename });
    }
  }
}
function isFilenameValid(filename) {
  try {
    validateFilename(filename);
    return true;
  } catch (error) {
    if (error instanceof InvalidFilenameError) {
      return false;
    }
    throw error;
  }
}
function getUniqueName(name, otherNames, options) {
  const opts = {
    suffix: (n) => `(${n})`,
    ignoreFileExtension: false,
    ...options
  };
  let newName = name;
  let i = 1;
  while (otherNames.includes(newName)) {
    const ext = opts.ignoreFileExtension ? "" : extname(name);
    const base = basename(name, ext);
    newName = `${base} ${opts.suffix(i++)}${ext}`;
  }
  return newName;
}
const humanList = ["B", "KB", "MB", "GB", "TB", "PB"];
const humanListBinary = ["B", "KiB", "MiB", "GiB", "TiB", "PiB"];
function formatFileSize(size, skipSmallSizes = false, binaryPrefixes = false, base1000 = false) {
  binaryPrefixes = binaryPrefixes && !base1000;
  if (typeof size === "string") {
    size = Number(size);
  }
  let order = size > 0 ? Math.floor(Math.log(size) / Math.log(base1000 ? 1e3 : 1024)) : 0;
  order = Math.min((binaryPrefixes ? humanListBinary.length : humanList.length) - 1, order);
  const readableFormat = binaryPrefixes ? humanListBinary[order] : humanList[order];
  let relativeSize = (size / Math.pow(base1000 ? 1e3 : 1024, order)).toFixed(1);
  if (skipSmallSizes === true && order === 0) {
    return (relativeSize !== "0.0" ? "< 1 " : "0 ") + (binaryPrefixes ? humanListBinary[1] : humanList[1]);
  }
  if (order < 2) {
    relativeSize = parseFloat(relativeSize).toFixed(0);
  } else {
    relativeSize = parseFloat(relativeSize).toLocaleString((0,l10n_dist/* getCanonicalLocale */.lO)());
  }
  return relativeSize + " " + readableFormat;
}
function parseFileSize(value, forceBinary = false) {
  try {
    value = `${value}`.toLocaleLowerCase().replaceAll(/\s+/g, "").replaceAll(",", ".");
  } catch {
    return null;
  }
  const match = value.match(/^([0-9]*(\.[0-9]*)?)([kmgtp]?)(i?)b?$/);
  if (match === null || match[1] === "." || match[1] === "") {
    return null;
  }
  const bytesArray = {
    "": 0,
    k: 1,
    m: 2,
    g: 3,
    t: 4,
    p: 5,
    e: 6
  };
  const decimalString = `${match[1]}`;
  const base = match[4] === "i" || forceBinary ? 1024 : 1e3;
  return Math.round(Number.parseFloat(decimalString) * base ** bytesArray[match[3]]);
}
function stringify(value) {
  if (value instanceof Date) {
    return value.toISOString();
  }
  return String(value);
}
function orderBy(collection, identifiers, orders) {
  identifiers = identifiers ?? [(value) => value];
  orders = orders ?? [];
  const sorting = identifiers.map((_, index) => (orders[index] ?? "asc") === "asc" ? 1 : -1);
  const collator = Intl.Collator(
    [(0,l10n_dist/* getLanguage */.Z0)(), (0,l10n_dist/* getCanonicalLocale */.lO)()],
    {
      // handle 10 as ten and not as one-zero
      numeric: true,
      usage: "sort"
    }
  );
  return [...collection].sort((a2, b2) => {
    for (const [index, identifier] of identifiers.entries()) {
      const value = collator.compare(stringify(identifier(a2)), stringify(identifier(b2)));
      if (value !== 0) {
        return value * sorting[index];
      }
    }
    return 0;
  });
}
const FilesSortingMode = Object.freeze({
  Name: "basename",
  Modified: "mtime",
  Size: "size"
});
function sortNodes(nodes, options = {}) {
  const sortingOptions = {
    // Default to sort by name
    sortingMode: FilesSortingMode.Name,
    // Default to sort ascending
    sortingOrder: "asc",
    ...options
  };
  function basename2(node) {
    const name = node.displayname || node.attributes?.displayname || node.basename || "";
    if (node.type === folder_29HuacU_.F.Folder) {
      return name;
    }
    return name.lastIndexOf(".") > 0 ? name.slice(0, name.lastIndexOf(".")) : name;
  }
  const identifiers = [
    // 1: Sort favorites first if enabled
    ...sortingOptions.sortFavoritesFirst ? [(v) => v.attributes?.favorite !== 1] : [],
    // 2: Sort folders first if sorting by name
    ...sortingOptions.sortFoldersFirst ? [(v) => v.type !== "folder"] : [],
    // 3: Use sorting mode if NOT basename (to be able to use display name too)
    ...sortingOptions.sortingMode !== FilesSortingMode.Name ? [(v) => v[sortingOptions.sortingMode] ?? v.attributes[sortingOptions.sortingMode]] : [],
    // 4: Use display name if available, fallback to name
    (v) => basename2(v),
    // 5: Finally, use basename if all previous sorting methods failed
    (v) => v.basename
  ];
  const orders = [
    // (for 1): always sort favorites before normal files
    ...sortingOptions.sortFavoritesFirst ? ["asc"] : [],
    // (for 2): always sort folders before files
    ...sortingOptions.sortFoldersFirst ? ["asc"] : [],
    // (for 3): Reverse if sorting by mtime as mtime higher means edited more recent -> lower
    ...sortingOptions.sortingMode === FilesSortingMode.Modified ? [sortingOptions.sortingOrder === "asc" ? "desc" : "asc"] : [],
    // (also for 3 so make sure not to conflict with 2 and 3)
    ...sortingOptions.sortingMode !== FilesSortingMode.Modified && sortingOptions.sortingMode !== FilesSortingMode.Name ? [sortingOptions.sortingOrder] : [],
    // for 4: use configured sorting direction
    sortingOptions.sortingOrder,
    // for 5: use configured sorting direction
    sortingOptions.sortingOrder
  ];
  return orderBy(nodes, identifiers, orders);
}

//# sourceMappingURL=index.mjs.map


/***/ },

/***/ 1222
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   C: () => (/* binding */ loadState)
/* harmony export */ });
/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */
/**
 * @param app app ID, e.g. "mail"
 * @param key name of the property
 * @param fallback optional parameter to use as default value
 * @throws if the key can't be found
 */
function loadState(app, key, fallback) {
    const selector = `#initial-state-${app}-${key}`;
    if (window._nc_initial_state?.has(selector)) {
        return window._nc_initial_state.get(selector);
    }
    else if (!window._nc_initial_state) {
        window._nc_initial_state = new Map();
    }
    const elem = document.querySelector(selector);
    if (elem === null) {
        if (fallback !== undefined) {
            return fallback;
        }
        throw new Error(`Could not find initial state ${key} of ${app}`);
    }
    try {
        const parsedValue = JSON.parse(atob(elem.value));
        window._nc_initial_state.set(selector, parsedValue);
        return parsedValue;
    }
    catch (error) {
        console.error('[@nextcloud/initial-state] Could not parse initial state', { key, app, error });
        if (fallback !== undefined) {
            return fallback;
        }
        throw new Error(`Could not parse initial state ${key} of ${app}`, { cause: error });
    }
}


/***/ },

/***/ 1225
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LC: () => (/* binding */ extname),
/* harmony export */   O0: () => (/* binding */ encodePath),
/* harmony export */   P8: () => (/* binding */ basename),
/* harmony export */   fj: () => (/* binding */ join),
/* harmony export */   pD: () => (/* binding */ dirname)
/* harmony export */ });
/* unused harmony exports isSamePath, normalize */
function encodePath(path) {
  if (!path) {
    return path;
  }
  return path.split("/").map(encodeURIComponent).join("/");
}
function basename(path, extname2) {
  path = path.replace(/\\/g, "/").replace(/\/+$/g, "").replace(/.*\//, "");
  if (extname2 && extname2 !== path && path.endsWith(extname2)) {
    return path.substring(0, path.length - extname2.length);
  }
  return path;
}
function dirname(path) {
  path = path.replaceAll(/\\/g, "/");
  const sections = path.split("/");
  if (sections.length <= 1) {
    return ".";
  }
  sections.pop();
  if (sections.length === 1 && sections[0] === "") {
    return "/";
  }
  return sections.join("/");
}
function extname(path) {
  const base = basename(path);
  const index = base.lastIndexOf(".");
  if (index > 0) {
    return base.substring(index);
  }
  return "";
}
function join(...args) {
  if (arguments.length < 1) {
    return "";
  }
  const nonEmptyArgs = args.filter((arg) => arg.length > 0);
  if (nonEmptyArgs.length < 1) {
    return "";
  }
  const lastArg = nonEmptyArgs[nonEmptyArgs.length - 1];
  const leadingSlash = nonEmptyArgs[0].charAt(0) === "/";
  const trailingSlash = lastArg.charAt(lastArg.length - 1) === "/";
  const sections = nonEmptyArgs.reduce((acc, section) => acc.concat(section.split("/")), []);
  let first = !leadingSlash;
  const path = sections.reduce((acc, section) => {
    if (section === "") {
      return acc;
    }
    if (first) {
      first = false;
      return acc + section;
    }
    return acc + "/" + section;
  }, "");
  if (trailingSlash) {
    return path + "/";
  }
  return path;
}
function isSamePath(path1, path2) {
  const pathSections1 = (path1 || "").split("/").filter((p) => p !== ".");
  const pathSections2 = (path2 || "").split("/").filter((p) => p !== ".");
  path1 = join(...pathSections1);
  path2 = join(...pathSections2);
  return path1 === path2;
}
function normalize(path) {
  const sections = path.split("/").filter((p, index, arr) => p !== "" || index === 0 || index === arr.length - 1).filter((p) => p !== ".");
  const sanitizedSections = [];
  for (const section of sections) {
    const lastSection = sanitizedSections.at(-1);
    if (section === ".." && lastSection !== "..") {
      if (lastSection === void 0) {
        sanitizedSections.push(section);
      } else if (lastSection !== "") {
        sanitizedSections.pop();
      }
    } else {
      sanitizedSections.push(section);
    }
  }
  return sanitizedSections.join("/");
}

//# sourceMappingURL=index.mjs.map


/***/ }

}]);