<script setup lang="ts">
import { ref, onMounted, watch } from "vue";

interface Props {
  text: string;
  speed?: number;
  delay?: number;
  showCursor?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  speed: 100,
  delay: 0,
  showCursor: true,
});

const emit = defineEmits<{
  complete: [];
}>();

const displayText = ref("");
const isTyping = ref(false);
const isComplete = ref(false);

function typeText(): void {
  isTyping.value = true;
  let index = 0;

  const typeChar = (): void => {
    if (index < props.text.length) {
      displayText.value += props.text.charAt(index);
      index++;
      setTimeout(typeChar, props.speed);
    } else {
      isTyping.value = false;
      isComplete.value = true;
      emit("complete");
    }
  };

  setTimeout(typeChar, props.delay);
}

onMounted(() => {
  typeText();
});

watch(
  () => props.text,
  () => {
    displayText.value = "";
    isComplete.value = false;
    typeText();
  },
);
</script>

<template>
  <span class="typewriter-container">
    <span class="typewriter-text">{{ displayText }}</span>
    <span
      v-if="showCursor"
      class="typewriter-cursor"
      :class="{ 'cursor-blink': !isTyping }"
      >|</span
    >
  </span>
</template>

<style scoped>
.typewriter-container {
  display: inline-flex;
  align-items: center;
}

.typewriter-text {
  white-space: pre-wrap;
}

.typewriter-cursor {
  display: inline-block;
  margin-left: 2px;
  font-weight: 300;
  color: var(--color-sun-gold);
}

.cursor-blink {
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
</style>
