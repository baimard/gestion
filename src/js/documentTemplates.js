import '../css/mycss.less';
import './listener/main_listener';
import { csrfHeaders } from './modules/csrf.js';
import { globalConfiguration } from './modules/mainFunction.js';

function readLayout(editor) {
    return [...editor.querySelectorAll('[data-template-block]')].map(block => ({
        id: block.dataset.templateBlock,
        visible: block.dataset.required === 'true' || block.querySelector('[data-block-visible]').checked,
    }));
}

function refreshEditor(editor) {
    const blocks = [...editor.querySelectorAll('[data-template-block]')];
    const preview = editor.querySelector('[data-template-preview]');
    const readOnly = editor.dataset.canManage !== 'true';
    const movableBlocks = blocks.filter(block => block.dataset.embedded !== 'true');
    preview.replaceChildren();

    blocks.forEach(block => {
        const index = movableBlocks.indexOf(block);
        const moveUp = block.querySelector('[data-move="up"]');
        const moveDown = block.querySelector('[data-move="down"]');
        if (moveUp) moveUp.disabled = readOnly || index === 0;
        if (moveDown) moveDown.disabled = readOnly || index === movableBlocks.length - 1;
        const visible = block.dataset.required === 'true' || block.querySelector('[data-block-visible]').checked;
        block.classList.toggle('is-hidden', !visible);
        if (!visible || block.dataset.embedded === 'true') return;
        const previewBlock = document.createElement('div');
        previewBlock.className = `gestion-template-preview-block preview-${block.dataset.templateBlock}`;
        previewBlock.textContent = block.querySelector('.gestion-template-block-name').textContent;
        preview.append(previewBlock);
    });
}

function moveBlock(editor, button) {
    const block = button.closest('[data-template-block]');
    const direction = button.dataset.move;
    const movableBlocks = [...block.parentElement.children].filter(item => item.dataset.embedded !== 'true');
    const index = movableBlocks.indexOf(block);
    const target = direction === 'up' ? movableBlocks[index - 1] : movableBlocks[index + 1];
    if (!target) return;
    block.parentElement.insertBefore(block, direction === 'up' ? target : target.nextElementSibling);
    const parties = block.parentElement.querySelector('[data-template-block="parties"]');
    const embeddedLogo = block.parentElement.querySelector('[data-template-block="main_logo"]');
    if (parties && embeddedLogo) parties.after(embeddedLogo);
    refreshEditor(editor);
    block.focus?.();
}

function resetEditor(editor) {
    const list = editor.querySelector('[data-block-list]');
    const defaults = JSON.parse(editor.dataset.defaultLayout);
    const byId = new Map([...list.children].map(block => [block.dataset.templateBlock, block]));
    defaults.forEach(entry => {
        const block = byId.get(entry.id);
        if (!block) return;
        block.querySelector('[data-block-visible]').checked = entry.visible;
        list.append(block);
    });
    editor.querySelector('[data-template-css]').value = '';
    refreshEditor(editor);
}

async function saveEditor(editor) {
    const status = editor.querySelector('[data-template-status]');
    const submit = editor.querySelector('button[type="submit"]');
    status.textContent = t('gestion', 'Saving…');
    submit.disabled = true;
    try {
        const response = await fetch(OC.generateUrl(`/apps/gestion/templates/${editor.dataset.templateType}`), {
            method: 'POST',
            headers: csrfHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json' }),
            body: JSON.stringify({
                layout: readLayout(editor),
                css: editor.querySelector('[data-template-css]').value,
            }),
        });
        const payload = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(payload.message || t('gestion', 'The template could not be saved.'));
        editor.querySelector('[data-template-css]').value = payload.css || '';
        status.textContent = t('gestion', 'Template saved.');
    } catch (error) {
        status.textContent = error.message;
    } finally {
        submit.disabled = false;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    globalConfiguration(false);
    document.querySelectorAll('[data-template-editor]').forEach(editor => {
        refreshEditor(editor);
        editor.addEventListener('click', event => {
            const move = event.target.closest('[data-move]');
            if (move) moveBlock(editor, move);
            if (event.target.closest('[data-reset-template]')) resetEditor(editor);
        });
        editor.addEventListener('change', event => {
            if (event.target.matches('[data-block-visible]')) refreshEditor(editor);
        });
        editor.addEventListener('submit', event => {
            event.preventDefault();
            saveEditor(editor);
        });
    });
});
