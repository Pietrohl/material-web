/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { TemplateResult } from 'lit';
import { Field } from './field.js';
declare global {
    interface HTMLElementTagNameMap {
        'md-test-field': TestField;
    }
}
declare class TestField extends Field {
    get labelText(): string;
    protected renderOutline(floatingLabel: TemplateResult): TemplateResult<2 | 1>;
}
export {};
