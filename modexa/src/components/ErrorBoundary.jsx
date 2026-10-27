import { Component } from 'react'

export default class ErrorBoundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  componentDidCatch(err) { console.error('Modexa UI error:', err) }
  render() {
    if (!this.state.failed) return this.props.children
    return <div className="container not-found-page"><h1>Something went wrong</h1><p>Page reload karke dobara try karein. Agar problem rahe to hume batayein.</p><button className="button button-primary" onClick={() => window.location.reload()}>Reload page</button></div>
  }
}
