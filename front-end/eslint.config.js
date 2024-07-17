import prettier from 'eslint-plugin-prettier'
import pluginVue from 'eslint-plugin-vue'

export default [
    ...pluginVue.configs['flat/recommended'],
    {
        plugins: {
            prettier,
        },
        rules: {
            'prettier/prettier': ['error'],
            'vue/require-default-prop': 0,
            'vue/html-indent': ['error', 4],
            'vue/singleline-html-element-content-newline': 0,
            'vue/multi-word-component-names': 0,
        },
    },
]
