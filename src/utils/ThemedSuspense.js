import { Spin } from 'antd'
import React from 'react'

const ThemedSuspense = () => {
  const styles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "98vw",
    height: "95vh",
  };
  
  return (
    <div style={styles}>
      <Spin />
    </div>
  )
}

export default ThemedSuspense
