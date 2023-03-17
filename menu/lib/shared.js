/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * The event that closes any parent menus. It is recommended to subclass and
 * dispatch this event rather than creating your own `close-menu` event.
 */
export class CloseMenuEvent extends Event {
    constructor(initiator, reason) {
        super('close-menu', { bubbles: true, composed: true });
        this.initiator = initiator;
        this.reason = reason;
        this.itemPath = [initiator];
    }
}
/**
 * The default close menu event used by md-menu. To create your own `close-menu`
 * event, you should subclass the `CloseMenuEvent` instead.
 */
// tslint:disable-next-line
export const DefaultCloseMenuEvent = (CloseMenuEvent);
/**
 * The event that requests the parent md-menu to deactivate all other items.
 */
export class DeactivateItemsEvent extends Event {
    constructor() {
        super('deactivate-items', { bubbles: true, composed: true });
    }
}
/**
 * Requests the typeahead functionality of containing menu be deactivated.
 */
export class DeactivateTypeaheadEvent extends Event {
    constructor() {
        super('deactivate-typeahead', { bubbles: true, composed: true });
    }
}
/**
 * Requests the typeahead functionality of containing menu be activated.
 */
export class ActivateTypeaheadEvent extends Event {
    constructor() {
        super('activate-typeahead', { bubbles: true, composed: true });
    }
}
/**
 * Keys that are used to navigate menus.
 */
export const NAVIGABLE_KEY = {
    UP: 'ArrowUp',
    DOWN: 'ArrowDown',
    RIGHT: 'ArrowRight',
    LEFT: 'ArrowLeft',
};
/**
 * Keys that are used for selection in menus.
 */
export const SELECTION_KEY = {
    SPACE: 'Space',
    ENTER: 'Enter',
};
/**
 * Default close `Reason` kind values.
 */
export const CLOSE_REASON = {
    CLICK_SELECTION: 'CLICK_SELECTION',
    KEYDOWN: 'KEYDOWN',
};
/**
 * Keys that can close menus.
 */
export const KEYDOWN_CLOSE_KEYS = {
    ESCAPE: 'Escape',
    SPACE: SELECTION_KEY.SPACE,
    ENTER: SELECTION_KEY.ENTER,
};
/**
 * Determines whether the given key code is a key code that should close the
 * menu.
 *
 * @param code The KeyboardEvent code to check.
 * @return Whether or not the key code is in the predetermined list to close the
 * menu.
 */
export function isClosableKey(code) {
    return Object.values(KEYDOWN_CLOSE_KEYS).some(value => (value === code));
}
/**
 * Determines whether the given key code is a key code that should select a menu
 * item.
 *
 * @param code They KeyboardEvent code to check.
 * @return Whether or not the key code is in the predetermined list to select a
 * menu item.
 */
export function isSelectableKey(code) {
    return Object.values(SELECTION_KEY).some(value => (value === code));
}
//# sourceMappingURL=shared.js.map