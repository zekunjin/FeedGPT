import { createStorage } from "unstorage"
import localStorageDriver from "unstorage/drivers/localstorage"

export default createStorage({
  driver: localStorageDriver()
})
