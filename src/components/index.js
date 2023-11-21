import SvgIcon from './SvgIcon'

const components = [SvgIcon]

export default {
  install(app) {
    components.map(item => {
      app.use(item)
    })
  }
}
