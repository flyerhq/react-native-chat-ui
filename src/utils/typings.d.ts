declare module 'react-native/Libraries/Blob/Blob' {
  class Blob {
    constructor(parts: Array<Blob | string>)

    get size(): number
  }

  export default Blob
}
