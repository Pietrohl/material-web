/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { ListItem } from '../../list/lib/listitem/list-item.js';
/**
 * Interface specific to menu item and not list item.
 */
interface MenuItemSelf {
    /**
     * The visible headline text of the item.
     */
    headline: string;
    /**
     * Whether or not the item is in the selected visual state (focuses on
     * selection).
     */
    active: boolean;
    /**
     * If it is a sub-menu-item, a method that can close the submenu.
     */
    close?: () => void;
    /**
     * Focuses the item.
     */
    focus: () => void;
}
/**
 * The interface of every menu item interactive with a menu. All menu items
 * should implement this interface to be compatible with md-menu. Additionally
 * they should have both the `md-menu-item` and `md-list-item` attributes set.
 */
export type MenuItem = MenuItemSelf & ListItem;
/**
 * The reason the `close-menu` event was dispatched.
 */
export interface Reason {
    kind: string;
}
/**
 * The click selection reason for the `close-menu` event. The menu was closed
 * because an item was selected via user click.
 */
export interface ClickReason extends Reason {
    kind: typeof CLOSE_REASON.CLICK_SELECTION;
}
/**
 * The keydown reason for the `close-menu` event. The menu was closed
 * because a specific key was pressed. The default closing keys for
 * `md-menu-item` are, Space, Enter or Escape.
 */
export interface KeydownReason extends Reason {
    kind: typeof CLOSE_REASON.KEYDOWN;
    key: string;
}
/**
 * The default menu closing reasons for the material md-menu package.
 */
export type DefaultReasons = ClickReason | KeydownReason;
/**
 * The event that closes any parent menus. It is recommended to subclass and
 * dispatch this event rather than creating your own `close-menu` event.
 */
export declare class CloseMenuEvent<T extends Reason = DefaultReasons> extends Event {
    initiator: MenuItem;
    readonly reason: T;
    readonly itemPath: MenuItem[];
    constructor(initiator: MenuItem, reason: T);
}
/**
 * The default close menu event used by md-menu. To create your own `close-menu`
 * event, you should subclass the `CloseMenuEvent` instead.
 */
export declare const DefaultCloseMenuEvent: {
    new (initiator: MenuItem, reason: DefaultReasons): CloseMenuEvent<DefaultReasons>;
    readonly AT_TARGET: number;
    readonly BUBBLING_PHASE: number;
    readonly CAPTURING_PHASE: number;
    readonly NONE: number;
};
/**
 * The event that requests the parent md-menu to deactivate all other items.
 */
export declare class DeactivateItemsEvent extends Event {
    constructor();
}
/**
 * Requests the typeahead functionality of containing menu be deactivated.
 */
export declare class DeactivateTypeaheadEvent extends Event {
    constructor();
}
/**
 * Requests the typeahead functionality of containing menu be activated.
 */
export declare class ActivateTypeaheadEvent extends Event {
    constructor();
}
/**
 * Keys that are used to navigate menus.
 */
export declare const NAVIGABLE_KEY: {
    readonly UP: "ArrowUp";
    readonly DOWN: "ArrowDown";
    readonly RIGHT: "ArrowRight";
    readonly LEFT: "ArrowLeft";
};
/**
 * Keys that are used for selection in menus.
 */
export declare const SELECTION_KEY: {
    readonly SPACE: "Space";
    readonly ENTER: "Enter";
};
/**
 * Default close `Reason` kind values.
 */
export declare const CLOSE_REASON: {
    readonly CLICK_SELECTION: "CLICK_SELECTION";
    readonly KEYDOWN: "KEYDOWN";
};
/**
 * Keys that can close menus.
 */
export declare const KEYDOWN_CLOSE_KEYS: {
    readonly ESCAPE: "Escape";
    readonly SPACE: "Space";
    readonly ENTER: "Enter";
};
type Values<T> = T[keyof T];
/**
 * Determines whether the given key code is a key code that should close the
 * menu.
 *
 * @param code The KeyboardEvent code to check.
 * @return Whether or not the key code is in the predetermined list to close the
 * menu.
 */
export declare function isClosableKey(code: string): code is Values<typeof KEYDOWN_CLOSE_KEYS>;
/**
 * Determines whether the given key code is a key code that should select a menu
 * item.
 *
 * @param code They KeyboardEvent code to check.
 * @return Whether or not the key code is in the predetermined list to select a
 * menu item.
 */
export declare function isSelectableKey(code: string): code is Values<typeof SELECTION_KEY>;
export {};
