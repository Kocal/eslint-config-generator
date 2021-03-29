<template>
  <div>
    Hello world!
    <transition name="fade">
      <div v-show="visible">
        my image: <img src="https://example.com/image.png" />
      </div>
    </transition>

    <slot />

    <MyComponent>
      <template #my-slot="{  data }">
        {{ data }}
      </template>
    </MyComponent>

    <v-component>Hello</v-component>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';

@Component
export default class ComponentTypescript extends Vue {
  visible: boolean = false;

  mounted() {
    console.log("Hello world!");
  }

  @Watch('visible')
  onVisible(newVal: boolean, oldVal: boolean): void {
    console.log(newVal, oldVal);
  }
}
</script>
