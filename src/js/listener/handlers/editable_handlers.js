import { updateEditable } from "../../modules/ajaxRequest.js";
import { updateNumerical } from "../../modules/mainFunction.js";

const EDITABLE_CLASSES = [
    "editableNumber",
    "editableNumeric",
    "editableComment",
    "editable",
];

const NON_INLINE_EDITABLE_CLASSES = [
    "editableSelect",
    "editableConfiguration",
    "editableConfigurationSelect",
];

const IGNORED_SAVE_CLASSES = [
    ...NON_INLINE_EDITABLE_CLASSES,
    "editableComment",
];

export function isInlineEditable(element) {
    return EDITABLE_CLASSES.some(className => element.classList.contains(className));
}

export function shouldSkipInlineEdit(element) {
    return NON_INLINE_EDITABLE_CLASSES.some(className => element.classList.contains(className));
}

export function enableInlineEdit(element) {
    element.setAttribute('contenteditable', 'true');
    element.focus();
}

export function saveEditableElement(element, ignoreComment = false) {
    const targetClass = element.className;

    if (targetClass.includes("editableNumber") || targetClass.includes("editableNumeric")) {
        const formatAsCurrency = element.dataset.column !== "quantite";
        updateNumerical(element, formatAsCurrency);
        return;
    }

    const ignoredClasses = ignoreComment ? IGNORED_SAVE_CLASSES : NON_INLINE_EDITABLE_CLASSES;

    if (ignoredClasses.some(className => targetClass.includes(className))) {
        return;
    }

    if (targetClass.includes("editable")) {
        updateEditable(element);
    }
}

export function applyMouseOverStyles(element) {
    element.style.fontWeight = "bold";
    element.addEventListener('mouseout', resetMouseOverStyles);
}

function resetMouseOverStyles(event) {
    event.target.style.border = null;
    event.target.style.padding = null;
    event.target.style.fontWeight = null;
    event.target.style.borderRadius = null;
}
