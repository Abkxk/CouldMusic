import { Icon, Swipe, SwipeItem, Popup, Slider, Field, CellGroup } from 'vant'
const plugins = [
  Icon, Swipe, SwipeItem, Popup, Slider, Field, CellGroup
]
export default function getVant(app) {
  plugins.forEach((item) => {
    return app.use(item)
  })
}
