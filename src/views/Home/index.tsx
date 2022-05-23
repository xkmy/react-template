import { Observer } from 'mobx-react'
import React from 'react'
import { userStore } from '@stores/index'
import { Button } from 'antd'

const Home: React.FC = () => {
  return (
    <div>
      <Observer>{() => <div>{userStore.user.name}</div>}</Observer>
      <Button type='primary' onClick={() => userStore.setUser({ name: 'react' })}>
        set username
      </Button>
    </div>
  )
}

export default React.memo(Home)
