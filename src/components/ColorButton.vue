<template>
    <button class="color-button" :class="dynamicClasses" :value="color" @click="handleColorButtonClick"></button>
</template>

<script>
export default {
    name: "ColorButton",
    props: {
        color: { type: String, required: true },
        isActive: { type: Boolean, required: true },
    },
    computed: {
        dynamicClasses() {
            return {
                [`color-button--${this.color}`]: this.color,
                "color-button--active": this.isActive,
            };
        },
    },
    methods: {
        handleColorButtonClick(e) {
            this.$emit("on-color-button-click", e.target.value);
        },
    },
};
</script>

<style scoped>
.color-button {
    width: 7rem;
    height: 7rem;

    border: none;

    box-shadow: var(--primary-box-shadow--hovered);

    opacity: 0.4;

    cursor: pointer;

    transition: 0.25s opacity, 0.25s box-shadow;
}

.color-button:active,
.color-button--active {
    opacity: 1;
}

/* Перезаписываем стили для девайсов с мышкой */
@media (hover: hover) and (pointer: fine) {
    .color-button--green:hover {
        border-top: var(--primary-border);
        border-left: var(--primary-border);
    }

    .color-button--red:hover {
        border-top: var(--primary-border);
        border-right: var(--primary-border);
    }

    .color-button--yellow:hover {
        border-bottom: var(--primary-border);
        border-left: var(--primary-border);
    }

    .color-button--blue:hover {
        border-bottom: var(--primary-border);
        border-right: var(--primary-border);
    }
}

.color-button--green {
    border-top-left-radius: 100%;
    background-color: rgb(0, 173, 0);
}

.color-button--red {
    border-top-right-radius: 100%;
    background-color: red;
}

.color-button--yellow {
    border-bottom-left-radius: 100%;
    background-color: yellow;
}

.color-button--blue {
    border-bottom-right-radius: 100%;
    background-color: rgb(0, 110, 255);
}
</style>
