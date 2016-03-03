import {Observable} from 'rx'
import {run} from '@cycle/core'
import {makeDOMDriver, div} from '@cycle/dom'

const rootElem = document.createElement('div')
rootElem.id = 'app'
document.body.appendChild(rootElem)

const drivers = {
  DOM: makeDOMDriver('#app')
}

const {sinks, sources} = run((sources) => {
  const sinks = Main(sources)
  return sinks
}, drivers)

function Main({DOM}) {
  return {
    DOM: Observable.just(div('Hello!'))
  }
}

if (module.hot) {
  module.hot.accept()
  module.hot.dispose(() => {
    sinks.dispose()
    sources.dispose()
  })
}
