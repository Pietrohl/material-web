/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { MenuItem } from './shared.js';
/**
 * The options that are passed to the typeahead controller.
 */
export interface TypeaheadControllerProperties {
    /**
     * A function that returns an array of menu items to be searched.
     * @return An array of menu items to be searched by typing.
     */
    getItems: () => MenuItem[];
    /**
     * The maximum time between each keystroke to keep the current type buffer
     * alive.
     */
    typeaheadBufferTime: number;
    /**
     * Whether or not the typeahead should listen for keystrokes or not.
     */
    active: boolean;
}
/**
 * Data structure tuple that helps with indexing.
 *
 * [index, item, normalized header text]
 */
type TypeaheadRecord = [number, MenuItem, string];
/**
 * This controller listens to `keydown` events and searches the header text of
 * an array of `MenuItem`s with the corresponding entered keys within the buffer
 * time and activates the item.
 *
 * @example
 * ```ts
 * const typeaheadController = new TypeaheadController(() => ({
 *   typeaheadBufferTime: 50,
 *   getItems: () => Array.from(document.querySelectorAll('md-menu-item'))
 * }));
 * html`
 *   <div
 *       @keydown=${typeaheadController.onKeydown}
 *       tabindex="0"
 *       class="activeItemText">
 *     <!-- focusable element that will receive keydown events -->
 *     Apple
 *   </div>
 *   <div>
 *     <md-menu-item active header="Apple"></md-menu-item>
 *     <md-menu-item header="Apricot"></md-menu-item>
 *     <md-menu-item header="Banana"></md-menu-item>
 *     <md-menu-item header="Olive"></md-menu-item>
 *     <md-menu-item header="Orange"></md-menu-item>
 *   </div>
 * `;
 * ```
 */
export declare class TypeaheadController {
    protected getProperties: () => TypeaheadControllerProperties;
    /**
     * Array of tuples that helps with indexing.
     */
    protected typeaheadRecords: TypeaheadRecord[];
    /**
     * Currently-typed text since last buffer timeout
     */
    protected typaheadBuffer: string;
    /**
     * The timeout id from the current buffer's setTimeout
     */
    protected cancelTypeaheadTimeout: number;
    /**
     * If we are currently "typing"
     */
    protected isTypingAhead: boolean;
    /**
     * The record of the last active item.
     */
    protected lastActiveRecord: TypeaheadRecord | null;
    /**
     * @param getProperties A function that returns the options of the typeahead
     * controller:
     *
     * {
     *   getItems: A function that returns an array of menu items to be searched.
     *   typeaheadBufferTime: The maximum time between each keystroke to keep the
     *       current type buffer alive.
     * }
     */
    constructor(getProperties: () => TypeaheadControllerProperties);
    protected get items(): MenuItem[];
    protected get active(): boolean;
    /**
     * Apply this listener to the element that will receive `keydown` events that
     * should trigger this controller.
     *
     * @param e The native browser `KeyboardEvent` from the `keydown` event.
     */
    readonly onKeydown: (e: KeyboardEvent) => void;
    /**
     * Sets up typingahead
     */
    protected beginTypeahead(e: KeyboardEvent): void;
    /**
     * Performs the typeahead. Based on the normalized items and the current text
     * buffer, finds the _next_ item with matching text and activates it.
     *
     * @example
     *
     * items: Apple, Banana, Olive, Orange, Cucumber
     * buffer: ''
     * user types: o
     *
     * activates Olive
     *
     * @example
     *
     * items: Apple, Banana, Olive (active), Orange, Cucumber
     * buffer: 'o'
     * user types: l
     *
     * activates Olive
     *
     * @example
     *
     * items: Apple, Banana, Olive (active), Orange, Cucumber
     * buffer: ''
     * user types: o
     *
     * activates Orange
     *
     * @example
     *
     * items: Apple, Banana, Olive, Orange (active), Cucumber
     * buffer: ''
     * user types: o
     *
     * activates Olive
     */
    protected typeahead(e: KeyboardEvent): void;
    /**
     * Ends the current typeahead and clears the buffer.
     */
    protected endTypeahead: () => void;
}
export {};
