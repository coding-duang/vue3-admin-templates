import ScreenShot from 'js-web-screen-shot'
// @ts-ignore
import { screenShotType } from 'js-web-screen-shot/dist/type/lib/ComponentType'

export class CustomScreenShot {
  static screenShot: ScreenShot

  static getInstance(options: screenShotType) {
    const _option = {
      enableWebRtc: false,
      clickCutFullScreen: true,
      level: 999,
    }
    !options ? (options = _option) : (options = { ..._option, ...options })
    console.log(options)
    CustomScreenShot.screenShot = new ScreenShot(options)

    return CustomScreenShot.screenShot
  }

  constructor() {}
}
