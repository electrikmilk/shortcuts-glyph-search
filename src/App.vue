<template>
  <f7-app v-bind="f7params" theme="ios">
    <f7-view main>
      <f7-page>

        <f7-popover class="credits">
          <f7-block>
            <h3>Credits ❤️</h3>
            <p>
              Glyphs data
            </p>
            <f7-link href="https://github.com/OpenJelly/Open-Jellycore"
                     external
                     icon-f7="logo_github"
                     target="_blank">
              &nbsp;
              Open-Jellycore
            </f7-link>
            <p>
              Icons rendering
            </p>
            <f7-link href="https://github.com/atnbueno/shortcut-icons"
                     external
                     icon-f7="logo_github"
                     target="_blank">
              &nbsp;
              shortcut-icons
            </f7-link>
          </f7-block>
          <f7-list dividers>
            <f7-list-item v-for="credit in githubCredits"
                          :link="'https://github.com/'+credit"
                          :style="'color:'+blue"
                          target="_blank"
                          external>
              <template #media>
                <f7-icon f7="logo_github"></f7-icon>
              </template>
              @{{ credit }}
            </f7-list-item>
          </f7-list>
        </f7-popover>

        <f7-navbar sliding class="text-align-center" style="padding-top: 5rem;height: 10rem">
          <f7-nav-left style="z-index: 999">
            <f7-link icon-f7="info_circle"
                     tooltip="Credits"
                     popover-open=".credits"/>
          </f7-nav-left>

          <f7-nav-title style="position: fixed;left: 0;right: 0;margin: 1.5rem 0 auto">
            <div style="all: initial">
              <div class="shortcut-icon s86"
                   style="position: relative"
                   :class="iconClass(glyph.code)">
              </div>
              <div class="shortcut-icon-color-picker">
                <div class="shortcut-icon-color"
                     v-for="(n,c) in colors"
                     @click="color = {identifier: c, code: n}"
                     :class="'c'+n">
                </div>
              </div>
            </div>
          </f7-nav-title>

          <f7-nav-right>
            <f7-link href="https://github.com/electrikmilk/shortcuts-glyph-search"
                     external
                     tooltip="View Repo on GitHub"
                     icon-f7="logo_github"
                     target="_blank">
            </f7-link>
          </f7-nav-right>

          <f7-subnavbar>
            <f7-searchbar search-container=".search-list"
                          ref="searchbar"
                          class="searchbar"
                          :outline="false"
                          search-in=".item-title">
            </f7-searchbar>
          </f7-subnavbar>
        </f7-navbar>

        <f7-toolbar position="bottom"
                    :style="!color.identifier ? 'height: 8rem' : 'height: 9rem'">
          <div v-for="(compiler, name) in compilers"
               class="width-100"
               style="display: flex;align-items: center;justify-content: center;gap: 1rem">
            <f7-link
                :href="compiler.url"
                external
                style="font-weight: 600;font-size: 1rem"
                target="_blank">
              {{ compiler.icon }} {{ name }}
            </f7-link>
            <code v-html="name === 'Cherri' ? cherriCode : jellyCode"/>
            <f7-button icon-f7="doc_on_clipboard_fill" icon-size="1.3rem"
                       @click="copyToClipboard(
                           stripTags(
                               (name === 'Cherri' ? cherriCode : jellyCode).replace('<br/>', '\n')
                           )
                       )"/>
          </div>
        </f7-toolbar>

        <f7-page-content>
          <f7-block-header>
            <f7-icon f7="doc_on_clipboard_fill"
                     size="1rem"/>
            Choose one of the glyphs in the list below to copy the identifier and generate code.
          </f7-block-header>

          <f7-list strong inset class="searchbar-not-found">
            <f7-list-item title="No glyphs found!"/>
          </f7-list>

          <f7-list strong dividers inset media-list class="search-list searchbar-found">
            <template v-for="(n,g) in glyphs">
              <f7-list-item :title="glyphTitle(g)"
                            :text="g"
                            link="#"
                            @click="copyToClipboard(g);glyph = {identifier: g, code: n}">
                <template #media>
                  <div class="shortcut-icon s43"
                       :class="iconClass(n)">
                  </div>
                </template>
              </f7-list-item>
            </template>
          </f7-list>

          <br/>
          <br/>
          <br/>
          <br/>
        </f7-page-content>
      </f7-page>
    </f7-view>
  </f7-app>
</template>

<script>
import glyphs from './assets/glyphs.json';
import colors from './assets/colors.json';

