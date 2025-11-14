import './style.css'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { Calendar } from './components'

const root = createRoot(document.querySelector<HTMLDivElement>('#app')!)

root.render(
  <React.StrictMode>
    <Calendar date={new Date()} />
  </React.StrictMode>
)

