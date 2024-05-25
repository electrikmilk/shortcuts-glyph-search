<template>
  <f7-app v-bind="f7params" theme="ios">
    <f7-view main>
      <f7-page>
        <f7-navbar sliding>
          <f7-nav-left>
            <f7-link icon-f7="info_circle"
                     @click="alert(
                         'Glyphs sourced from github.com/atnbueno/shortcut-icons\n\ngithub.com/OpenJelly/Open-Jellycore',
                         'Credits ❤️'
                     )"/>
          </f7-nav-left>
          <f7-nav-title-large>
            {{ f7params.name }}
          </f7-nav-title-large>
          <f7-nav-title :title="f7params.name"/>
          <f7-subnavbar>
            <f7-searchbar search-container=".search-list"
                          class="searchbar"
                          :outline="false"
                          placeholder="Find Glyphs"
                          search-in=".item-title">
            </f7-searchbar>
          </f7-subnavbar>
        </f7-navbar>
        <f7-list strong inset class="searchbar-not-found">
          <f7-list-item title="No glyphs found!"/>
        </f7-list>

        <f7-list strong inset accordion-list>
          <f7-list-item title="How to Use" media-item accordion-item>
            <template #media>
              <f7-icon f7="question_circle"
                       size="24px"
                       :color="blue"/>
            </template>
            <f7-accordion-content>
              <f7-block>
                <p class="margin-top margin-bottom" style="opacity: .5">
                  <f7-icon f7="doc_on_clipboard_fill"
                           size="1rem"/>
                  Click one of the glyphs in the list below to copy the identifier to your clipboard.
                </p>
                <h3>
                  <f7-link
                      href="https://cherrilang.org"
                      external
                      target="_blank">
                    Cherri
                  </f7-link>
                </h3>
                <p>
                  Set it as your Shortcut's icon in Cherri using a definition called <code>glyph</code>.
                </p>
                <pre>#define glyph identifier</pre>
                <h3>
                  <f7-link
                      href="https://jellycuts.com"
                      rel="noopener noreferrer"
                      external
                      target="_blank">
                    Jelly
                  </f7-link>
                </h3>
                <p>
                  Set it as your Shortcut's icon in Jelly using <code>#Icon</code>.
                </p>
                <pre>#Icon: identifier</pre>
              </f7-block>
            </f7-accordion-content>
          </f7-list-item>
        </f7-list>

        <f7-list strong dividers inset media-list class="search-list searchbar-found">
          <template v-for="(n,g) in glyphs">
            <template v-if="typeof n !== 'object'">
              <f7-list-item :title="glyphTitle(g)"
                            :text="g"
                            link="#"
                            @click="copyToClipboard(g)">
                <template #media>
                  <div class="shortcut-icon s43" :class="'g'+n"></div>
                </template>
              </f7-list-item>
            </template>
          </template>
        </f7-list>
      </f7-page>
    </f7-view>
  </f7-app>
</template>

<script>
import * as glyphs from './assets/glyphs.json';
import {
  f7,
  f7AccordionContent,
  f7App,
  f7Block,
  f7BlockHeader,
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
  f7Searchbar,
  f7Subnavbar,
  f7Toolbar,
  f7View,
} from 'framework7-vue';

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
  },
  data() {
    return {
      blue: null,
      f7params: {
        name: 'Shortcuts Glyphs',
        theme: 'ios',
        darkMode: 'auto',
      },
      search: '',
      glyphs: glyphs,
    };
  },
  mounted() {
    this.blue = f7.colors['blue'];
  },
  methods: {
    alert(text, title) {
      f7.dialog.alert(text, title);
    },
    copyToClipboard(text) {
      navigator.clipboard.writeText(text);
      f7.dialog.alert(text, 'Copied to Clipboard!');
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
  },
};
</script>

<style scoped>

</style>
