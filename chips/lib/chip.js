/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate, __metadata } from "tslib";
import '../../elevation/elevation.js';
import '../../focus/focus-ring.js';
import '../../ripple/ripple.js';
import { html, LitElement, nothing } from 'lit';
import { property, queryAsync, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { when } from 'lit/directives/when.js';
import { html as staticHtml, literal } from 'lit/static-html.js';
import { pointerPress, shouldShowStrongFocus } from '../../focus/strong-focus.js';
import { ripple } from '../../ripple/directive.js';
/**
 * A chip component.
 */
export class Chip extends LitElement {
    constructor() {
        super(...arguments);
        this.disabled = false;
        this.elevated = false;
        this.href = '';
        this.label = '';
        this.target = '';
        this.showFocusRing = false;
        this.showRipple = false;
        this.getRipple = () => {
            this.showRipple = true;
            return this.ripple;
        };
        this.renderRipple = () => {
            return html `<md-ripple ?disabled=${this.disabled}></md-ripple>`;
        };
    }
    render() {
        const classes = {
            elevated: this.elevated,
            flat: !this.elevated,
        };
        const button = this.href ? literal `a` : literal `button`;
        return staticHtml `
      <${button} class="container ${classMap(classes)}"
          ?disabled=${this.disabled}
          href=${this.href || nothing}
          target=${this.href ? this.target : nothing}
          @blur=${this.handleBlur}
          @focus=${this.handleFocus}
          @pointerdown=${this.handlePointerDown}
          ${ripple(this.getRipple)}>
        <md-elevation shadow=${this.elevated} surface></md-elevation>
        ${when(this.showRipple, this.renderRipple)}
        <md-focus-ring .visible=${this.showFocusRing}></md-focus-ring>
        <div class="label">${this.label}</div>
      </${button}>
    `;
    }
    handleBlur() {
        this.showFocusRing = false;
    }
    handleFocus() {
        this.showFocusRing = shouldShowStrongFocus();
    }
    handlePointerDown() {
        pointerPress();
        this.showFocusRing = shouldShowStrongFocus();
    }
}
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Object)
], Chip.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Object)
], Chip.prototype, "elevated", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], Chip.prototype, "href", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], Chip.prototype, "label", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], Chip.prototype, "target", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], Chip.prototype, "showFocusRing", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], Chip.prototype, "showRipple", void 0);
__decorate([
    queryAsync('md-ripple'),
    __metadata("design:type", Promise)
], Chip.prototype, "ripple", void 0);
//# sourceMappingURL=chip.js.map