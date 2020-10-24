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

<script>
export default {
  data() {
    return {
      visible: false,
    };
  },
  mounted() {
    console.log("Hello world!");
  },
};
</script>
`
