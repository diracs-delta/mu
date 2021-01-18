import React from 'react'

interface Props {}
interface State {
  date: Date
}

export default class Time extends React.Component<Props, State> {
  animationID: number

  constructor (props: {}) {
    super(props)
    this.state = {
      date: new Date()
    }
    this.animationID = -1
  }

  updateTime () {
    this.setState({
      date: new Date()
    })
    this.animationID = requestAnimationFrame(() => this.updateTime())
  }

  componentDidMount () {
    this.animationID = requestAnimationFrame(() => this.updateTime())
  }

  componentWillUnmount () {
    cancelAnimationFrame(this.animationID)
  }

  render () {
    return (
      <div>It is {this.state.date.toLocaleTimeString()}</div>
    )
  }
}