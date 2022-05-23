import React from 'react'

export const wrapper = (Child: any, fallback?: NonNullable<React.ReactNode> | null) => {
  // jsx
  if (Child.type && !Child._init && !Child._payload) {
    return Child
  }

  if (typeof Child === 'function') {
    return <Child />
  }

  return <React.Suspense fallback={fallback || <>loading...</>}>{<Child />}</React.Suspense>
}
