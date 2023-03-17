/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate, __metadata } from "tslib";
// Required for @ariaProperty
// tslint:disable:no-new-decorators
import { html, LitElement } from 'lit';
import { property, query, queryAssignedElements } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { ariaProperty } from '../../decorators/aria-property.js';
const NAVIGABLE_KEYS = {
    ArrowDown: 'ArrowDown',
    ArrowUp: 'ArrowUp',
    Home: 'Home',
    End: 'End',
};
const navigableKeySet = new Set(Object.values(NAVIGABLE_KEYS));
function isNavigableKey(key) {
    return navigableKeySet.has(key);
}
// tslint:disable-next-line:enforce-comments-on-exported-symbols
export class List extends LitElement {
    constructor() {
        super(...arguments);
        // @ts-ignore(b/264292293): Use `override` with TS 4.9+
        this.role = 'list';
        /**
         * The tabindex of the underlying list.
         */
        this.listTabIndex = 0;
    }
    render() {
        return this.renderList();
    }
    /**
     * Renders the main list element.
     */
    renderList() {
        return html `
    <ul class="md3-list ${classMap(this.getListClasses())}"
        aria-label="${ifDefined(this.ariaLabel)}"
        tabindex=${this.listTabIndex}
        role=${this.role}
        @keydown=${this.handleKeydown}
        >
      ${this.renderContent()}
    </ul>
  `;
    }
    /**
     * The classes to be applied to the underlying list.
     */
    getListClasses() {
        return {};
    }
    /**
     * The content to be slotted into the list.
     */
    renderContent() {
        return html `<span><slot @click=${(e) => {
            e.stopPropagation();
        }}></slot></span>`;
    }
    /**
     * Handles keyboard navigation in the list.
     *
     * @param event {KeyboardEvent} The keyboard event that triggers this handler.
     */
    handleKeydown(event) {
        const key = event.key;
        if (!isNavigableKey(key)) {
            return;
        }
        // do not use this.items directly so we don't re-query the DOM unnecessarily
        const items = this.items;
        if (!items.length) {
            return;
        }
        const activeItemRecord = List.getActiveItem(items);
        if (activeItemRecord) {
            activeItemRecord.item.active = false;
        }
        event.preventDefault();
        switch (key) {
            // Activate the next item
            case NAVIGABLE_KEYS.ArrowDown:
                if (activeItemRecord) {
                    const next = List.getNextItem(items, activeItemRecord.index);
                    if (next)
                        next.active = true;
                }
                else {
                    List.activateFirstItem(items);
                }
                break;
            // Activate the previous item
            case NAVIGABLE_KEYS.ArrowUp:
                if (activeItemRecord) {
                    const prev = List.getPrevItem(items, activeItemRecord.index);
                    if (prev)
                        prev.active = true;
                }
                else {
                    items[items.length - 1].active = true;
                }
                break;
            // Activate the first item
            case NAVIGABLE_KEYS.Home:
                List.activateFirstItem(items);
                break;
            // Activate the last item
            case NAVIGABLE_KEYS.End:
                List.activateLastItem(items);
                break;
            default:
                break;
        }
    }
    /**
     * Activates the first non-disabled item of a given array of items.
     *
     * @param items {Array<ListItem>} The items from which to activate the
     * first item.
     */
    static activateFirstItem(items) {
        // NOTE: These selector functions are static and not on the instance such
        // that multiple operations can be chained and we do not have to re-query
        // the DOM
        const firstItem = List.getFirstActivatableItem(items);
        if (firstItem) {
            firstItem.active = true;
        }
    }
    /**
     * Activates the last non-disabled item of a given array of items.
     *
     * @param items {Array<ListItem>} The items from which to activate the
     * last item.
     */
    static activateLastItem(items) {
        const lastItem = List.getLastActivatableItem(items);
        if (lastItem) {
            lastItem.active = true;
        }
    }
    /**
     * Deactivates the currently active item of a given array of items.
     *
     * @param items {Array<ListItem>} The items from which to deactivate the
     * active item.
     * @returns A record of the deleselcted activated item including the item and
     * the index of the item or `null` if none are deactivated.
     */
    static deactivateActiveItem(items) {
        const activeItem = List.getActiveItem(items);
        if (activeItem) {
            activeItem.item.active = false;
        }
        return activeItem;
    }
    focus() {
        this.listRoot.focus();
    }
    /**
     * Retrieves the the first activated item of a given array of items.
     *
     * @param items {Array<ListItem>} The items to search.
     * @returns A record of the first activated item including the item and the
     * index of the item or `null` if none are activated.
     */
    static getActiveItem(items) {
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if (item.active) {
                return {
                    item,
                    index: i,
                };
            }
        }
        return null;
    }
    /**
     * Retrieves the the first non-disabled item of a given array of items. This
     * the first item that is not disabled.
     *
     * @param items {Array<ListItem>} The items to search.
     * @returns The first activatable item or `null` if none are activatable.
     */
    static getFirstActivatableItem(items) {
        for (const item of items) {
            if (!item.disabled) {
                return item;
            }
        }
        return null;
    }
    /**
     * Retrieves the the last non-disabled item of a given array of items.
     *
     * @param items {Array<ListItem>} The items to search.
     * @returns The last activatable item or `null` if none are activatable.
     */
    static getLastActivatableItem(items) {
        for (let i = items.length - 1; i >= 0; i--) {
            const item = items[i];
            if (!item.disabled) {
                return item;
            }
        }
        return null;
    }
    /**
     * Retrieves the the next non-disabled item of a given array of items.
     *
     * @param items {Array<ListItem>} The items to search.
     * @param index {{index: number}} The index to search from.
     * @returns The next activatable item or `null` if none are activatable.
     */
    static getNextItem(items, index) {
        for (let i = 1; i < items.length; i++) {
            const nextIndex = (i + index) % items.length;
            const item = items[nextIndex];
            if (!item.disabled) {
                return item;
            }
        }
        return null;
    }
    /**
     * Retrieves the the previous non-disabled item of a given array of items.
     *
     * @param items {Array<ListItem>} The items to search.
     * @param index {{index: number}} The index to search from.
     * @returns The previous activatable item or `null` if none are activatable.
     */
    static getPrevItem(items, index) {
        for (let i = 1; i < items.length; i++) {
            const prevIndex = (index - i + items.length) % items.length;
            const item = items[prevIndex];
            if (!item.disabled) {
                return item;
            }
        }
        return null;
    }
}
List.shadowRootOptions = { mode: 'open', delegatesFocus: true };
__decorate([
    ariaProperty,
    property({ type: String, attribute: 'data-aria-label', noAccessor: true }),
    __metadata("design:type", String)
], List.prototype, "ariaLabel", void 0);
__decorate([
    ariaProperty,
    property({ type: String, attribute: 'data-aria-activedescendant', noAccessor: true }),
    __metadata("design:type", String)
], List.prototype, "ariaActivedescendant", void 0);
__decorate([
    ariaProperty
    // tslint:disable-next-line
    ,
    property({ type: String, attribute: 'data-role', noAccessor: true })
    // @ts-ignore(b/264292293): Use `override` with TS 4.9+
    ,
    __metadata("design:type", String)
], List.prototype, "role", void 0);
__decorate([
    property({ type: Number }),
    __metadata("design:type", Number)
], List.prototype, "listTabIndex", void 0);
__decorate([
    query('.md3-list'),
    __metadata("design:type", HTMLElement)
], List.prototype, "listRoot", void 0);
__decorate([
    queryAssignedElements({ flatten: true, selector: '[md-list-item]' }),
    __metadata("design:type", Array)
], List.prototype, "items", void 0);
//# sourceMappingURL=list.js.map