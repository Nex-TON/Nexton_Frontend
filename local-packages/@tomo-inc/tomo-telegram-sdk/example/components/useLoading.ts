import { useState } from 'react'

const loadState = {
  getNextState(cur: boolean | number, change: number) {
    if (!cur || typeof cur === 'boolean') {
      cur = 0
    }
    return cur + change
  },
  createFn(changeLoadFn: Function) {
    return async function <T>(
      promise: Promise<T> | Function | Boolean
    ): Promise<T> {
      if (typeof promise === 'boolean') {
        changeLoadFn(promise ? 1 : -1)
        // @ts-ignore
        return
      }
      changeLoadFn(1)
      let result
      try {
        if (typeof promise === 'function') {
          result = await promise()
        } else {
          result = await promise
        }
      } catch (e) {
        changeLoadFn(-1)
        throw e
      }
      changeLoadFn(-1)
      return result
    }
  }
}

export function useLoading(
  initValue: boolean | number = false
): [boolean, <T>(promise: Promise<T> | Function | Boolean) => Promise<T>] {
  const [loading, setLoading] = useState<boolean | number>(initValue)
  return [
    !!loading,
    loadState.createFn((change: number) => {
      setLoading((prev: boolean | number) =>
        loadState.getNextState(prev, change)
      )
    })
  ]
}
