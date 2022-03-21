<template>
  <div>
    <Button label="Primary" />
    <Button label="Secondary" class="p-button-secondary" />
    <Button label="Success" class="p-button-success" />
    <Button label="Info" class="p-button-info" />
    <Button label="Warning" class="p-button-warning" />
    <Button label="Warning" class="p-button-help" />
    <Dialog :showHeader="true"></Dialog>
    <Button label="Danger" class="p-button-danger" />
  </div>
</template>

<script>
import Button from "primevue/button";
import Dialog from 'primevue/dialog/sfc';
import {computed} from 'vue'
export default {
  components: { Button,Dialog },
  setup() {
    return {
      // Button
    };
  },
};
</script>

<style>
</style>