import * as utils from '../src/utils'

jest.spyOn(Date, 'now').mockReturnValue(0)
jest.spyOn(utils, 'uuidv4').mockReturnValue('uuidv4')
