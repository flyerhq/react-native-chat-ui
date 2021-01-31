import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import React from 'react'

import App from './App'

const AppContainer = () => {
  return (
    <ActionSheetProvider>
      <App />
    </ActionSheetProvider>
  )
}

export default AppContainer
