import prettier from 'eslint-plugin-prettier'
import pluginVue from 'eslint-plugin-vue'

export default [
    ...pluginVue.configs['flat/recommended'],
    {
        plugins: {
            prettier,
        },
        rules: {
            'prettier/prettier': [
                'error',
                {
                    vueIndentScriptAndStyle: true,
                },
            ],
            'vue/require-default-prop': 0,
            'vue/html-indent': ['error', 4],
            'vue/script-indent': ['error', 4, { baseIndent: 1 }],
            'vue/singleline-html-element-content-newline': 0,
            'vue/multi-word-component-names': 0,
            'vue/max-attributes-per-line': 0,
            'vue/html-self-closing': [
                'error',
                {
                    html: {
                        void: 'always',
                        normal: 'always',
                        component: 'always',
                    },
                },
            ],
        },
    },
]
