import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { classMap } from 'lit/directives/class-map.js';

import { SlotController } from '@patternfly/pfe-core/controllers/slot-controller.js';

import style from './pf-card.css';

/**
 * A **card** is a square or rectangular container that can contain any kind of content.
 * Cards symbolize units of information, and each one acts as an entry point for
 * users to access more details. For example, in dashboards and catalog views, cards
 * function as a preview of a detailed page. Cards may also be used in data displays
 * like card views, or for positioning content on a page.
 * @summary Gives a preview of information in a small layout
 * @alias Card
 */
@customElement('pf-card')
export class PfCard extends LitElement {
  static readonly styles: CSSStyleSheet[] = [style];

  /**
   * Optionally provide a size for the card and the card contents.
   * The default is set to `undefined` and provides default styles.
   * Compact provides styles which decreases the padding between the sections.
   * Large provides styles which increases the padding between the sections and the font size for the title, header, and footer.
   */
  @property({ reflect: true }) size?: 'compact' | 'large';

  /**
   * Optionally apply a border radius for the drop shadow and/or border.
   */
  @property({ type: Boolean, reflect: true }) rounded = false;

  /**
   * Optionally allow the card to take up the full height of the parent element.
   */
  @property({ type: Boolean, reflect: true, attribute: 'full-height' }) fullHeight = false;

  /**
   * Optionally remove the border on the card container.
   */
  @property({ type: Boolean, reflect: true }) plain = false;

  #slots = new SlotController(this, 'header', 'title', null, 'footer');

  render(): TemplateResult<1> {
    return html`
      <article>
        <!-- summary: The container for *header* content -->
        <header id="header"
                part="header"
                class="${classMap({ empty: this.#slots.isEmpty('header') })}">
          <!-- summary: When included, defines the contents of a card.
               description: |
                 Card headers can contain images as well as the title of a card and an actions menu
                 represented by the right-aligned kebab. In most cases, your card should include a
                 header. The only exceptions are when cards being used as a layout element to
                 create a white background behind other content.
          -->
          <slot name="header"></slot>
          <!-- summary: Communicates the title of a card if it's not included in the header.
               description: |
                 If a card will be utilized as a selectable and clickable card, the title
                 needs to be made as a linked text to trigger action and indicate interaction.
          -->
          <slot id="title" name="title" ?hidden="${this.#slots.isEmpty('title')}"></slot>
        </header>
        <!-- summary: The container for *body* content -->
        <div id="body"
             part="body"
             class="${classMap({ empty: this.#slots.isEmpty(null) })}">
          <!-- summary: Body. Provides details about the item.
               description: |
                 A card body can include any combination of static text and/or active content.
          -->
          <slot></slot>
        </div>
        <!-- summary: The container for *footer* content -->
        <footer id="footer"
                part="footer"
                class="${classMap({ empty: this.#slots.isEmpty('footer') })}">
          <!-- summary: Contains external links, actions, or static text at the bottom of a card. -->
          <slot name="footer"></slot>
        </footer>
      </article>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-card': PfCard;
  }
}
