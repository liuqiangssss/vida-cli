import { App } from 'vue'

export function setDirectives(app: App) {
  app.directive('focus', {
    updated: el => {
      el.querySelector('input')?.focus()
      el.querySelector('textarea')?.focus()
    },
  })
}
