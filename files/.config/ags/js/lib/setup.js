import { reloadScss, scssWatcher } from "./scss.js"

export const init = () => {
  scssWatcher()
  reloadScss()
}