import {
  f7,
  f7AccordionContent,
  f7App,
  f7Block,
  f7BlockHeader,
  f7Button,
  f7Icon,
  f7Link,
  f7List,
  f7ListItem,
  f7Navbar,
  f7NavLeft,
  f7NavRight,
  f7NavTitle,
  f7NavTitleLarge,
  f7Page,
  f7PageContent,
  f7Popover,
  f7Searchbar,
  f7Subnavbar,
  f7Toolbar,
  f7View,
} from 'framework7-vue';
import {computed} from 'vue';

export default {
  name: 'App',
  components: {
    f7App,
    f7View,
    f7Navbar,
    f7Page,
    f7Searchbar,
    f7Subnavbar,
    f7Toolbar,
    f7Link,
    f7List,
    f7ListItem,
    f7NavTitleLarge,
    f7NavTitle,
    f7NavLeft,
    f7NavRight,
    f7Icon,
    f7BlockHeader,
    f7AccordionContent,
    f7Block,
    f7Popover,
    f7Button,
    f7PageContent,
  },
  setup() {
    return {colors, glyphs};
  },
  data() {
    return {
      blue: null,
      f7params: {
        name: 'Shortcuts Glyphs',
        theme: 'ios',
        darkMode: 'auto',
      },
      glyph: {identifier: 'identifier', code: null},
      color: {identifier: null, code: null},
      compilers: {
        'Cherri': {
          icon: '🍒',
          url: 'https://cherrilang.org/',
        },
        'Jelly': {
          icon: '🪼',
          url: 'https://jellycuts.com/',
        },
      },
      cherriCode: computed(() => {
        let code = `<span class=keyword>#define</span> <span class=token>glyph</span> ${this.glyph.identifier}`;
        if (this.color.identifier) {
          code += `<br/><span class=keyword>#define</span> <span class=token>color</span> ${this.color.identifier}`;
        }

        return code;
      }),
      jellyCode: computed(() => {
        let code = `<span class=keyword>#Icon</span>: ${this.glyph.identifier}`;
        if (this.color.identifier) {
          code += `, <span class=keyword>#Color</span>: ${this.jellyColorName()}`;
        }

        return code;
      }),
      githubCredits: ['atnbueno', 'actuallytaylor', 'electrikmilk', 'chrisjmendez'],
    };
  },
  mounted() {
    this.blue = f7.colors['blue'];

    const params = new URL(window.location.href).searchParams;
    if (params.has('q')) {
      this.$refs.searchbar.search(params.get('q'));
    }
  },
  methods: {
    alert(text, title) {
      f7.dialog.alert(text, title);
    },
    copyToClipboard(text) {
      navigator.clipboard.writeText(text);
      f7.toast.create({
        icon: '<i class="f7-icons">doc_on_clipboard_fill</i>',
        text: 'Copied to Clipboard',
        position: 'center',
        closeTimeout: 2000,
      }).open();
    },
    stripTags(str) {
      return str.replace(/<\/?[^>]+(>|$)/gi, '');
    },
    iconClass(n) {
      let classes = {};
      classes[`g${n}`] = true;

      if (this.color.code) {
        classes[`c${this.color.code}`] = true;
      }

      return classes;
    },
    glyphTitle(g) {
      switch (g) {
        case 'airPods':
          return 'AirPods';
        case 'airPodsPro':
          return 'AirPods Pro';
        case 'QRCode':
          return 'QR Code';
        case 'QRViewFinder':
          return 'QR View Finder';
      }

      let words = [];
      let word = '';
      for (let i = 0; i < g.length; i++) {
        let letter = g[i];
        if (g[i] === g[i].toUpperCase()) {
          words.push(word);
          word = letter;
        } else {
          if (word === 'air' && g !== 'airplane') {
            letter = letter.toUpperCase();
          }
          word += letter;
        }
      }
      if (word.length > 1) {
        words.push(word);
      }

      words = words.map(w => {
        if (!w) {
          return;
        }
        let letters = w.split('');
        const f = w[0].toUpperCase();
        letters.splice(0, 1);
        return f + letters.join('');
      });

      return words.join(' ');
    },
    jellyColorName() {
      switch (this.color.identifier) {
        case 'darkorange':
          return 'orange';
        case 'orange':
          return 'tangerine';
        case 'lightblue':
          return 'lightBlue';
        case 'darkblue':
          return 'navy';
        case 'violet':
          return 'grape';
        case 'taupe':
          return 'grayBrown';
        case 'gray':
          return 'grayGreen';
        case 'darkgray':
          return 'grayBlue';
        default:
          return this.color.identifier;
      }
    },
  },
};
</script>

<style scoped>

</style>
