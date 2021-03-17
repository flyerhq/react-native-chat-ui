import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import App from './App'

const AppContainer = () => {
  return (
    <SafeAreaProvider>
      <ActionSheetProvider>
        <App />
      </ActionSheetProvider>
    </SafeAreaProvider>
  )
}

export default AppContainer
