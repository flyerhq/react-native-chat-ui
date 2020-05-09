import * as utils from './utils'

jest.spyOn(utils, 'uuidv4').mockReturnValue('uuidv4')
jest.spyOn(Date, 'now').mockReturnValue(0)
