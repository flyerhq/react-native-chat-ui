import * as utils from '../src/utils'

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper')

jest.spyOn(Date, 'now').mockReturnValue(0)
jest.spyOn(utils, 'uuidv4').mockReturnValue('uuidv4')
