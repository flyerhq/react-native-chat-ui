/**
 * @format
 */

import 'react-native-get-random-values'

import { AppRegistry } from 'react-native'

import { name as appName } from './app.json'
import AppContainer from './src/AppContainer'

AppRegistry.registerComponent(appName, () => AppContainer)
