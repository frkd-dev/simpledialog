# Simple Dialog
A Simple Dialog window using VanillaJS.

**Features**
* Dragging
* Folding
* Fixed size
* Auto centering (optional)
* Scrollable

Example with default values:

```js
window.SimpleDialog({
  title: 'Dialog', // string or element
  content: 'Lorem ipsum dolor...', // string or element
  x: null, y: null, // null for centering
  width: 300, height: 200,
  close: true, // Show close button
  minmax: true, // Show min/max button
  minimized: false, // Create minimized dialog
  parent: d.body // Parent element to host a dialog
});
```
