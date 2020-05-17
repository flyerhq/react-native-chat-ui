import { Dimensions, LayoutAnimation } from 'react-native'
import * as utils from './utils'

jest.spyOn(Date, 'now').mockReturnValue(0)
jest
  .spyOn(Dimensions, 'get')
  .mockImplementation(
    jest.fn(() => ({ width: 414, height: 896, scale: 2, fontScale: 1 }))
  )
jest.spyOn(LayoutAnimation, 'configureNext').mockImplementation()
jest.spyOn(utils, 'uuidv4').mockReturnValue('uuidv4')
