// (C) 2017 Alexander Shashkevich
// Minimalistic dialog window using vanillajs framework
// License: GPL-3.0

(function (w, d) {
    'use strict';
    // Helper to create dom element with attributes
    function el(name) {
        const e = d.createElement(name);
        if (arguments.length > 1) for (let attr in arguments[1]) if (e[attr] !== undefined) e[attr] = arguments[1][attr];
        return e;
    }

    w.SimpleDialog = function (c) {
        let cfg = {
            title: 'Dialog',
            content: 'Lorem ipsum dolor...',
            x: null, y: null, // null for centering
            width: 300, height: 200,
            close: true, // Show close button
            minmax: true, // Show min/max button
            minimized: false, // Create minimized dialog
            parent: d.body, // Parent element to host a dialog
            onclose: null
        };

        let ui = {
            dialog: null,
            title: null,
            content: null,
            minmax: null,
            close: null,
        };

        let xy = {
            mouseX: 0, mouseY: 0,
            dialogX: 0, dialogY: 0
        };

        // Merge config with default
        for (let i in c) cfg[i] = (typeof (c[i])) ? c[i] : cfg[i];

        ui.dialog = el('div', {className: 'dlg-box'});
        ui.title = el('div', {className: 'dlg-title'});
        ui.minmax = el('span', {className: 'dlg-minmax', innerHTML: '&ndash;'});
        ui.close = el('span', {className:'dlg-close', innerHTML: '&times;'});
        ui.content = el('div', {className: 'dlg-content'});

        ui.dialog.appendChild(ui.close);
        ui.dialog.appendChild(ui.minmax);
        ui.dialog.appendChild(ui.title);
        ui.dialog.appendChild(ui.content);
        cfg.parent.appendChild(ui.dialog);

        ui.dialog.style.width = cfg.width + 'px';
        ui.dialog.style.minHeight = cfg.minimized ? '1px' : cfg.height + 'px';
        ui.dialog.style.maxHeight = cfg.height + 'px';
        ui.dialog.style.left = cfg.x === null ? (w.innerWidth - cfg.width) / 2 + 'px' : cfg.x + 'px';
        ui.dialog.style.top = cfg.y === null ? (w.innerHeight - cfg.height) / 2 + 'px' : cfg.y + 'px';
        ui.content.style.display = cfg.minimized ? 'none' : 'block';

        if (cfg.close === false)
            ui.close.style.display = 'none';

        if (cfg.minmax === false)
            ui.minmax.style.display = 'none';

        // Content section
        if (typeof cfg.title === 'string')
            ui.title.innerHTML = cfg.title;
        else
            ui.title.appendChild(cfg.title);

        if (typeof cfg.content === 'string')
            ui.content.innerHTML = cfg.content;
        else
            ui.content.appendChild(cfg.content);

        // Dragging...
        const eventMouseMove = (ev) => {
            const dx = ev.clientX - xy.mouseX,
                dy = ev.clientY - xy.mouseY;

            ui.dialog.style.left = xy.dialogX + dx + 'px';
            ui.dialog.style.top = xy.dialogY + dy + 'px';
        };

        // End drag...
        const eventMouseUp = () => {
            d.removeEventListener('mousemove', eventMouseMove);
        };

        // Start drag...
        const eventMouseDown = (ev) => {
            xy.mouseX = ev.clientX;
            xy.mouseY = ev.clientY;
            xy.dialogX = ev.target.parentNode.offsetLeft;
            xy.dialogY = ev.target.parentNode.offsetTop;

            d.addEventListener('mousemove', eventMouseMove);

            if (ev.preventDefault) ev.preventDefault();
            ev.cancelBubble = true;
            ev.returnValue = false;

            return false;
        };

        this.close = () => {
            if (cfg.onclose) cfg.onclose();
            // unref everything to free memory
            d.removeEventListener('mousemove', eventMouseMove);
            cfg.parent.removeChild(ui.dialog);
            ui = null;
            cfg = null;
        };

        ui.title.addEventListener('mousedown', eventMouseDown);
        ui.title.addEventListener('mouseup', eventMouseUp);

        ui.minmax.onclick = () => {
            ui.content.style.display = cfg.minimized ? 'block' : 'none';
            ui.dialog.style.minHeight = cfg.minimized ? cfg.height + 'px' : '1px';
            cfg.minimized = !cfg.minimized;
        };

        ui.close.onclick = this.close;
    };
})(window, document);
