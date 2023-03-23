import {amethyst} from '@codesandbox/sandpack-themes';
import {Sandpack, SandpackPredefinedTemplate, SandpackFiles} from '@codesandbox/sandpack-react';
import {useConversationStore} from '@/stores/conversation';

const defaultComponent = {
    vanilla: '',
    react: `export default function Component () {
    return null
  }`,
    vue: `<template></template>
  <script setup></script>`,
    svelte: ''
  }
  
  function generatePlaygroundFiles({ code, framework } : {code: string, framework: string}) {
    code ??= ''
    code = code.replace(/`/g, '\\`')
  
    if (framework === 'vanilla') {
      return {
        '/index.js': {
          code: `document.getElementById("app").innerHTML = \`${code ? code.trim() : defaultComponent.vanilla}\``
        }
      }
    }
  
    if (framework === 'react') {
      return {
        '/App.js': {
          code: `import React from 'react'
  import Component from './Component.jsx'
  
  export default function App () {
    return (
      <div id='app'>
        <Component />
      </div>
    )
  }
  `
        },
        '/Component.jsx': {
          code: `${code ? code.trim() : defaultComponent.react}`
        }
      }
    }
  
    if (framework === 'vue') {
      return {
        '/src/Component.vue': {
          code: `${code ? code.trim() : defaultComponent.vue}`
        },
        '/src/App.vue': {
          code: `
          <template>
            <Component />
          </template>
          <script setup>
            import Component from './Component.vue'
          </script>
        `
        }
      }
    }
  
    if (framework === 'svelte') {
      return {
        '/Component.svelte': {
          code: `${code ? code.trim() : defaultComponent.svelte}`
        },
        '/App.svelte': {
          code: `<script>
    import Component from './Component.svelte'
  </script>
  
  <Component />`
        }
      }
    }
  
    return {}
  }

function generateOptions({ language, framework }: {language: string, framework: string}) {
    if (framework === 'vanilla') {
      return {
        activeFile: '/index.js'
      }
    }
  
    if (framework === 'react') {
      return {
        activeFile: '/Component.jsx',
        visibleFiles: ['Component.jsx', '/App.js']
      }
    }
  
    if (framework === 'vue') {
      return {
        activeFile: '/src/Component.vue',
        visibleFiles: ['/src/Component.vue', '/src/App.vue']
      }
    }
  
    if (framework === 'svelte') {
      return {
        activeFile: '/Component.svelte',
        visibleFiles: ['/Component.svelte', '/App.svelte']
      }
    }
  }

  
function generateCustomSetup({ code }: {code: string}) {
    if (!code) return null
  
    const regex = /import\s*(?:{[^{}]*}|\*\s+as\s+\w+)\s*from\s*['"]([^'"]+)['"]/g
    // get all matches of import statements
    const matches = code.matchAll(regex)
    // get all import statements
    const imports = Array.from(matches, (m) => {
      const [, dependency] = m
      // remove path from dependency
      const [name, org] = dependency.split('/')
      return name.startsWith('@') ? `${name}/${org}` : name
    })
  
    const dependencies: Record<string, unknown> = {}
    imports.forEach(dep => {
      if (dep === 'react') return
      dependencies[dep] = 'latest'
    })
    return { dependencies }
  }
 
export const Preview = () => {
    const {code, template, framework} = useConversationStore(state => state)
    if (!code) {
        return (<h1>no code</h1>)
    }
    
    const files = generatePlaygroundFiles({ code, framework })
    const options = generateOptions({ language: template, framework })
    const customSetup = generateCustomSetup({ code })

    
    return (<Sandpack
        customSetup={customSetup}
        options={{
              externalResources: ['https://cdn.tailwindcss.com'],
              wrapContent: true,
              ...options
            }}
        theme={amethyst}
        template={framework}        
        files={files}
    />)
}