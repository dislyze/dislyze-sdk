import App from './App.svelte'

const app = new App({
  target: document.getElementById('app'),
})

export default app

export * from './lib/Counter.svelte'
export * from './DislyzeWidget.svelte'